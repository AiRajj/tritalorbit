import { NextResponse } from "next/server";

const platformStats = {
  totalUsers: 1247,
  totalAgencies: 38,
  totalCandidates: 892,
  totalVendors: 156,
  activeOffers: 214,
  activeAssignments: 187,
  completedAssignments: 1432,
  monthlyRevenue: 284500,
  yearToDateRevenue: 1823400,
  averageTimeToFill: 12.3,
  candidateSatisfaction: 4.6,
  vendorSatisfaction: 4.4,
  topSpecialties: [
    { name: "ICU Nursing", count: 67 },
    { name: "Med-Surg", count: 54 },
    { name: "Emergency", count: 41 },
    { name: "OR/Surgical", count: 38 },
    { name: "Labor & Delivery", count: 29 },
  ],
  topStates: [
    { name: "California", count: 42 },
    { name: "New York", count: 38 },
    { name: "Texas", count: 31 },
    { name: "Minnesota", count: 28 },
    { name: "Ohio", count: 24 },
  ],
  revenueByMonth: [
    { month: "Jan", revenue: 198000 },
    { month: "Feb", revenue: 215000 },
    { month: "Mar", revenue: 242000 },
    { month: "Apr", revenue: 268000 },
    { month: "May", revenue: 284500 },
  ],
  userGrowth: [
    { month: "Jan", users: 980 },
    { month: "Feb", users: 1045 },
    { month: "Mar", users: 1102 },
    { month: "Apr", users: 1189 },
    { month: "May", users: 1247 },
  ],
};

export async function GET() {
  return NextResponse.json({ success: true, data: platformStats });
}
