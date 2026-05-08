import { launchRows } from "@/lib/content";

export async function GET() {
  const header = "Candidate,Role,Facility,Start Date,Housing,Travel,Documents,Readiness,Risk,Action Needed";
  const rows = launchRows.map((row) =>
    [
      row.candidate,
      row.role,
      row.facility,
      row.startDate,
      row.housing,
      row.travel,
      row.documents,
      row.readiness,
      row.risk,
      row.action
    ]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(",")
  );

  return new Response([header, ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="trital-orbit-assignment-launch.csv"'
    }
  });
}
