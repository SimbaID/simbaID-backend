"use client"

import { MoreHorizontal, Share, Eye, Download, Shield } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface Credential {
  id: string
  type: string
  issuer: string
  issuedDate: string
  expiryDate?: string
  status: "verified" | "pending" | "expired"
  description: string
  category?: string
  zkProofEnabled?: boolean
  icon?: LucideIcon
}

interface CredentialCardProps {
  credential: Credential
  showActions?: boolean
  viewMode?: "grid" | "list"
}

export function CredentialCard({ credential, showActions = false, viewMode = "grid" }: CredentialCardProps) {
  const statusColors = {
    verified: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    expired: "bg-red-100 text-red-800 border-red-200",
  }

  const IconComponent = credential.icon || Shield

  if (viewMode === "list") {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <IconComponent className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{credential.type}</h4>
                <p className="text-sm text-muted-foreground">{credential.issuer}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Issued: {new Date(credential.issuedDate).toLocaleDateString()}
                </p>
                {credential.expiryDate && (
                  <p className="text-sm text-muted-foreground">
                    Expires: {new Date(credential.expiryDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-xs ${statusColors[credential.status]}`}>
                  {credential.status}
                </Badge>
                {credential.zkProofEnabled && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    ZK
                  </Badge>
                )}
              </div>

              {showActions && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/credentials/${credential.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="mr-2 h-4 w-4" />
                      Share Credential
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{credential.type}</h4>
              <p className="text-sm text-muted-foreground">{credential.issuer}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-xs ${statusColors[credential.status]}`}>
              {credential.status}
            </Badge>
            {credential.zkProofEnabled && (
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                ZK
              </Badge>
            )}

            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/credentials/${credential.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share className="mr-2 h-4 w-4" />
                    Share Credential
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3">{credential.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Issued: {new Date(credential.issuedDate).toLocaleDateString()}</span>
          {credential.expiryDate && <span>Expires: {new Date(credential.expiryDate).toLocaleDateString()}</span>}
        </div>

        {showActions && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <Link href={`/credentials/${credential.id}`}>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
