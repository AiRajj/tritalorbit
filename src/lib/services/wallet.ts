import { Prisma, WalletAccountType, WalletEntryStatus, WalletEntryType } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type FundAgencyWalletInput = {
  agencyId: string;
  amount: number;
  description: string;
  referenceCode?: string;
  createdById: string;
};

type GrantCandidateCreditInput = {
  agencyId: string;
  candidateId: string;
  amount: number;
  description: string;
  travelRequestId?: string;
  createdById: string;
};

type RedeemCandidateCreditInput = {
  candidateId: string;
  amount: number;
  description: string;
  travelRequestId?: string;
  travelBidId?: string;
  createdById: string;
};

function toDecimal(value: number) {
  return new Prisma.Decimal(value);
}

export async function getOrCreateAgencyWallet(agencyId: string) {
  const existing = await prisma.walletAccount.findUnique({
    where: { agencyId }
  });

  if (existing) return existing;

  return prisma.walletAccount.create({
    data: {
      agencyId,
      accountType: WalletAccountType.AGENCY
    }
  });
}

export async function getOrCreateCandidateWallet(candidateId: string) {
  const existing = await prisma.walletAccount.findUnique({
    where: { candidateId }
  });

  if (existing) return existing;

  return prisma.walletAccount.create({
    data: {
      candidateId,
      accountType: WalletAccountType.CANDIDATE
    }
  });
}

export async function getAgencyWalletWithLedger(agencyId: string, take = 30) {
  const wallet = await getOrCreateAgencyWallet(agencyId);
  const entries = await prisma.walletLedgerEntry.findMany({
    where: { walletAccountId: wallet.id },
    orderBy: { createdAt: "desc" },
    take
  });
  return { wallet, entries };
}

export async function getCandidateWalletWithLedger(candidateId: string, take = 30) {
  const wallet = await getOrCreateCandidateWallet(candidateId);
  const entries = await prisma.walletLedgerEntry.findMany({
    where: { walletAccountId: wallet.id },
    orderBy: { createdAt: "desc" },
    take
  });
  return { wallet, entries };
}

export async function fundAgencyWallet(input: FundAgencyWalletInput) {
  return prisma.$transaction(async (tx) => {
    const wallet = await tx.walletAccount.upsert({
      where: { agencyId: input.agencyId },
      create: {
        agencyId: input.agencyId,
        accountType: WalletAccountType.AGENCY
      },
      update: {}
    });

    const nextBalance = wallet.balance.add(toDecimal(input.amount));

    const updatedWallet = await tx.walletAccount.update({
      where: { id: wallet.id },
      data: { balance: nextBalance }
    });

    const entry = await tx.walletLedgerEntry.create({
      data: {
        walletAccountId: wallet.id,
        agencyId: input.agencyId,
        entryType: WalletEntryType.FUNDING,
        status: WalletEntryStatus.POSTED,
        amount: toDecimal(input.amount),
        description: input.description,
        referenceCode: input.referenceCode,
        createdById: input.createdById
      }
    });

    return { updatedWallet, entry };
  });
}

