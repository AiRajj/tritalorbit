import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Account details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>
            <span className="font-medium">Name:</span> {session.user.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {session.user.email}
          </p>
          <p>
            <span className="font-medium">Role:</span> {session.user.role}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
