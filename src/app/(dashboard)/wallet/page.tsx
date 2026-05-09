import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function WalletEntryPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role === "CANDIDATE") {
    redirect("/candidate/wallet");
  }

  if (["AGENCY_OWNER", "RECRUITER", "CONCIERGE_MANAGER"].includes(session.user.role)) {
    redirect("/agency/wallet");
  }

  redirect("/vendor/dashboard");
}
