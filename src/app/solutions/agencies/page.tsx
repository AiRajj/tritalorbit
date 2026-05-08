import Link from "next/link";

import { PublicPageShell } from "@/components/marketing/public-page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AgenciesSolutionPage() {
  return (
    <PublicPageShell>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-[#1F2937]">Solutions for staffing agencies</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Increase offer acceptance and reduce assignment fallout by wrapping every offer with practical,
          candidate-friendly mobility support.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["Faster candidate close", "Reduced backouts", "Higher recruiter productivity"].map((item) => (
            <Card key={item}>
              <CardHeader>
                <CardTitle className="text-xl">{item}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Automate critical move support workflows while giving recruiters AI-guided talking points.
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/demo">
            <Button>Book Agency Demo</Button>
          </Link>
        </div>
      </section>
    </PublicPageShell>
  );
}
