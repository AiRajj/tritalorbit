"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import {
  Search, Star, MapPin, Home, CheckCircle2, Wifi,
  Phone, Heart,
} from "lucide-react"

const housingOptions = [
  { id: "1", title: "Riverview Studio Apartment", address: "1234 River Dr, Portland, OR 97201", monthlyCost: 1600, distance: "2.8 miles", amenities: ["WiFi", "Parking", "Laundry", "Furnished"], availability: "Available Jun 1", verified: true, rating: 4.9, reviews: 28, vendor: "HomeFinder Pro", image: "studio" },
  { id: "2", title: "Pearl District Modern 1BR", address: "567 Pearl Blvd, Portland, OR 97209", monthlyCost: 2100, distance: "3.5 miles", amenities: ["WiFi", "Gym", "Rooftop", "Doorman", "Furnished"], availability: "Available Jun 1", verified: true, rating: 4.8, reviews: 31, vendor: "HomeFinder Pro", image: "1br" },
  { id: "3", title: "Downtown Executive Suite", address: "890 Main St, Portland, OR 97204", monthlyCost: 2400, distance: "4.1 miles", amenities: ["WiFi", "Gym", "Pool", "Parking", "Furnished"], availability: "Available Jun 15", verified: true, rating: 4.7, reviews: 22, vendor: "TravelNurse Homes", image: "suite" },
  { id: "4", title: "Eastside Cozy 1BR", address: "321 Hawthorne Ave, Portland, OR 97214", monthlyCost: 1400, distance: "5.2 miles", amenities: ["WiFi", "Laundry", "Pet-Friendly", "Furnished"], availability: "Available Jun 1", verified: false, rating: 4.5, reviews: 15, vendor: "Comfort Living Corp", image: "1br2" },
  { id: "5", title: "Sellwood Garden Cottage", address: "456 Sellwood Blvd, Portland, OR 97202", monthlyCost: 1800, distance: "6.1 miles", amenities: ["WiFi", "Parking", "Garden", "Pet-Friendly", "Furnished"], availability: "Available Jul 1", verified: true, rating: 4.6, reviews: 18, vendor: "NurseNest Housing", image: "cottage" },
  { id: "6", title: "NW Hills 2BR House", address: "789 Skyline Dr, Portland, OR 97210", monthlyCost: 2800, distance: "7.3 miles", amenities: ["WiFi", "Parking", "Yard", "Washer/Dryer", "Furnished"], availability: "Available Jun 1", verified: true, rating: 4.4, reviews: 8, vendor: "HomeFinder Pro", image: "house" },
]

export default function CandidateHousingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState("all")
  const [distanceFilter, setDistanceFilter] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])

  const filtered = housingOptions.filter((h) => {
    if (searchQuery && !h.title.toLowerCase().includes(searchQuery.toLowerCase()) && !h.address.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (priceRange === "under1500" && h.monthlyCost > 1500) return false
    if (priceRange === "1500-2000" && (h.monthlyCost < 1500 || h.monthlyCost > 2000)) return false
    if (priceRange === "over2000" && h.monthlyCost < 2000) return false
    if (distanceFilter === "under3" && parseFloat(h.distance) > 3) return false
    if (distanceFilter === "3to5" && (parseFloat(h.distance) < 3 || parseFloat(h.distance) > 5)) return false
    if (distanceFilter === "over5" && parseFloat(h.distance) < 5) return false
    return true
  })

  return (
    <DashboardLayout role="candidate">
      <div className="p-4 lg:p-6 max-w-[1200px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Housing Options</h1>
          <p className="text-sm text-muted-foreground mt-1">Browse available housing near your assignment in Portland, OR</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search housing..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-40 h-10"><SelectValue placeholder="Price" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="under1500">Under $1,500</SelectItem>
              <SelectItem value="1500-2000">$1,500 - $2,000</SelectItem>
              <SelectItem value="over2000">Over $2,000</SelectItem>
            </SelectContent>
          </Select>
          <Select value={distanceFilter} onValueChange={setDistanceFilter}>
            <SelectTrigger className="w-40 h-10"><SelectValue placeholder="Distance" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Distance</SelectItem>
              <SelectItem value="under3">Under 3 miles</SelectItem>
              <SelectItem value="3to5">3 - 5 miles</SelectItem>
              <SelectItem value="over5">Over 5 miles</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Housing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((housing, i) => (
            <motion.div key={housing.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="hover:shadow-md transition-all hover:border-[#0B3C5D]/30 h-full flex flex-col">
                {/* Color banner */}
                <div className="h-2 bg-gradient-to-r from-[#0B3C5D] to-[#0B3C5D]/60 rounded-t-lg" />
                <CardContent className="pt-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-base truncate">{housing.title}</p>
                        {housing.verified && (
                          <Badge variant="outline" className="text-[10px] h-5 gap-0.5 bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0">
                            <CheckCircle2 className="h-2.5 w-2.5" />Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" />{housing.address}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => {
                        setFavorites((prev) => prev.includes(housing.id) ? prev.filter((x) => x !== housing.id) : [...prev, housing.id])
                        toast.success(favorites.includes(housing.id) ? "Removed from favorites" : "Added to favorites")
                      }}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(housing.id) ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-2xl font-bold text-[#0B3C5D]">
                      ${housing.monthlyCost.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </div>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />{housing.distance} to facility
                    </span>
                  </div>

                  <div className="flex items-center flex-wrap gap-1.5 mb-3">
                    {housing.amenities.map((a) => (
                      <Badge key={a} variant="secondary" className="text-[10px] h-5">{a}</Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="text-muted-foreground">{housing.vendor}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{housing.rating}</span>
                      <span className="text-xs text-muted-foreground">({housing.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t">
                    <Badge variant="outline" className="text-[10px]">{housing.availability}</Badge>
                    <Button size="sm" onClick={() => toast.success(`Contact request sent for ${housing.title}`)}>
                      <Phone className="h-3.5 w-3.5 mr-1.5" />
                      Request Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <Card className="p-12 text-center">
            <Home className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium">No housing matches your filters</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search criteria</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
