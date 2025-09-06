"use client"

import { QrCode, Send, Plus, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function QuickActions() {
  const actions = [
    {
      icon: QrCode,
      label: "Share Identity",
      description: "Generate QR code",
      onClick: () => console.log("Share identity"),
    },
    {
      icon: Send,
      label: "Send Credential",
      description: "Share with verifier",
      onClick: () => console.log("Send credential"),
    },
    {
      icon: Plus,
      label: "Add Credential",
      description: "Request new credential",
      onClick: () => console.log("Add credential"),
    },
    {
      icon: CreditCard,
      label: "Apply for Loan",
      description: "Use your reputation",
      onClick: () => console.log("Apply for loan"),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {actions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto flex-col gap-2 p-4 bg-transparent"
                onClick={action.onClick}
              >
                <IconComponent className="h-6 w-6 text-primary" />
                <div className="text-center">
                  <div className="text-sm font-medium">{action.label}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
