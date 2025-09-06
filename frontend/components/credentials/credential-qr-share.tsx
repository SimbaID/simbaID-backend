"use client"

import { useState } from "react"
import { QrCode, Copy, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface CredentialQRShareProps {
  credential: any
  onClose?: () => void
}

export function CredentialQRShare({ credential, onClose }: CredentialQRShareProps) {
  const [useZKProof, setUseZKProof] = useState(true)
  const [expiryTime, setExpiryTime] = useState("1h")

  // Mock QR code - in real app this would generate actual QR code
  const qrCodeData = `simba://verify/${credential.id}?zk=${useZKProof}&exp=${expiryTime}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrCodeData)
    // Show toast notification
  }

  const handleDownloadQR = () => {
    // Generate and download QR code image
    console.log("Downloading QR code")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Share Credential
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* QR Code Display */}
        <div className="flex justify-center">
          <div className="h-48 w-48 bg-muted rounded-lg flex items-center justify-center">
            {/* Mock QR Code - replace with actual QR code generator */}
            <div className="grid grid-cols-8 gap-1 p-4">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className={`h-2 w-2 ${Math.random() > 0.5 ? "bg-foreground" : "bg-background"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="zk-proof">Use Zero-Knowledge Proof</Label>
            <Switch id="zk-proof" checked={useZKProof} onCheckedChange={setUseZKProof} />
          </div>

          <div>
            <Label className="text-sm font-medium">Link Expiry</Label>
            <div className="flex gap-2 mt-2">
              {["15m", "1h", "24h", "7d"].map((time) => (
                <Button
                  key={time}
                  variant={expiryTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setExpiryTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopyLink} className="flex-1 bg-transparent">
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
          <Button variant="outline" onClick={handleDownloadQR} className="flex-1 bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          {useZKProof
            ? "Only verification status will be shared, not personal details"
            : "Full credential details will be shared"}
        </div>
      </CardContent>
    </Card>
  )
}
