"use client"

import { WifiOff, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useOfflineSync } from "@/hooks/use-offline-sync"

export function OfflineBanner() {
  const { syncStatus, syncPendingItems } = useOfflineSync()

  if (syncStatus.isOnline) return null

  return (
    <Alert className="border-orange-200 bg-orange-50">
      <WifiOff className="h-4 w-4 text-orange-600" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-orange-800">
          You're currently offline. Your data will sync when connection is restored.
          {syncStatus.pendingItems > 0 && ` (${syncStatus.pendingItems} items pending)`}
        </span>
        <Button size="sm" variant="outline" onClick={() => window.location.reload()} className="ml-4">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  )
}
