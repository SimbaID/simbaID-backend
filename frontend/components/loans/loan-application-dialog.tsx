"use client"

import { useState } from "react"
import { DollarSign, FileText, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useOfflineSync } from "@/hooks/use-offline-sync"

interface LoanApplicationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  eligibility: any
}

export function LoanApplicationDialog({ open, onOpenChange, eligibility }: LoanApplicationDialogProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    amount: "",
    purpose: "",
    term: "",
    income: "",
    expenses: "",
    description: "",
    agreeToTerms: false,
  })

  const { syncStatus, addToSyncQueue } = useOfflineSync()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    console.log("Submitting loan application:", formData)

    addToSyncQueue("loan_application", {
      ...formData,
      applicationId: `loan_${Date.now()}`,
      submittedAt: new Date().toISOString(),
    })

    onOpenChange(false)
    setStep(1)
    setFormData({
      amount: "",
      purpose: "",
      term: "",
      income: "",
      expenses: "",
      description: "",
      agreeToTerms: false,
    })
  }

  const loanAmount = Number.parseFloat(formData.amount) || 0
  const loanTerm = Number.parseInt(formData.term) || 12
  const interestRate = eligibility.minInterestRate || 12
  const monthlyPayment =
    loanAmount > 0
      ? (loanAmount * (interestRate / 100 / 12)) / (1 - Math.pow(1 + interestRate / 100 / 12, -loanTerm))
      : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for Microloan</DialogTitle>
          {!syncStatus.isOnline && (
            <p className="text-sm text-muted-foreground">
              Offline mode: Application will be submitted when connection is restored
            </p>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && <div className={`h-px w-8 ${step > stepNumber ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Loan Details */}
          {step === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Loan Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Loan Amount (KES)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={formData.amount}
                      onChange={(e) => handleInputChange("amount", e.target.value)}
                      max={eligibility.maxAmount}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum eligible: KES {eligibility.maxAmount.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="purpose">Loan Purpose</Label>
                    <Select value={formData.purpose} onValueChange={(value) => handleInputChange("purpose", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agriculture">Agriculture & Farming</SelectItem>
                        <SelectItem value="business">Business Expansion</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="health">Healthcare</SelectItem>
                        <SelectItem value="equipment">Equipment Purchase</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="term">Repayment Term</Label>
                    <Select value={formData.term} onValueChange={(value) => handleInputChange("term", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="18">18 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Purpose Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe how you plan to use the loan"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Loan Preview */}
              {loanAmount > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Loan Amount:</span>
                      <span className="font-semibold">KES {loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Rate:</span>
                      <span className="font-semibold">{interestRate}% APR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Term:</span>
                      <span className="font-semibold">{loanTerm} months</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Monthly Payment:</span>
                      <span className="font-semibold text-primary">
                        KES {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 2: Financial Information */}
          {step === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Financial Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="income">Monthly Income (KES)</Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="Enter monthly income"
                      value={formData.income}
                      onChange={(e) => handleInputChange("income", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="expenses">Monthly Expenses (KES)</Label>
                    <Input
                      id="expenses"
                      type="number"
                      placeholder="Enter monthly expenses"
                      value={formData.expenses}
                      onChange={(e) => handleInputChange("expenses", e.target.value)}
                    />
                  </div>

                  {formData.income && formData.expenses && (
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm font-medium">Disposable Income</p>
                      <p className="text-lg font-bold text-primary">
                        KES{" "}
                        {(Number.parseFloat(formData.income) - Number.parseFloat(formData.expenses)).toLocaleString()}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Eligibility Factors */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Eligibility Factors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {eligibility.factors.map((factor: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-border/50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{factor.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={factor.status === "verified" ? "default" : "secondary"}>{factor.status}</Badge>
                        <span className="text-sm text-green-600">{factor.impact}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Application</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Loan Amount</p>
                      <p className="font-semibold">KES {Number.parseFloat(formData.amount || "0").toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Purpose</p>
                      <p className="font-semibold capitalize">{formData.purpose}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Term</p>
                      <p className="font-semibold">{formData.term} months</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly Payment</p>
                      <p className="font-semibold text-primary">
                        KES {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the terms and conditions and authorize the use of my verified credentials for loan
                        assessment
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={step === 1}>
              Previous
            </Button>

            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && (!formData.amount || !formData.purpose || !formData.term)) ||
                  (step === 2 && (!formData.income || !formData.expenses))
                }
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!formData.agreeToTerms}>
                {syncStatus.isOnline ? "Submit Application" : "Submit (Will Sync Later)"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
