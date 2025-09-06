"use client"

import { useState } from "react"
import { ArrowLeft, Download, Eye, EyeOff, QrCode, Shield, Calendar, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CredentialQRShare } from "@/components/credentials/credential-qr-share"
import { ZKProofSettings } from "@/components/credentials/zk-proof-settings"
import Link from "next/link"

// Mock credential data - in real app this would be fetched by ID
const mockCredential = {
  id: "1",
  type: "Identity Verification",
  issuer: "Kenya National ID",
  issuedDate: "2024-01-15",
  expiryDate: "2029-01-15",
  status: "verified" as const,
  description: "Government-issued identity credential with biometric verification",
  category: "identity",
  zkProofEnabled: true,
  details: {
    fullName: "Amara Okafor",
    idNumber: "12345678",
    dateOfBirth: "1990-05-15",
    nationality: "Kenyan",
    issuePlace: "Nairobi",
  },
  verificationHistory: [
    {
      date: "2024-02-01",
      verifier: "First Bank Kenya",
      purpose: "Loan Application",
      zkProofUsed: true,
    },
    {
      date: "2024-01-20",
      verifier: "Safaricom",
      purpose: "SIM Card Registration",
      zkProofUsed: false,
    },
  ],
}

export default function CredentialDetailPage({ params }: { params: { id: string } }) {
  const [showSensitiveData, setShowSensitiveData] = useState(false)
  const [showQRDialog, setShowQRDialog] = useState(false)

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/credentials">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Credentials
              </Button>
            </Link>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowQRDialog(true)}>
              <QrCode className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Credential Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{mockCredential.type}</CardTitle>
                  <p className="text-muted-foreground">{mockCredential.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant={mockCredential.status === "verified" ? "default" : "secondary"}>
                      {mockCredential.status}
                    </Badge>
                    {mockCredential.zkProofEnabled && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        ZK-Proof Enabled
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Issuer</p>
                  <p className="font-medium">{mockCredential.issuer}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Issued</p>
                  <p className="font-medium">{new Date(mockCredential.issuedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Expires</p>
                  <p className="font-medium">{new Date(mockCredential.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Credential Details</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowSensitiveData(!showSensitiveData)}>
                    {showSensitiveData ? (
                      <>
                        <EyeOff className="mr-2 h-4 w-4" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        Show Details
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(mockCredential.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                    <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    <span className="font-medium">{showSensitiveData ? value : "••••••••"}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <ZKProofSettings credential={mockCredential} />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Verification History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCredential.verificationHistory.map((verification, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{verification.verifier}</p>
                        <p className="text-sm text-muted-foreground">{verification.purpose}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(verification.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={verification.zkProofUsed ? "default" : "outline"}>
                        {verification.zkProofUsed ? "ZK-Proof" : "Full Data"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="share" className="space-y-4">
            <CredentialQRShare credential={mockCredential} />
          </TabsContent>
        </Tabs>

        {/* QR Share Dialog */}
        {showQRDialog && <CredentialQRShare credential={mockCredential} onClose={() => setShowQRDialog(false)} />}
      </div>
    </div>
  )
}
