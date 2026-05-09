"use client";

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type RecordItem = { id: string; documentType: string; status: string; vendor: { name: string } };

export default function AdminVendorVerificationPage() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadRecords() {
    const response = await fetch('/api/admin/vendor-verifications');
    if (!response.ok) return;
    const data = (await response.json()) as { records: RecordItem[] };
    setRecords(data.records ?? []);
  }

  useEffect(() => {
    void loadRecords();
  }, []);

  async function submitVerification(formData: FormData) {
    setLoading(true);
    const payload = {
      vendorId: formData.get('vendorId'),
      documentType: formData.get('documentType'),
      documentUrl: formData.get('documentUrl')
    };

    const response = await fetch('/api/admin/vendor-verifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setLoading(false);
    if (!response.ok) {
      toast.error('Unable to submit verification.');
      return;
    }

    toast.success('Verification record added.');
    await loadRecords();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add verification record</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={submitVerification} className="grid gap-3 md:grid-cols-3">
            <Input name="vendorId" placeholder="Vendor ID" required />
            <Input name="documentType" placeholder="Document type" required />
            <Input name="documentUrl" placeholder="Document URL (optional)" />
            <Button className="md:col-span-3" disabled={loading}>{loading ? 'Submitting...' : 'Submit verification'}</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {records.map((record) => (
          <Card key={record.id}>
            <CardHeader>
              <CardTitle className="text-base">{record.vendor.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p>Document: {record.documentType}</p>
              <p>Status: {record.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
