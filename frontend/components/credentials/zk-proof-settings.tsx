"use client"

import { useState } from "react"
import { Shield, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface ZKProofSettingsProps {
  credential: any
}

export function ZKProofSettings({ credential }: ZKProofSettingsProps) {
  const [zkEnabled, setZkEnabled] = useState(credential.zkProofEnabled)
  const [selectedFields, setSelectedFields] = useState({
    name: false,
    idNumber: false,
    dateOfBirth: true,
    nationality: true,
    issuePlace: false,
  })

  const handleFieldToggle = (field: string) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }))
  }

  return (
    <div className="space-y-6">
      {/* ZK-Proof Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Zero-Knowledge Proof Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="zk-enabled" className="text-base font-medium">
                Enable Zero-Knowledge Proofs
              </Label>
              <p className="text-sm text-muted-foreground">Verify credentials without revealing personal information</p>
            </div>
            <Switch id="zk-enabled" checked={zkEnabled} onCheckedChange={setZkEnabled} />
          </div>

          {zkEnabled && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Privacy Protected</span>
              </div>
              <p className="text-xs text-green-700">
                When sharing this credential, only verification status will be revealed, not your personal details.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Field-Level Privacy Controls */}
      {zkEnabled && (
        <Card>
          <CardHeader>
            <CardTitle>Field Privacy Settings</CardTitle>
            <p className="text-sm text-muted-foreground">Choose which fields can be selectively disclosed</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(credential.details).map(([field, value]) => (
              <div key={field} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Label className="capitalize font-medium">{field.replace(/([A-Z])/g, " $1").trim()}</Label>
                    {selectedFields[field as keyof typeof selectedFields] ? (
                      <Eye className="h-4 w-4 text-green-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedFields[field as keyof typeof selectedFields]
                      ? "Can be selectively disclosed"
                      : "Always hidden in ZK proofs"}
                  </p>
                </div>
                <Switch
                  checked={selectedFields[field as keyof typeof selectedFields]}
                  onCheckedChange={() => handleFieldToggle(field)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* ZK-Proof Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Common Verification Templates</CardTitle>
          <p className="text-sm text-muted-foreground">Pre-configured privacy settings for common use cases</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
            <div>
              <p className="font-medium">Age Verification Only</p>
              <p className="text-sm text-muted-foreground">Prove you're over 18 without revealing exact age</p>
            </div>
            <Button variant="outline" size="sm">
              Apply
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
            <div>
              <p className="font-medium">Nationality Verification</p>
              <p className="text-sm text-muted-foreground">Prove citizenship without revealing identity</p>
            </div>
            <Button variant="outline" size="sm">
              Apply
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
            <div>
              <p className="font-medium">Full Disclosure</p>
              <p className="text-sm text-muted-foreground">Share all credential information</p>
            </div>
            <Button variant="outline" size="sm">
              Apply
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
