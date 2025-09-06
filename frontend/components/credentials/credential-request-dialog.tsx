"use client"

import { useState } from "react"
import { Search, Building, Award, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CredentialRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const availableCredentials = [
  {
    id: "gov-id",
    name: "Government ID",
    issuer: "Kenya National ID",
    category: "identity",
    icon: Shield,
    description: "Official government identification",
    requirements: ["Valid ID document", "Biometric verification"],
    processingTime: "1-2 days",
  },
  {
    id: "education",
    name: "Education Certificate",
    issuer: "Ministry of Education",
    category: "education",
    icon: Award,
    description: "Academic qualifications and certificates",
    requirements: ["Original certificates", "Institution verification"],
    processingTime: "3-5 days",
  },
  {
    id: "professional",
    name: "Professional License",
    issuer: "Professional Bodies",
    category: "professional",
    icon: User,
    description: "Professional certifications and licenses",
    requirements: ["Professional membership", "Skills assessment"],
    processingTime: "5-7 days",
  },
  {
    id: "health",
    name: "Health Insurance",
    issuer: "NHIF Kenya",
    category: "health",
    icon: Building,
    description: "Health insurance membership",
    requirements: ["Employment verification", "Premium payments"],
    processingTime: "1-3 days",
  },
]

export function CredentialRequestDialog({ open, onOpenChange }: CredentialRequestDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredCredentials = availableCredentials.filter((credential) => {
    const matchesSearch =
      credential.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      credential.issuer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || credential.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleRequestCredential = (credentialId: string) => {
    console.log("Requesting credential:", credentialId)
    // In real app, this would initiate the credential request process
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request New Credential</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search available credentials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              {["all", "identity", "education", "professional", "health"].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Available Credentials */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredCredentials.map((credential) => {
              const IconComponent = credential.icon
              return (
                <Card key={credential.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{credential.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{credential.issuer}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {credential.category}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{credential.description}</p>

                    <div>
                      <p className="text-sm font-medium mb-2">Requirements:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {credential.requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Processing: {credential.processingTime}</span>
                      <Button size="sm" onClick={() => handleRequestCredential(credential.id)}>
                        Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredCredentials.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No credentials found matching your search.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
