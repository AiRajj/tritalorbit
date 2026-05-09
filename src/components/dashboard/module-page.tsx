import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ModulePageProps = {
  label: string;
  title: string;
  description: string;
  stats?: Array<{ label: string; value: string }>;
  workflows?: string[];
  actions?: Array<{ label: string; href: string }>;
};

export function ModulePage({
  label,
  title,
  description,
  stats = [],
  workflows = [],
  actions = []
}: ModulePageProps) {
  return (
    <div className="space-y-6">
      <section className="orbit-dark-panel rounded-2xl p-6 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">{label}</p>
        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-100">{description}</p>
        {actions.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {actions.map((action) => (
              <Button asChild key={action.href} size="sm">
                <Link href={action.href}>
                  {action.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        ) : null}
      </section>

      {stats.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      ) : null}

      {workflows.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orbit-blue" />
              Active workflow steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            {workflows.map((item) => (
              <p key={item}>• {item}</p>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
