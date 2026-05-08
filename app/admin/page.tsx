import { adminModules } from "@/lib/content";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <DashboardShell type="admin">
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {adminModules.map((module) => (
          <Card key={module.label} className="p-5">
            <module.icon className="h-7 w-7 text-[#E63946]" />
            <h2 className="mt-4 text-xl font-black text-[#0B3C5D]">{module.label}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Functional admin control surface with audit-ready fallback state.</p>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
