"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import {
  Shield, Bot, Bell, Database,
  Globe, Save,
} from "lucide-react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    platformName: "TRITAL Orbit",
    supportEmail: "support@trital.com",
    maxTokensPerDay: 100000,
    aiModelPrimary: "gpt-4o-mini",
    enableOfferBoost: true,
    enableRetentionRadar: true,
    enableReadinessEngine: true,
    enableConcierge: true,
    enableMspReporter: true,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    enforceSSO: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    autoBackup: true,
    backupFrequency: "daily",
  })

  const updateSetting = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <DashboardLayout role="admin">
      <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">System Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">Configure platform behavior and integrations</p>
          </div>
          <Button onClick={() => toast.success("Settings saved successfully!")}>
            <Save className="h-4 w-4 mr-1.5" />Save Changes
          </Button>
        </div>

        {/* General */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Globe className="h-5 w-5 text-[#0B3C5D]" />General</CardTitle>
              <CardDescription>Basic platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Platform Name</Label>
                  <Input value={settings.platformName} onChange={(e) => updateSetting("platformName", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input type="email" value={settings.supportEmail} onChange={(e) => updateSetting("supportEmail", e.target.value)} />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium text-sm">Maintenance Mode</p>
                  <p className="text-xs text-muted-foreground">Temporarily disable access for all non-admin users</p>
                </div>
                <Switch checked={settings.maintenanceMode} onCheckedChange={(v) => { updateSetting("maintenanceMode", v); toast[v ? "warning" : "success"](v ? "Maintenance mode enabled" : "Maintenance mode disabled") }} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Configuration */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Bot className="h-5 w-5 text-purple-600" />AI Configuration</CardTitle>
              <CardDescription>Manage AI models and agent settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary AI Model</Label>
                  <Select value={settings.aiModelPrimary} onValueChange={(v) => updateSetting("aiModelPrimary", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Max Tokens per Day</Label>
                  <Input type="number" value={settings.maxTokensPerDay} onChange={(e) => updateSetting("maxTokensPerDay", parseInt(e.target.value))} />
                </div>
              </div>
              <Separator />
              <p className="text-sm font-medium">AI Agents</p>
              {[
                { key: "enableOfferBoost" as const, label: "Offer Boost AI", desc: "Generate enhanced offer communications" },
                { key: "enableRetentionRadar" as const, label: "Retention Radar", desc: "Predict candidate retention risk" },
                { key: "enableReadinessEngine" as const, label: "Readiness Engine", desc: "Assess assignment compliance readiness" },
                { key: "enableConcierge" as const, label: "Concierge Agent", desc: "Handle candidate support queries" },
                { key: "enableMspReporter" as const, label: "MSP Reporter", desc: "Generate executive MSP reports" },
              ].map((agent) => (
                <div key={agent.key} className="flex items-center justify-between rounded-lg border p-3">
                  <div><p className="font-medium text-sm">{agent.label}</p><p className="text-xs text-muted-foreground">{agent.desc}</p></div>
                  <Switch checked={settings[agent.key]} onCheckedChange={(v) => updateSetting(agent.key, v)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Shield className="h-5 w-5 text-[#E63946]" />Security</CardTitle>
              <CardDescription>Authentication and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input type="number" value={settings.sessionTimeout} onChange={(e) => updateSetting("sessionTimeout", parseInt(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Max Login Attempts</Label>
                  <Input type="number" value={settings.maxLoginAttempts} onChange={(e) => updateSetting("maxLoginAttempts", parseInt(e.target.value))} />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div><p className="font-medium text-sm">Enforce SSO</p><p className="text-xs text-muted-foreground">Require SSO for all users (Enterprise only)</p></div>
                <Switch checked={settings.enforceSSO} onCheckedChange={(v) => updateSetting("enforceSSO", v)} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Bell className="h-5 w-5 text-amber-600" />Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "emailNotifications" as const, label: "Email Notifications", desc: "Send email notifications for key events" },
                { key: "smsNotifications" as const, label: "SMS Notifications", desc: "Send SMS notifications (requires Twilio)" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-lg border p-3">
                  <div><p className="font-medium text-sm">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                  <Switch checked={settings[item.key]} onCheckedChange={(v) => updateSetting(item.key, v)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Database */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><Database className="h-5 w-5 text-emerald-600" />Database & Backups</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div><p className="font-medium text-sm">Auto Backup</p><p className="text-xs text-muted-foreground">Automatically backup database</p></div>
                <Switch checked={settings.autoBackup} onCheckedChange={(v) => updateSetting("autoBackup", v)} />
              </div>
              <div className="space-y-2">
                <Label>Backup Frequency</Label>
                <Select value={settings.backupFrequency} onValueChange={(v) => updateSetting("backupFrequency", v)}>
                  <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" onClick={() => toast.success("Manual backup initiated...")}>
                <Database className="h-4 w-4 mr-1.5" />Run Backup Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
