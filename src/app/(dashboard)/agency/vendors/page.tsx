"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import {
  Search,
  Star,
  MapPin,
  BadgeCheck,
  Home,
  Plane,
  Car,
  LayoutGrid,
  Phone,
  Eye,
  Sparkles,
  MessageSquare,
  Crown,
  Navigation,
  Send,
  X,
  SlidersHorizontal,
} from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  type: "Housing" | "Travel" | "Car Rental";
  city: string;
  state: string;
  rating: number;
  reviews: number;
  price: number;
  priceUnit: string;
  verified: boolean;
  featured: boolean;
  distanceToFacility: string | null;
  features: string[];
  description: string;
  contactEmail: string;
  contactPhone: string;
  availability: string;
}

const vendors: Vendor[] = [
  {
    id: "V-001",
    name: "Haven Furnished Suites",
    type: "Housing",
    city: "Rochester",
    state: "MN",
    rating: 4.9,
    reviews: 142,
    price: 1450,
    priceUnit: "month",
    verified: true,
    featured: true,
    distanceToFacility: "1.2 mi",
    features: ["Furnished", "Utilities Included", "Pet-Friendly", "Washer/Dryer"],
    description: "Premium furnished apartments steps from Mayo Clinic. All-inclusive pricing with flexible lease terms for traveling professionals.",
    contactEmail: "bookings@havensuites.com",
    contactPhone: "(507) 555-0142",
    availability: "Available Now",
  },
  {
    id: "V-002",
    name: "Midtown Corporate Living",
    type: "Housing",
    city: "New York",
    state: "NY",
    rating: 4.7,
    reviews: 98,
    price: 2800,
    priceUnit: "month",
    verified: true,
    featured: true,
    distanceToFacility: "0.8 mi",
    features: ["Furnished", "Doorman", "Gym Access", "Rooftop"],
    description: "Luxury corporate apartments in Midtown Manhattan. Walking distance to major hospital systems.",
    contactEmail: "leasing@midtowncorp.com",
    contactPhone: "(212) 555-0198",
    availability: "Available Jun 1",
  },
  {
    id: "V-003",
    name: "Lakeside Extended Stay",
    type: "Housing",
    city: "Cleveland",
    state: "OH",
    rating: 4.5,
    reviews: 67,
    price: 950,
    priceUnit: "month",
    verified: true,
    featured: false,
    distanceToFacility: "3.1 mi",
    features: ["Furnished", "Parking", "Kitchen", "Laundry"],
    description: "Comfortable extended stay apartments near Cleveland Clinic. Affordable monthly rates with no long-term commitment.",
    contactEmail: "info@lakesidestay.com",
    contactPhone: "(216) 555-0234",
    availability: "Available Now",
  },
  {
    id: "V-004",
    name: "SkyBridge Travel Services",
    type: "Travel",
    city: "Dallas",
    state: "TX",
    rating: 4.8,
    reviews: 213,
    price: 350,
    priceUnit: "booking",
    verified: true,
    featured: true,
    distanceToFacility: null,
    features: ["Flight Booking", "Hotel Packages", "24/7 Support", "Group Discounts"],
    description: "Full-service travel agency specializing in healthcare professional relocations. Negotiated rates with major airlines.",
    contactEmail: "travel@skybridge.com",
    contactPhone: "(214) 555-0312",
    availability: "Always Available",
  },
  {
    id: "V-005",
    name: "Metro Auto Rentals",
    type: "Car Rental",
    city: "Los Angeles",
    state: "CA",
    rating: 4.6,
    reviews: 89,
    price: 42,
    priceUnit: "day",
    verified: true,
    featured: false,
    distanceToFacility: "2.5 mi",
    features: ["Free Mileage", "Insurance Included", "Airport Pickup", "Monthly Rates"],
    description: "Reliable vehicle rentals with special long-term rates for traveling professionals. Fleet includes sedans, SUVs, and minivans.",
    contactEmail: "rentals@metroauto.com",
    contactPhone: "(310) 555-0456",
    availability: "Available Now",
  },
  {
    id: "V-006",
    name: "Sunrise Apartments",
    type: "Housing",
    city: "Phoenix",
    state: "AZ",
    rating: 4.4,
    reviews: 53,
    price: 1100,
    priceUnit: "month",
    verified: false,
    featured: false,
    distanceToFacility: "4.2 mi",
    features: ["Furnished", "Pool", "Parking", "Gated Community"],
    description: "Modern apartments in a quiet gated community. Ideal for healthcare professionals on 13-week assignments.",
    contactEmail: "leasing@sunriseapts.com",
    contactPhone: "(480) 555-0567",
    availability: "Available Jul 1",
  },
  {
    id: "V-007",
    name: "NorthStar Mobility",
    type: "Car Rental",
    city: "Chicago",
    state: "IL",
    rating: 4.3,
    reviews: 41,
    price: 38,
    priceUnit: "day",
    verified: true,
    featured: false,
    distanceToFacility: null,
    features: ["Flexible Terms", "Roadside Assistance", "GPS Included", "Weekly Discounts"],
    description: "Flexible car rental solutions tailored for travel nurses and allied health professionals.",
    contactEmail: "fleet@northstarmobility.com",
    contactPhone: "(312) 555-0678",
    availability: "Available Now",
  },
  {
    id: "V-008",
    name: "Pacific Coast Housing",
    type: "Housing",
    city: "San Francisco",
    state: "CA",
    rating: 4.8,
    reviews: 116,
    price: 2200,
    priceUnit: "month",
    verified: true,
    featured: false,
    distanceToFacility: "1.5 mi",
    features: ["Furnished", "City View", "Transit Access", "Co-Working Space"],
    description: "Contemporary furnished studios and one-bedrooms near UCSF Medical Center. Transit-friendly location.",
    contactEmail: "hello@pacificcoasthousing.com",
    contactPhone: "(415) 555-0789",
    availability: "Available Now",
  },
];

