"use client"

import { formatDistanceToNow } from "date-fns"
import type { LucideIcon } from "lucide-react"

interface Activity {
  id: string
  type: string
  title: string
  description: string
  timestamp: string
  icon: LucideIcon
}

interface ActivityFeedProps {
  activities: Activity[]
  showAll?: boolean
}

export function ActivityFeed({ activities, showAll = false }: ActivityFeedProps) {
  const displayActivities = showAll ? activities : activities.slice(0, 3)

  return (
    <div className="space-y-4">
      {displayActivities.map((activity, index) => {
        const IconComponent = activity.icon
        const isLast = index === displayActivities.length - 1

        return (
          <div key={activity.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <IconComponent className="h-4 w-4 text-primary" />
              </div>
              {!isLast && <div className="mt-2 h-8 w-px bg-border" />}
            </div>

            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-foreground">{activity.title}</h4>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
