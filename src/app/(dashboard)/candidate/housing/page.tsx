"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  MapPin,
  Home,
  Search,
  Star,
  Bed,
  Bath,
  Ruler,
  Shield,
  CheckCircle2,
  Phone,
} from "lucide-react";

const MOCK_HOUSING = [
  {
    id: "h1",
    title: "The Lofts at Medical Center",
    address: "6700 Main St",
    city: "Houston",
    state: "TX",
    monthlyRate: 1650,
    bedrooms: 1,
    bathrooms: 1,
    distanceToFacility: "0.8 miles",
    furnished: true,
    verified: true,
    rating: 4.8,
    gradient: "from-[#0B3C5D] to-[#0B3C5D]/70",
  },
  {
    id: "h2",
    title: "Greenway Plaza Apartments",
    address: "3900 Richmond Ave",
    city: "Houston",
    state: "TX",
    monthlyRate: 1450,
    bedrooms: 1,
    bathrooms: 1,
    distanceToFacility: "2.1 miles",
    furnished: true,
    verified: true,
    rating: 4.5,
    gradient: "from-emerald-600 to-emerald-800",
  },
  {
    id: "h3",
    title: "Midtown Living Suites",
    address: "2500 Fannin St",
    city: "Houston",
    state: "TX",
    monthlyRate: 1850,
    bedrooms: 2,
    bathrooms: 1,
    distanceToFacility: "1.4 miles",
    furnished: true,
    verified: false,
    rating: 4.6,
    gradient: "from-[#E63946] to-[#E63946]/70",
  },
  {
    id: "h4",
    title: "Cambridge Crossing Residences",
    address: "145 Broadway",
    city: "Boston",
    state: "MA",
    monthlyRate: 2200,
    bedrooms: 1,
    bathrooms: 1,
    distanceToFacility: "1.2 miles",
    furnished: true,
    verified: true,
    rating: 4.7,
    gradient: "from-violet-600 to-violet-800",
  },
  {
    id: "h5",
    title: "Rochester Downtown Flats",
    address: "220 1st Ave SW",
    city: "Rochester",
    state: "MN",
    monthlyRate: 950,
    bedrooms: 1,
    bathrooms: 1,
    distanceToFacility: "0.5 miles",
    furnished: true,
    verified: true,
    rating: 4.3,
    gradient: "from-amber-600 to-amber-800",
  },
  {
    id: "h6",
    title: "West Hollywood Studio",
    address: "8500 Sunset Blvd",
    city: "Los Angeles",
    state: "CA",
    monthlyRate: 2400,
    bedrooms: 0,
    bathrooms: 1,
    distanceToFacility: "3.5 miles",
    furnished: true,
    verified: true,
    rating: 4.9,
    gradient: "from-sky-600 to-sky-800",
  },
];

export default function CandidateHousingPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHousing = MOCK_HOUSING.filter((h) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      h.city.toLowerCase().includes(query) ||
      h.state.toLowerCase().includes(query) ||
      h.title.toLowerCase().includes(query) ||
      h.address.toLowerCase().includes(query)
    );
  });

  const handleContactLandlord = (title: string) => {
    toast({
      title: "Contact Request Sent",
      description: `We'll connect you with the landlord for ${title} within 24 hours.`,
    });
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF2F7]">
        <div className="bg-[#0B3C5D] text-white">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">
              Housing Options
            </h1>
            <p className="text-white/80 text-sm sm:text-base">
              Browse verified housing near your assignment facility
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-6">
          {/* Search / Filter */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F2937]/40" />
              <Input
                placeholder="Filter by city or state..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Housing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {filteredHousing.map((h) => (
              <Card
                key={h.id}
                className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Image Placeholder */}
                <div
                  className={`h-40 bg-gradient-to-br ${h.gradient} flex items-center justify-center relative`}
                >
                  <Home className="h-12 w-12 text-white/20" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {h.furnished && (
                      <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm text-xs">
                        Furnished
                      </Badge>
                    )}
                    {h.verified && (
                      <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500 backdrop-blur-sm text-xs">
                        <CheckCircle2 className="h-3 w-3 mr-0.5" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                      <Star className="h-3 w-3 text-amber-300 fill-amber-300" />
                      <span className="text-white text-xs font-medium">
                        {h.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-[#1F2937] text-base mb-1">
                    {h.title}
                  </h3>
                  <p className="text-xs text-[#1F2937]/60 flex items-center gap-1 mb-3">
                    <MapPin className="h-3 w-3" />
                    {h.address}, {h.city}, {h.state}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-[#0B3C5D]">
                        ${h.monthlyRate.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#1F2937]/50">/month</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#1F2937]/60 mb-4">
                    <span className="flex items-center gap-1">
                      <Bed className="h-3.5 w-3.5" />
                      {h.bedrooms === 0 ? "Studio" : `${h.bedrooms} BD`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-3.5 w-3.5" />
                      {h.bathrooms} BA
                    </span>
                    <span className="flex items-center gap-1">
                      <Ruler className="h-3.5 w-3.5" />
                      {h.distanceToFacility}
                    </span>
                  </div>

                  <Button
                    className="w-full bg-[#0B3C5D] hover:bg-[#0B3C5D]/90"
                    size="sm"
                    onClick={() => handleContactLandlord(h.title)}
                  >
                    <Phone className="h-3.5 w-3.5 mr-1.5" />
                    Contact Landlord
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHousing.length === 0 && (
            <div className="text-center py-12">
              <Home className="h-12 w-12 text-[#1F2937]/20 mx-auto mb-3" />
              <h3 className="font-semibold text-[#1F2937] mb-1">
                No housing found
              </h3>
              <p className="text-sm text-[#1F2937]/60">
                Try adjusting your search to find available options
              </p>
            </div>
          )}

          {/* Map Placeholder */}
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="h-64 sm:h-80 bg-gradient-to-br from-[#0B3C5D]/5 via-[#0B3C5D]/10 to-[#0B3C5D]/5 flex flex-col items-center justify-center">
              <MapPin className="h-10 w-10 text-[#0B3C5D]/30 mb-2" />
              <p className="text-sm font-medium text-[#1F2937]/40">
                Interactive Map
              </p>
              <p className="text-xs text-[#1F2937]/30">
                Map integration coming soon
              </p>
            </div>
          </Card>

          {/* Footer */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#1F2937]/50 mt-6 pb-4">
            <Shield className="h-3 w-3" />
            Powered by TRITAL Orbit&trade; &middot; All listings verified
          </div>
        </div>
      </div>
    </>
  );
}