const gradients = [
  "from-[#0B3C5D] to-[#0B3C5D]/70",
  "from-indigo-600 to-indigo-400",
  "from-emerald-600 to-teal-400",
  "from-[#E63946] to-rose-400",
  "from-violet-600 to-purple-400",
  "from-amber-600 to-orange-400",
  "from-cyan-600 to-sky-400",
  "from-slate-700 to-slate-500",
];

function getTypeIcon(type: string) {
  if (type === "Housing") return <Home className="h-3.5 w-3.5" />;
  if (type === "Travel") return <Plane className="h-3.5 w-3.5" />;
  return <Car className="h-3.5 w-3.5" />;
}

function getTypeBadgeColor(type: string) {
  if (type === "Housing") return "bg-[#0B3C5D]/10 text-[#0B3C5D] border-[#0B3C5D]/20";
  if (type === "Travel") return "bg-blue-500/10 text-blue-700 border-blue-200";
  return "bg-violet-500/10 text-violet-700 border-violet-200";
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : i < rating
                ? "fill-amber-400/50 text-amber-400"
                : "fill-[#1F2937]/10 text-[#1F2937]/10"
          )}
        />
      ))}
      <span className="text-xs font-medium text-[#1F2937]/70 ml-0.5">{rating}</span>
      <span className="text-[10px] text-[#1F2937]/40">({reviews})</span>
    </div>
  );
}

