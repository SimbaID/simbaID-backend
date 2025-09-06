"use client"

import { useState } from "react"
import { Plus, TrendingUp, CheckCircle, AlertCircle, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { LoanApplicationDialog } from "@/components/loans/loan-application-dialog"
import { LoanCard } from "@/components/loans/loan-card"
import { EligibilityChecker } from "@/components/loans/eligibility-checker"

// Mock loan data
const mockLoans = [
  {
    id: "1",
    amount: 50000,
    currency: "KES",
    purpose: "Farm Equipment",
    status: "active",
    interestRate: 12,
    term: 12,
    monthlyPayment: 4500,
    remainingBalance: 35000,
    nextPaymentDate: "2024-03-15",
    appliedDate: "2024-01-15",
    approvedDate: "2024-01-18",
  },
  {
    id: "2",
    amount: 25000,
    currency: "KES",
    purpose: "Business Expansion",
    status: "pending",
    interestRate: 15,
    term: 6,
    monthlyPayment: 4500,
    appliedDate: "2024-02-01",
  },
  {
    id: "3",
    amount: 75000,
    currency: "KES",
    purpose: "Education",
    status: "completed",
    interestRate: 10,
    term: 24,
    monthlyPayment: 3500,
    appliedDate: "2023-06-15",
    approvedDate: "2023-06-20",
    completedDate: "2024-01-20",
  },
]

const mockReputationScore = 750
const mockEligibility = {
  maxAmount: 100000,
  minInterestRate: 10,
  recommendedAmount: 60000,
  factors: [
    { name: "Identity Verification", status: "verified", impact: "+20%" },
    { name: "Education Certificate", status: "verified", impact: "+15%" },
    { name: "Payment History", status: "good", impact: "+10%" },
    { name: "Community Standing", status: "excellent", impact: "+25%" },
  ],
}

export default function LoansPage() {
  const [showApplicationDialog, setShowApplicationDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const activeLoans = mockLoans.filter((loan) => loan.status === "active")
  const pendingLoans = mockLoans.filter((loan) => loan.status === "pending")
  const completedLoans = mockLoans.filter((loan) => loan.status === "completed")

  const totalBorrowed = mockLoans
    .filter((loan) => loan.status === "active" || loan.status === "completed")
    .reduce((sum, loan) => sum + loan.amount, 0)

  const totalOutstanding = activeLoans.reduce((sum, loan) => sum + (loan.remainingBalance || 0), 0)

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Microloans</h1>
            <p className="text-muted-foreground">Access financial services using your verified digital identity</p>
          </div>
          <Button onClick={() => setShowApplicationDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Apply for Loan
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reputation Score</p>
                  <p className="text-2xl font-bold text-primary">{mockReputationScore}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <Progress value={(mockReputationScore / 1000) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Borrowed</p>
                  <p className="text-2xl font-bold text-foreground">KES {totalBorrowed.toLocaleString()}</p>
                </div>
                <CreditCard className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding</p>
                  <p className="text-2xl font-bold text-orange-600">KES {totalOutstanding.toLocaleString()}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Loans</p>
                  <p className="text-2xl font-bold text-foreground">{activeLoans.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="active">Active ({activeLoans.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingLoans.length})</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Button
                    variant="outline"
                    className="h-auto flex-col gap-2 p-4 bg-transparent"
                    onClick={() => setShowApplicationDialog(true)}
                  >
                    <Plus className="h-6 w-6 text-primary" />
                    <div className="text-center">
                      <div className="text-sm font-medium">Apply for Loan</div>
                      <div className="text-xs text-muted-foreground">Get up to KES 100,000</div>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto flex-col gap-2 p-4 bg-transparent">
                    <CreditCard className="h-6 w-6 text-secondary" />
                    <div className="text-center">
                      <div className="text-sm font-medium">Make Payment</div>
                      <div className="text-xs text-muted-foreground">Pay your loans</div>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto flex-col gap-2 p-4 bg-transparent">
                    <TrendingUp className="h-6 w-6 text-accent" />
                    <div className="text-center">
                      <div className="text-sm font-medium">Improve Score</div>
                      <div className="text-xs text-muted-foreground">Build reputation</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Loans */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Loans</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockLoans.slice(0, 2).map((loan) => (
                  <LoanCard key={loan.id} loan={loan} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4">
              {activeLoans.map((loan) => (
                <LoanCard key={loan.id} loan={loan} showDetails />
              ))}
            </div>
            {activeLoans.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No active loans</p>
                  <Button className="mt-4" onClick={() => setShowApplicationDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Apply for Your First Loan
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid gap-4">
              {pendingLoans.map((loan) => (
                <LoanCard key={loan.id} loan={loan} showDetails />
              ))}
            </div>
            {pendingLoans.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No pending applications</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="eligibility" className="space-y-4">
            <EligibilityChecker reputationScore={mockReputationScore} eligibility={mockEligibility} />
          </TabsContent>
        </Tabs>

        {/* Loan Application Dialog */}
        <LoanApplicationDialog
          open={showApplicationDialog}
          onOpenChange={setShowApplicationDialog}
          eligibility={mockEligibility}
        />
      </div>
    </div>
  )
}
