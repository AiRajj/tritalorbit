import { prisma } from '@/lib/prisma';

export async function flagHighRiskVendors() {
  const profiles = await prisma.vendorBidProfile.findMany({ where: { chargebackRiskScore: { gt: 0.72 } } });
  return profiles.map((profile) => ({
    vendorId: profile.vendorId,
    chargebackRiskScore: profile.chargebackRiskScore,
    action: 'Admin review required'
  }));
}
