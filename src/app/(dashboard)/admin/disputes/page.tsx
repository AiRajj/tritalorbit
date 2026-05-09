"use client";

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Dispute = { id: string; disputeType: string; status: string; description: string };

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadDisputes() {
    const response = await fetch('/api/admin/disputes');
    if (!response.ok) return;
    const data = (await response.json()) as { disputes: Dispute[] };
    setDisputes(data.disputes ?? []);
  }

  useEffect(() => {
    void loadDisputes();
  }, []);

  async function createDispute(formData: FormData) {
    setLoading(true);
    const payload = {
      bookingId: formData.get('bookingId'),
      disputeType: formData.get('disputeType'),
      description: formData.get('description')
    };

    const response = await fetch('/api/admin/disputes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setLoading(false);
    if (!response.ok) {
      toast.error('Unable to create dispute.');
      return;
    }

    toast.success('Dispute created.');
    await loadDisputes();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create dispute</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createDispute} className="grid gap-3 md:grid-cols-3">
            <Input name="bookingId" placeholder="Booking ID (optional)" />
            <Input name="disputeType" placeholder="Dispute type" required />
            <Input name="description" placeholder="Description" required />
            <Button className="md:col-span-3" disabled={loading}>{loading ? 'Saving...' : 'Submit dispute'}</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {disputes.map((dispute) => (
          <Card key={dispute.id}>
            <CardHeader>
              <CardTitle className="text-base">{dispute.disputeType}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p>Status: {dispute.status}</p>
              <p>{dispute.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
