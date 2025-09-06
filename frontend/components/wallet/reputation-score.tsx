"use client"

import { TrendingUp, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface ReputationScoreProps {
  score: number
  maxScore: number
}

export function ReputationScore({ score, maxScore }: ReputationScoreProps) {
  const percentage = (score / maxScore) * 100

  const getScoreLevel = (score: number) => {
    if (score >= 800) return { level: "Excellent", color: "bg-green-500" }
    if (score >= 600) return { level: "Good", color: "bg-blue-500" }
    if (score >= 400) return { level: "Fair", color: "bg-yellow-500" }
    return { level: "Building", color: "bg-orange-500" }
  }

  const { level, color } = getScoreLevel(score)

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Reputation Score
          </CardTitle>
          <Badge variant="outline" className={`${color} text-white border-transparent`}>
            {level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-foreground">{score}</span>
          <span className="text-sm text-muted-foreground">/ {maxScore}</span>
        </div>

        <Progress value={percentage} className="h-2" />

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span>+25 points this month</span>
        </div>

        <div className="text-sm text-muted-foreground">
          Your reputation score is based on verified credentials, transaction history, and community trust.
        </div>
      </CardContent>
    </Card>
  )
}
