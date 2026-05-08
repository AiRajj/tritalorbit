"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import {
  Search, Star, MapPin, Mail, CheckCircle2, Home,
  Car, Building2, Shield, ExternalLink,
} from "lucide-react"

const vendors = [
  { id: "1", name: "HomeFinder Pro", type: "Housing", city: "Portland", state: "OR", rating: 4.9, reviews: 142, verified: true, description: "Premium furnished apartments for healthcare travelers", contact: "lisa@homefinder.com", phone: "(503) 555-0100", properties: 18, avgPrice: "$1,800/mo" },
  { id: "2", name: "TravelNurse Homes", type: "Housing", city: "Los Angeles", state: "CA", rating: 4.7, reviews: 89, verified: true, description: "Fully furnished housing near top LA hospitals", contact: "info@tnhomes.com", phone: "(213) 555-0200", properties: 34, avgPrice: "$2,400/mo" },
  { id: "3", name: "AutoRent Healthcare", type: "Car Rental", city: "Nationwide", state: "US", rating: 4.5, reviews: 234, verified: true, description: "Discounted weekly car rentals for healthcare professionals", contact: "support@autorent.com", phone: "(800) 555-0300", properties: 0, avgPrice: "$280/week" },
  { id: "4", name: "MedStay Suites", type: "Housing", city: "Boston", state: "MA", rating: 4.8, reviews: 67, verified: true, description: "Extended stay suites within walking distance of major hospitals", contact: "book@medstay.com", phone: "(617) 555-0400", properties: 12, avgPrice: "$2,100/mo" },
  { id: "5", name: "SkyBridge Travel", type: "Travel", city: "Nationwide", state: "US", rating: 4.6, reviews: 312, verified: true, description: "Specialized travel booking for healthcare assignments", contact: "travel@skybridge.com", phone: "(800) 555-0500", properties: 0, avgPrice: "" },
  { id: "6", name: "Comfort Living Corp", type: "Housing", city: "San Francisco", state: "CA", rating: 4.3, reviews: 45, verified: false, description: "Affordable furnished rooms and apartments in SF Bay Area", contact: "info@comfortliving.com", phone: "(415) 555-0600", properties: 8, avgPrice: "$2,600/mo" },
  { id: "7", name: "DriveHealth Fleet", type: "Car Rental", city: "Southeast", state: "US", rating: 4.4, reviews: 78, verified: true, description: "Southeast region car rental program for travelers", contact: "fleet@drivehealth.com", phone: "(404) 555-0700", properties: 0, avgPrice: "$310/week" },
  { id: "8", name: "NurseNest Housing", type: "Housing", city: "Chicago", state: "IL", rating: 4.6, reviews: 56, verified: true, description: "Pet-friendly furnished apartments near Chicago hospitals", contact: "hello@nursenest.com", phone: "(312) 555-0800", properties: 15, avgPrice: "$1,900/mo" },
]

const typeIcons: Record<string, typeof Home> = { Housing: Home, "Car Rental": Car, Travel: Building2 }

export default function AgencyVendorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [stateFilter, setStateFilter] = useState("all")
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const filtered = vendors.filter((v) => {
    if (searchQuery && !v.name.toLowerCase().includes(searchQuery.toLowerCase()) && !v.city.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (typeFilter !== "all" && v.type !== typeFilter) return false
    if (stateFilter !== "all" && v.state !== stateFilter) return false
    if (verifiedOnly && !v.verified) return false
    return true
  })

  return (
    <DashboardLayout role="agency">
      <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">Vendor Marketplace</h1>
            <p className="text-sm text-muted-foreground mt-1">Browse verified housing, travel, and transportation vendors</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search vendors..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-36 h-10"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Housing">Housing</SelectItem>
              <SelectItem value="Car Rental">Car Rental</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
            </SelectContent>
          </Select>
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="w-36 h-10"><SelectValue placeholder="State" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              <SelectItem value="OR">Oregon</SelectItem>
              <SelectItem value="CA">California</SelectItem>
              <SelectItem value="MA">Massachusetts</SelectItem>
              <SelectItem value="IL">Illinois</SelectItem>
              <SelectItem value="US">Nationwide</SelectItem>
            </SelectContent>
          </Select>
          <Button variant={verifiedOnly ? "default" : "outline"} size="sm" onClick={() => setVerifiedOnly(!verifiedOnly)}>
            <Shield className="h-4 w-4 mr-1.5" />
            Verified Only
          </Button>
        </div>

        {/* Vendor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((vendor, i) => {
            const Icon = typeIcons[vendor.type] || Building2
            return (
              <motion.div key={vendor.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="hover:shadow-md transition-all hover:border-[#0B3C5D]/30 h-full flex flex-col">
                  <CardContent className="pt-6 flex-1 flex flex-col">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B3C5D]/5 shrink-0">
                        <Icon className="h-5 w-5 text-[#0B3C5D]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm truncate">{vendor.name}</p>
                          {vendor.verified && (
                            <Badge variant="outline" className="text-[10px] h-5 gap-0.5 bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0">
                              <CheckCircle2 className="h-2.5 w-2.5" />Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className="text-[10px] h-4">{vendor.type}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-0.5"><MapPin className="h-3 w-3" />{vendor.city}, {vendor.state}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 flex-1">{vendor.description}</p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-sm">{vendor.rating}</span>
                        <span className="text-xs text-muted-foreground">({vendor.reviews})</span>
                      </div>
                      {vendor.avgPrice && <span className="text-sm font-medium text-[#0B3C5D]">{vendor.avgPrice}</span>}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button className="flex-1" size="sm" onClick={() => toast.success(`Contact request sent to ${vendor.name}`)}>
                        <Mail className="h-3.5 w-3.5 mr-1.5" />Contact
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => toast.info(`Viewing ${vendor.name} profile`)}>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No vendors match your filters</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
