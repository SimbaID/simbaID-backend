"use client"

import { TrendingUp, CheckCircle, AlertCircle, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface EligibilityCheckerProps {
  reputationScore: number
  eligibility: {
    maxAmount: number
    minInterestRate: number
    recommendedAmount: number
    factors: Array<{
      name: string
      status: string
      impact: string
    }>
  }
}

export function EligibilityChecker({ reputationScore, eligibility }: EligibilityCheckerProps) {
  const scorePercentage = (reputationScore / 1000) * 100

  const getScoreLevel = (score: number) => {
    if (score >= 800) return { level: "Excellent", color: "text-green-600", bgColor: "bg-green-100" }
    if (score >= 600) return { level: "Good", color: "text-blue-600", bgColor: "bg-blue-100" }
    if (score >= 400) return { level: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-100" }
    return { level: "Building", color: "text-orange-600", bgColor: "bg-orange-100" }
  }

  const scoreLevel = getScoreLevel(reputationScore)

  return (
    <div className="space-y-6">
      {/* Reputation Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Your Reputation Score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground">{reputationScore}</p>
              <p className="text-sm text-muted-foreground">out of 1000</p>
            </div>
            <Badge className={`${scoreLevel.bgColor} ${scoreLevel.color} border-transparent`}>{scoreLevel.level}</Badge>
          </div>

          <Progress value={scorePercentage} className="h-3" />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Maximum Loan</p>
              <p className="text-lg font-semibold text-primary">KES {eligibility.maxAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Best Rate</p>
              <p className="text-lg font-semibold text-primary">{eligibility.minInterestRate}% APR</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Eligibility Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Eligibility Factors</CardTitle>
          <p className="text-sm text-muted-foreground">
            These verified credentials contribute to your loan eligibility
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {eligibility.factors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div className="flex items-center gap-3">
                {factor.status === "verified" || factor.status === "excellent" || factor.status === "good" ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                )}
                <div>
                  <p className="font-medium">{factor.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{factor.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">{factor.impact}</p>
                <p className="text-xs text-muted-foreground">Impact on rate</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <p className="font-medium text-primary">Recommended Loan Amount</p>
            </div>
            <p className="text-2xl font-bold text-foreground">KES {eligibility.recommendedAmount.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Based on your reputation score and financial profile</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Ways to improve your eligibility:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                Add more verified credentials to your wallet
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                Maintain good payment history on existing loans
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                Increase community engagement and trust score
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                Complete additional identity verification steps
              </li>
            </ul>
          </div>

          <Button className="w-full">Apply for Recommended Amount</Button>
        </CardContent>
      </Card>
    </div>
  )
}