function VendorCard({ vendor, index }: { vendor: Vendor; index: number }) {
  const { toast } = useToast();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
        <div className={cn("h-36 bg-gradient-to-br relative", gradients[index % gradients.length])}>
          {vendor.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-amber-500 text-white border-0 gap-1 text-[10px] shadow-lg">
                <Crown className="h-3 w-3" /> Premium
              </Badge>
            </div>
          )}
          {vendor.verified && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-white/90 text-emerald-700 border-0 gap-1 text-[10px] shadow-lg">
                <BadgeCheck className="h-3 w-3" /> Verified
              </Badge>
            </div>
          )}
          <div className="absolute bottom-3 left-3 right-3">
            <Badge variant="outline" className={cn("gap-1 text-[11px] bg-white/90 backdrop-blur border-0", getTypeBadgeColor(vendor.type))}>
              {getTypeIcon(vendor.type)}
              {vendor.type}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex-1 space-y-2.5">
            <div>
              <h3 className="font-semibold text-[#1F2937] group-hover:text-[#0B3C5D] transition-colors">
                {vendor.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-[#1F2937]/50 mt-0.5">
                <MapPin className="h-3 w-3" />
                {vendor.city}, {vendor.state}
              </div>
            </div>

            <StarRating rating={vendor.rating} reviews={vendor.reviews} />

            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-[#0B3C5D]">{formatCurrency(vendor.price)}</span>
              <span className="text-xs text-[#1F2937]/50">/{vendor.priceUnit}</span>
            </div>

            {vendor.distanceToFacility && (
              <div className="flex items-center gap-1 text-xs text-[#1F2937]/50">
                <Navigation className="h-3 w-3" />
                {vendor.distanceToFacility} to facility
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              {vendor.features.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-[#1F2937]/5 text-[#1F2937]/60"
                >
                  {f}
                </span>
              ))}
              {vendor.features.length > 3 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1F2937]/5 text-[#1F2937]/40">
                  +{vendor.features.length - 3} more
                </span>
              )}
            </div>
          </div>

          <Separator className="my-3" />

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="flex-1 bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white text-xs gap-1"
              onClick={() => toast({ title: "Opening Details", description: `Loading ${vendor.name} details...` })}
            >
              <Eye className="h-3.5 w-3.5" />
              View Details
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-[#0B3C5D]/20 text-[#0B3C5D] text-xs gap-1"
              onClick={() => toast({ title: "Contact Sent", description: `Inquiry sent to ${vendor.name}.` })}
            >
              <Phone className="h-3.5 w-3.5" />
              Contact
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function VendorMarketplacePage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({ name: "", need: "", city: "", budget: "" });
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const cities = useMemo(() => [...new Set(vendors.map((v) => v.city))].sort(), []);
  const states = useMemo(() => [...new Set(vendors.map((v) => v.state))].sort(), []);

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      const matchTab = tab === "all" || v.type.toLowerCase().replace(" ", "-") === tab;
      const matchSearch =
        !search ||
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.city.toLowerCase().includes(search.toLowerCase()) ||
        v.description.toLowerCase().includes(search.toLowerCase());
      const matchCity = cityFilter === "all" || v.city === cityFilter;
      const matchState = stateFilter === "all" || v.state === stateFilter;
      const matchVerified = !verifiedOnly || v.verified;
      return matchTab && matchSearch && matchCity && matchState && matchVerified;
    });
  }, [tab, search, cityFilter, stateFilter, verifiedOnly]);

  const featured = filtered.filter((v) => v.featured);
  const regular = filtered.filter((v) => !v.featured);

  const handleRequestSubmit = () => {
    toast({
      title: "Request Submitted",
      description: "Our concierge team will reach out within 2 business hours.",
    });
    setRequestOpen(false);
    setRequestForm({ name: "", need: "", city: "", budget: "" });
  };

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-12 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-[340px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937] flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-[#0B3C5D]" />
            Vendor & Housing Marketplace
          </h1>
          <p className="text-sm text-[#1F2937]/60 mt-1">
            Find verified housing, travel, and car rental partners for your candidates
          </p>
        </div>
        <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#E63946] hover:bg-[#E63946]/90 text-white gap-2">
              <Sparkles className="h-4 w-4" />
              Concierge Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#0B3C5D]" />
                Concierge Request
              </DialogTitle>
              <DialogDescription>
                Can&apos;t find what you need? Let our concierge team help you find the perfect match.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div>
                <label className="text-xs font-medium text-[#1F2937]/70 mb-1 block">Your Name</label>
                <Input
                  placeholder="Enter your name"
                  value={requestForm.name}
                  onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#1F2937]/70 mb-1 block">What do you need?</label>
                <Input
                  placeholder="e.g., Furnished 1BR near Cleveland Clinic"
                  value={requestForm.need}
                  onChange={(e) => setRequestForm({ ...requestForm, need: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-[#1F2937]/70 mb-1 block">City</label>
                  <Input
                    placeholder="City"
                    value={requestForm.city}
                    onChange={(e) => setRequestForm({ ...requestForm, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1F2937]/70 mb-1 block">Budget</label>
                  <Input
                    placeholder="$1,200/mo"
                    value={requestForm.budget}
                    onChange={(e) => setRequestForm({ ...requestForm, budget: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRequestOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white gap-1.5" onClick={handleRequestSubmit}>
                <Send className="h-3.5 w-3.5" />
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="all" className="gap-1.5">
              <LayoutGrid className="h-3.5 w-3.5" /> All
            </TabsTrigger>
            <TabsTrigger value="housing" className="gap-1.5">
              <Home className="h-3.5 w-3.5" /> Housing
            </TabsTrigger>
            <TabsTrigger value="travel" className="gap-1.5">
              <Plane className="h-3.5 w-3.5" /> Travel
            </TabsTrigger>
            <TabsTrigger value="car-rental" className="gap-1.5">
              <Car className="h-3.5 w-3.5" /> Car Rental
            </TabsTrigger>
          </TabsList>

          {/* Filters */}
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F2937]/40" />
                  <Input
                    placeholder="Search vendors, cities, features..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <MapPin className="h-4 w-4 mr-1 text-[#1F2937]/40" />
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={stateFilter} onValueChange={setStateFilter}>
                  <SelectTrigger className="w-full sm:w-[130px]">
                    <SlidersHorizontal className="h-4 w-4 mr-1 text-[#1F2937]/40" />
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Switch checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
                  <label className="text-xs font-medium text-[#1F2937]/60 whitespace-nowrap flex items-center gap-1">
                    <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" />
                    Verified Only
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content for all tabs shares the same layout */}
          {["all", "housing", "travel", "car-rental"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="space-y-6 mt-6">
              {/* Featured/Premium Section */}
              {featured.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Crown className="h-4 w-4 text-amber-500" />
                    <h2 className="text-sm font-semibold text-[#1F2937]">Featured Partners</h2>
                    <Separator className="flex-1" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {featured.map((v, i) => (
                      <VendorCard key={v.id} vendor={v} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* All Vendors */}
              {regular.length > 0 && (
                <div>
                  {featured.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <LayoutGrid className="h-4 w-4 text-[#0B3C5D]" />
                      <h2 className="text-sm font-semibold text-[#1F2937]">All Vendors</h2>
                      <Separator className="flex-1" />
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {regular.map((v, i) => (
                      <VendorCard key={v.id} vendor={v} index={featured.length + i} />
                    ))}
                  </div>
                </div>
              )}

              {filtered.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center"
                >
                  <Search className="h-10 w-10 mx-auto mb-3 text-[#1F2937]/20" />
                  <p className="text-sm text-[#1F2937]/50 mb-1">No vendors match your criteria</p>
                  <p className="text-xs text-[#1F2937]/30 mb-4">Try adjusting your filters or search terms</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#0B3C5D] border-[#0B3C5D]/20"
                    onClick={() => {
                      setSearch("");
                      setCityFilter("all");
                      setStateFilter("all");
                      setVerifiedOnly(false);
                    }}
                  >
                    <X className="h-3.5 w-3.5 mr-1" />
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* Concierge CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-[#0B3C5D]/15 bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/90 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDYwIEwgNjAgMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNnKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-50" />
          <CardContent className="p-6 md:p-8 relative">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-lg bg-white/10 p-2">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Can&apos;t find what you need?</h3>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">
                  Our concierge team specializes in finding perfect housing, travel, and transportation solutions for your candidates. Average response time: 2 hours.
                </p>
              </div>
              <Button
                size="lg"
                className="bg-white text-[#0B3C5D] hover:bg-white/90 font-semibold gap-2 shrink-0"
                onClick={() => setRequestOpen(true)}
              >
                <MessageSquare className="h-4 w-4" />
                Request Concierge Help
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
