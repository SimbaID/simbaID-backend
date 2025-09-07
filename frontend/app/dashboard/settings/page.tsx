"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ZKProofSettings } from "@/components/credentials/zk-proof-settings"

export default function SettingsPage() {
  const [autoSync, setAutoSync] = useState(true)
  const [zkEnabled, setZkEnabled] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your app, privacy and sync preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Basic profile info stored locally</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="displayName">Display name</Label>
              <Input id="displayName" placeholder="Your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="language">Preferred language</Label>
              <Input id="language" placeholder="e.g. English, Swahili" />
            </div>
            <Button>Save Profile</Button>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
            <CardDescription>Control your zero-knowledge preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label className="text-base">Enable ZK-Proofs</Label>
                <p className="text-sm text-muted-foreground">Verify information without revealing details</p>
              </div>
              <Switch checked={zkEnabled} onCheckedChange={setZkEnabled} />
            </div>
            <Button variant="outline" className="bg-transparent">Advanced ZK Settings</Button>
          </CardContent>
        </Card>

        {/* Sync */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Offline Sync</CardTitle>
            <CardDescription>Configure how data syncs when you go online</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label className="text-base">Auto-sync in background</Label>
                <p className="text-sm text-muted-foreground">Sync pending items automatically when online</p>
              </div>
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>
            <div className="flex gap-3">
              <Button>Sync Now</Button>
              <Button variant="outline" className="bg-transparent">View Sync Queue</Button>
            </div>
          </CardContent>
        </Card>

        {/* Credential Privacy (ZK Proof Settings) */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Credential Privacy</CardTitle>
            <CardDescription>Configure which fields can be revealed using zero-knowledge proofs</CardDescription>
          </CardHeader>
          <CardContent>
            <ZKProofSettings
              credential={{
                zkProofEnabled: zkEnabled,
                details: {
                  name: "Ada Lovelace",
                  idNumber: "A1234567",
                  dateOfBirth: "1990-01-01",
                  nationality: "Kenyan",
                  issuePlace: "Nairobi",
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
