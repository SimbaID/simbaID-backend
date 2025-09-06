"use client"

import { Wifi, WifiOff, RefreshCw, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useOfflineSync } from "@/hooks/use-offline-sync"
import { formatDistanceToNow } from "date-fns"

interface SyncStatusIndicatorProps {
  variant?: "compact" | "detailed"
}

export function SyncStatusIndicator({ variant = "compact" }: SyncStatusIndicatorProps) {
  const { syncStatus, syncPendingItems, retryFailedItems, clearFailedItems } = useOfflineSync()

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className={`text-xs ${
            syncStatus.isOnline
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {syncStatus.isOnline ? (
            <>
              <Wifi className="mr-1 h-3 w-3" />
              Online
            </>
          ) : (
            <>
              <WifiOff className="mr-1 h-3 w-3" />
              Offline
            </>
          )}
        </Badge>

        {syncStatus.isSyncing && (
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
            <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
            Syncing
          </Badge>
        )}

        {syncStatus.pendingItems > 0 && (
          <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="mr-1 h-3 w-3" />
            {syncStatus.pendingItems} pending
          </Badge>
        )}

        {syncStatus.failedItems > 0 && (
          <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            {syncStatus.failedItems} failed
          </Badge>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Connection Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {syncStatus.isOnline ? (
                <Wifi className="h-5 w-5 text-green-600" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-600" />
              )}
              <div>
                <p className="font-medium">{syncStatus.isOnline ? "Connected" : "Offline Mode"}</p>
                <p className="text-sm text-muted-foreground">
                  {syncStatus.isOnline
                    ? "All features available"
                    : "Limited functionality - data will sync when connected"}
                </p>
              </div>
            </div>

            {syncStatus.isOnline && !syncStatus.isSyncing && syncStatus.pendingItems > 0 && (
              <Button size="sm" onClick={syncPendingItems}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync Now
              </Button>
            )}
          </div>

          {/* Sync Status */}
          {syncStatus.isSyncing && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
              <span className="text-sm text-blue-800">Synchronizing data...</span>
            </div>
          )}

          {/* Pending Items */}
          {syncStatus.pendingItems > 0 && (
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">{syncStatus.pendingItems} items waiting to sync</span>
              </div>
              {syncStatus.isOnline && (
                <Button size="sm" variant="outline" onClick={syncPendingItems}>
                  Sync Now
                </Button>
              )}
            </div>
          )}

          {/* Failed Items */}
          {syncStatus.failedItems > 0 && (
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-800">{syncStatus.failedItems} items failed to sync</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={retryFailedItems}>
                  Retry
                </Button>
                <Button size="sm" variant="outline" onClick={clearFailedItems}>
                  Clear
                </Button>
              </div>
            </div>
          )}

          {/* Last Sync Time */}
          {syncStatus.lastSyncTime && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Last synced {formatDistanceToNow(new Date(syncStatus.lastSyncTime), { addSuffix: true })}</span>
            </div>
          )}

          {/* Offline Instructions */}
          {!syncStatus.isOnline && (
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium mb-2">Working Offline</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Your data is stored locally and secure</li>
                <li>• Changes will sync automatically when connected</li>
                <li>• Voice enrollment and credential viewing still work</li>
                <li>• Some features may be limited without internet</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
