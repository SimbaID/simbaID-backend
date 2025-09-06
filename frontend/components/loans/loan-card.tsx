"use client"

import { Calendar, Clock, CheckCircle, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Loan {
  id: string
  amount: number
  currency: string
  purpose: string
  status: "active" | "pending" | "completed"
  interestRate: number
  term: number
  monthlyPayment?: number
  remainingBalance?: number
  nextPaymentDate?: string
  appliedDate: string
  approvedDate?: string
  completedDate?: string
}

interface LoanCardProps {
  loan: Loan
  showDetails?: boolean
}

export function LoanCard({ loan, showDetails = false }: LoanCardProps) {
  const statusConfig = {
    active: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
    pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
    completed: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: CheckCircle },
  }

  const config = statusConfig[loan.status]
  const StatusIcon = config.icon

  const repaymentProgress = loan.remainingBalance ? ((loan.amount - loan.remainingBalance) / loan.amount) * 100 : 0

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-foreground">{loan.purpose}</h4>
              <Badge variant="outline" className={`text-xs ${config.color}`}>
                <StatusIcon className="mr-1 h-3 w-3" />
                {loan.status}
              </Badge>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {loan.currency} {loan.amount.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {loan.interestRate}% APR • {loan.term} months
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              {loan.status === "active" && <DropdownMenuItem>Make Payment</DropdownMenuItem>}
              <DropdownMenuItem>Download Statement</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {loan.status === "active" && loan.remainingBalance && (
          <>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Repayment Progress</span>
                <span className="font-medium">{Math.round(repaymentProgress)}%</span>
              </div>
              <Progress value={repaymentProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Remaining Balance</p>
                <p className="font-semibold text-foreground">
                  {loan.currency} {loan.remainingBalance.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Monthly Payment</p>
                <p className="font-semibold text-foreground">
                  {loan.currency} {loan.monthlyPayment?.toLocaleString()}
                </p>
              </div>
            </div>

            {loan.nextPaymentDate && (
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                <Calendar className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Next Payment Due</p>
                  <p className="text-xs text-muted-foreground">{new Date(loan.nextPaymentDate).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </>
        )}

        {loan.status === "pending" && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Clock className="h-4 w-4 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-800">Application Under Review</p>
              <p className="text-xs text-yellow-700">Applied on {new Date(loan.appliedDate).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {loan.status === "completed" && loan.completedDate && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">Loan Completed</p>
              <p className="text-xs text-green-700">Completed on {new Date(loan.completedDate).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {showDetails && (
          <div className="pt-3 border-t border-border/50">
            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div>
                <span>Applied: {new Date(loan.appliedDate).toLocaleDateString()}</span>
              </div>
              {loan.approvedDate && (
                <div>
                  <span>Approved: {new Date(loan.approvedDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
