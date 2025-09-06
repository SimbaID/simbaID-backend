"use client"

import { useState } from "react"
import { Plus, Search, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CredentialCard } from "@/components/wallet/credential-card"
import { CredentialRequestDialog } from "@/components/credentials/credential-request-dialog"
import { CredentialFilters } from "@/components/credentials/credential-filters"

// Mock credentials data
const mockCredentials = [
  {
    id: "1",
    type: "Identity Verification",
    issuer: "Kenya National ID",
    issuedDate: "2024-01-15",
    expiryDate: "2029-01-15",
    status: "verified" as const,
    description: "Government-issued identity credential with biometric verification",
    category: "identity",
    zkProofEnabled: true,
  },
  {
    id: "2",
    type: "Education Certificate",
    issuer: "University of Nairobi",
    issuedDate: "2023-12-10",
    expiryDate: "2033-12-10",
    status: "verified" as const,
    description: "Bachelor's Degree in Agriculture with honors",
    category: "education",
    zkProofEnabled: true,
  },
  {
    id: "3",
    type: "Farmer Certification",
    issuer: "Kenya Agricultural Board",
    issuedDate: "2024-02-01",
    expiryDate: "2025-02-01",
    status: "pending" as const,
    description: "Certified organic farmer credential - pending verification",
    category: "professional",
    zkProofEnabled: false,
  },
  {
    id: "4",
    type: "Health Insurance",
    issuer: "NHIF Kenya",
    issuedDate: "2024-01-01",
    expiryDate: "2024-12-31",
    status: "verified" as const,
    description: "National Health Insurance Fund membership",
    category: "health",
    zkProofEnabled: true,
  },
]

export default function CredentialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showRequestDialog, setShowRequestDialog] = useState(false)

  const filteredCredentials = mockCredentials.filter((credential) => {
    const matchesSearch =
      credential.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      credential.issuer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || credential.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || credential.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const credentialStats = {
    total: mockCredentials.length,
    verified: mockCredentials.filter((c) => c.status === "verified").length,
    pending: mockCredentials.filter((c) => c.status === "pending").length,
    expired: mockCredentials.filter((c) => c.status === "expired").length,
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Credentials</h1>
            <p className="text-muted-foreground">Manage your verified credentials and digital certificates</p>
          </div>
          <Button onClick={() => setShowRequestDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Request Credential
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-foreground">{credentialStats.total}</p>
                </div>
                <Badge variant="outline">{credentialStats.total}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                  <p className="text-2xl font-bold text-green-600">{credentialStats.verified}</p>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">{credentialStats.verified}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{credentialStats.pending}</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{credentialStats.pending}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Expired</p>
                  <p className="text-2xl font-bold text-red-600">{credentialStats.expired}</p>
                </div>
                <Badge className="bg-red-100 text-red-800 border-red-200">{credentialStats.expired}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search credentials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <CredentialFilters
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
          />

          <div className="flex gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Credentials Grid/List */}
        <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
          {filteredCredentials.map((credential) => (
            <CredentialCard key={credential.id} credential={credential} showActions viewMode={viewMode} />
          ))}
        </div>

        {filteredCredentials.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No credentials found matching your criteria.</p>
              <Button className="mt-4" onClick={() => setShowRequestDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Request Your First Credential
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Request Credential Dialog */}
        <CredentialRequestDialog open={showRequestDialog} onOpenChange={setShowRequestDialog} />
      </div>
    </div>
  )
}
