"use client";

import { useState } from "react";

import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/form-controls";

export function LeadCaptureForm({
  mode = "lead",
  source = "website"
}: {
  mode?: "lead" | "demo" | "contact";
  source?: string;
}) {
  const [loading, setLoading] = useState(false);
  const { notify } = useToast();
  const endpoint = mode === "demo" ? "/api/demo-requests" : "/api/leads";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, source })
    });
    setLoading(false);

    if (response.ok) {
      form.reset();
      notify({
        title: mode === "demo" ? "Demo request received" : "Message received",
        body: "Your request was saved. The TRITAL Orbit team will follow up with the right next step."
      });
      return;
    }

    notify({
      title: "We could not save that yet",
      body: "Please check the required fields or try again. No information was lost in the browser."
    });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <Input name="name" required placeholder="Avery Stone" />
        </Field>
        <Field label="Work email">
          <Input name="email" type="email" required placeholder="avery@agency.com" />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company">
          <Input name="company" required={mode === "demo"} placeholder="Northstar Staffing" />
        </Field>
        <Field label="Role">
          <Select name="role" defaultValue="">
            <option value="" disabled>
              Select role
            </option>
            <option>Agency Owner</option>
            <option>Recruiter</option>
            <option>MSP Leader</option>
            <option>Concierge Manager</option>
            <option>Clinician</option>
            <option>Vendor / Landlord</option>
          </Select>
        </Field>
      </div>
      {mode === "demo" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Team size">
            <Input name="teamSize" placeholder="25 recruiters" />
          </Field>
          <Field label="Preferred time">
            <Input name="preferredTime" placeholder="Tuesday afternoon" />
          </Field>
        </div>
      ) : null}
      <Field label={mode === "demo" ? "Current offer-to-start friction" : "How can we help?"}>
        <Textarea name={mode === "demo" ? "currentPain" : "message"} placeholder="Tell us what needs to improve." />
      </Field>
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "Saving..." : mode === "demo" ? "Request demo" : "Submit"}
      </Button>
    </form>
  );
}
