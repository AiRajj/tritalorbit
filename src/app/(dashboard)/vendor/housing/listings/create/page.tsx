"use client";

import { toast } from 'sonner';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateHousingListingPage() {
  const [loading, setLoading] = useState(false);

  async function createListing(formData: FormData) {
    setLoading(true);
    const payload = {
      vendorId: formData.get('vendorId'),
      propertyType: formData.get('propertyType'),
      furnished: formData.get('furnished') === 'yes',
      monthlyCost: Number(formData.get('monthlyCost')),
      deposit: Number(formData.get('deposit') ?? 0),
      distanceToFacility: Number(formData.get('distanceToFacility') ?? 0)
    };

    const response = await fetch('/api/partners/housing-listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setLoading(false);
    if (!response.ok) {
      toast.error('Unable to create listing.');
      return;
    }

    toast.success('Listing created successfully.');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create housing listing</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createListing} className="grid gap-3 md:grid-cols-2">
          <Input name="vendorId" placeholder="Vendor ID" required />
          <Input name="propertyType" placeholder="Property type" required />
          <Input name="monthlyCost" placeholder="Monthly cost" required type="number" />
          <Input name="deposit" placeholder="Deposit" type="number" />
          <Input name="distanceToFacility" placeholder="Distance to facility (miles)" type="number" />
          <select name="furnished" className="h-10 rounded-md border border-slate-300 px-3 text-sm">
            <option value="yes">Furnished</option>
            <option value="no">Unfurnished</option>
          </select>
          <Button className="md:col-span-2" disabled={loading}>{loading ? 'Saving...' : 'Create listing'}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
