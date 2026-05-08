export async function GET() {
  const csv = [
    "metric,value",
    "Offer acceptance rate,71.2%",
    "Backout rate,6.4%",
    "Time-to-ready,4.6 days",
    "First-day show-up rate,96.1%",
    "Assignment readiness,82%",
    "Mobility support utilization,68%"
  ].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="trital-orbit-msp-report.csv"'
    }
  });
}