export async function grantCandidateCredit(input: GrantCandidateCreditInput) {
  return prisma.$transaction(async (tx) => {
    const [agencyWallet, candidateWallet] = await Promise.all([
      tx.walletAccount.upsert({
        where: { agencyId: input.agencyId },
        create: {
          agencyId: input.agencyId,
          accountType: WalletAccountType.AGENCY
        },
        update: {}
      }),
      tx.walletAccount.upsert({
        where: { candidateId: input.candidateId },
        create: {
          candidateId: input.candidateId,
          accountType: WalletAccountType.CANDIDATE
        },
        update: {}
      })
    ]);

    if (agencyWallet.balance.lt(toDecimal(input.amount))) {
      throw new Error("Insufficient agency wallet balance for credit grant.");
    }

    const nextAgencyBalance = agencyWallet.balance.sub(toDecimal(input.amount));
    const nextAgencyEscrow = agencyWallet.escrowBalance.add(toDecimal(input.amount));
    const nextCandidateBalance = candidateWallet.balance.add(toDecimal(input.amount));

    const [updatedAgencyWallet, updatedCandidateWallet] = await Promise.all([
      tx.walletAccount.update({
        where: { id: agencyWallet.id },
        data: {
          balance: nextAgencyBalance,
          escrowBalance: nextAgencyEscrow
        }
      }),
      tx.walletAccount.update({
        where: { id: candidateWallet.id },
        data: { balance: nextCandidateBalance }
      })
    ]);

    await tx.walletLedgerEntry.createMany({
      data: [
        {
          walletAccountId: agencyWallet.id,
          agencyId: input.agencyId,
          candidateId: input.candidateId,
          travelRequestId: input.travelRequestId,
          entryType: WalletEntryType.CREDIT_GRANT,
          status: WalletEntryStatus.POSTED,
          amount: toDecimal(-input.amount),
          description: `${input.description} (escrow reserved)`,
          createdById: input.createdById
        },
        {
          walletAccountId: candidateWallet.id,
          agencyId: input.agencyId,
          candidateId: input.candidateId,
          travelRequestId: input.travelRequestId,
          entryType: WalletEntryType.CREDIT_GRANT,
          status: WalletEntryStatus.POSTED,
          amount: toDecimal(input.amount),
          description: input.description,
          createdById: input.createdById
        }
      ]
    });

    return { updatedAgencyWallet, updatedCandidateWallet };
  });
}

export async function redeemCandidateCredit(input: RedeemCandidateCreditInput) {
  return prisma.$transaction(async (tx) => {
    const candidate = await tx.candidate.findUnique({
      where: { id: input.candidateId },
      select: { id: true, agencyId: true }
    });

    if (!candidate) {
      throw new Error("Candidate not found.");
    }

    const [candidateWallet, agencyWallet] = await Promise.all([
      tx.walletAccount.upsert({
        where: { candidateId: input.candidateId },
        create: {
          candidateId: input.candidateId,
          accountType: WalletAccountType.CANDIDATE
        },
        update: {}
      }),
      tx.walletAccount.findUnique({
        where: { agencyId: candidate.agencyId }
      })
    ]);

    if (candidateWallet.balance.lt(toDecimal(input.amount))) {
      throw new Error("Insufficient candidate wallet balance.");
    }

    const updates: Prisma.PrismaPromise<unknown>[] = [
      tx.walletAccount.update({
        where: { id: candidateWallet.id },
        data: {
          balance: candidateWallet.balance.sub(toDecimal(input.amount))
        }
      }),
      tx.walletLedgerEntry.create({
        data: {
          walletAccountId: candidateWallet.id,
          agencyId: candidate.agencyId,
          candidateId: input.candidateId,
          travelRequestId: input.travelRequestId,
          travelBidId: input.travelBidId,
          entryType: WalletEntryType.REDEMPTION,
          status: WalletEntryStatus.POSTED,
          amount: toDecimal(-input.amount),
          description: input.description,
          createdById: input.createdById
        }
      })
    ];

    if (agencyWallet && agencyWallet.escrowBalance.gte(toDecimal(input.amount))) {
      updates.push(
        tx.walletAccount.update({
          where: { id: agencyWallet.id },
          data: {
            escrowBalance: agencyWallet.escrowBalance.sub(toDecimal(input.amount))
          }
        }),
        tx.walletLedgerEntry.create({
          data: {
            walletAccountId: agencyWallet.id,
            agencyId: candidate.agencyId,
            candidateId: input.candidateId,
            travelRequestId: input.travelRequestId,
            travelBidId: input.travelBidId,
            entryType: WalletEntryType.PAYOUT,
            status: WalletEntryStatus.PENDING,
            amount: toDecimal(-input.amount),
            description: `Vendor payout queued: ${input.description}`,
            createdById: input.createdById
          }
        })
      );
    }

    await Promise.all(updates);

    return { success: true };
  });
}
