"use client"

import { useState } from "react"
import { Plus, QrCode, Send, Download, Wifi, WifiOff, User, Shield, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CredentialCard } from "@/components/wallet/credential-card"
import { ActivityFeed } from "@/components/wallet/activity-feed"
import { QuickActions } from "@/components/wallet/quick-actions"
import { ReputationScore } from "@/components/wallet/reputation-score"

// Mock data - in real app this would come from API/storage
const mockUser = {
  name: "Amara Okafor",
  did: "did:simba:1234567890abcdef",
  voiceVerified: true,
  joinDate: "2024-01-15",
  avatar: "/african-woman-profile.png",
}

const mockCredentials = [
  {
    id: "1",
    type: "Identity Verification",
    issuer: "Kenya National ID",
    issuedDate: "2024-01-15",
    status: "verified",
    description: "Government-issued identity credential",
    icon: Shield,
  },
  {
    id: "2",
    type: "Education Certificate",
    issuer: "University of Nairobi",
    issuedDate: "2023-12-10",
    status: "verified",
    description: "Bachelor's Degree in Agriculture",
    icon: Award,
  },
  {
    id: "3",
    type: "Farmer Certification",
    issuer: "Kenya Agricultural Board",
    issuedDate: "2024-02-01",
    status: "pending",
    description: "Certified organic farmer credential",
    icon: User,
  },
]

const mockActivities = [
  {
    id: "1",
    type: "credential_issued",
    title: "New credential received",
    description: "Farmer Certification from Kenya Agricultural Board",
    timestamp: "2024-02-01T10:30:00Z",
    icon: Award,
  },
  {
    id: "2",
    type: "verification_completed",
    title: "Identity verified",
    description: "Voice biometric verification successful",
    timestamp: "2024-01-15T14:20:00Z",
    icon: Shield,
  },
  {
    id: "3",
    type: "credential_shared",
    title: "Credential shared",
    description: "Education certificate shared with loan provider",
    timestamp: "2024-01-10T09:15:00Z",
    icon: Send,
  },
]

export default function WalletDashboard() {
  const [isOnline, setIsOnline] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header with User Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {mockUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{mockUser.name}</h1>
              <div className="flex items-center gap-2">
                <Badge variant={mockUser.voiceVerified ? "default" : "secondary"} className="text-xs">
                  <Shield className="mr-1 h-3 w-3" />
                  Voice Verified
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {isOnline ? (
                    <>
                      <Wifi className="mr-1 h-3 w-3" />
                      Online
                    </>
                  ) : (
                    <>
                      <WifiOff className="mr-1 h-3 w-3" />
                      Offline
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm">
            <QrCode className="mr-2 h-4 w-4" />
            Share DID
          </Button>
        </div>

        {/* DID Information */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Decentralized Identifier</p>
                <p className="font-mono text-sm text-foreground break-all">{mockUser.did}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Reputation Score */}
            <ReputationScore score={750} maxScore={1000} />

            {/* Recent Credentials */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Credentials</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCredentials.slice(0, 2).map((credential) => (
                  <CredentialCard key={credential.id} credential={credential} />
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFeed activities={mockActivities.slice(0, 3)} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="credentials" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">My Credentials</h3>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Credential
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {mockCredentials.map((credential) => (
                <CredentialCard key={credential.id} credential={credential} showActions />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Activity History</h3>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <ActivityFeed activities={mockActivities} showAll />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
