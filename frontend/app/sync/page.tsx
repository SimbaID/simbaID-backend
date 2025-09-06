"use client"

import { RefreshCw, Database, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SyncStatusIndicator } from "@/components/offline/sync-status-indicator"
import { useOfflineSync } from "@/hooks/use-offline-sync"
import { useOfflineStorage } from "@/hooks/use-offline-storage"

export default function SyncPage() {
  const { syncStatus, syncPendingItems, retryFailedItems, clearFailedItems } = useOfflineSync()
  const { data: userData, lastUpdated } = useOfflineStorage("user_profile", {})
  const { data: credentialsData } = useOfflineStorage("credentials", [])
  const { data: loansData } = useOfflineStorage("loans", [])

  const handleExportData = () => {
    const exportData = {
      profile: userData,
      credentials: credentialsData,
      loans: loansData,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `simbaid-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const storageStats = {
    totalItems: (credentialsData?.length || 0) + (loansData?.length || 0) + 1,
    storageUsed: new Blob([JSON.stringify({ userData, credentialsData, loansData })]).size,
    maxStorage: 5 * 1024 * 1024, // 5MB limit for demo
  }

  const storagePercentage = (storageStats.storageUsed / storageStats.maxStorage) * 100

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Data Sync & Storage</h1>
            <p className="text-muted-foreground">Manage your offline data and synchronization settings</p>
          </div>
          <Button onClick={syncPendingItems} disabled={!syncStatus.isOnline || syncStatus.isSyncing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${syncStatus.isSyncing ? "animate-spin" : ""}`} />
            Sync Now
          </Button>
        </div>

        {/* Sync Status */}
        <SyncStatusIndicator variant="detailed" />

        {/* Storage Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Local Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Storage Used</span>
                  <span>
                    {(storageStats.storageUsed / 1024).toFixed(1)} KB /{" "}
                    {(storageStats.maxStorage / 1024 / 1024).toFixed(0)} MB
                  </span>
                </div>
                <Progress value={storagePercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Items</p>
                  <p className="text-lg font-semibold">{storageStats.totalItems}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="text-lg font-semibold">
                    {lastUpdated ? new Date(lastUpdated).toLocaleDateString() : "Never"}
                  </p>
                </div>
              </div>

              <Button variant="outline" onClick={handleExportData} className="w-full bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Export Backup
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Sync Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {Math.max(0, storageStats.totalItems - syncStatus.pendingItems - syncStatus.failedItems)}
                  </p>
                  <p className="text-sm text-green-700">Synced</p>
                </div>

                <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{syncStatus.pendingItems}</p>
                  <p className="text-sm text-yellow-700">Pending</p>
                </div>

                <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{syncStatus.failedItems}</p>
                  <p className="text-sm text-red-700">Failed</p>
                </div>

                <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{syncStatus.lastSyncTime ? "✓" : "—"}</p>
                  <p className="text-sm text-blue-700">Status</p>
                </div>
              </div>

              {syncStatus.failedItems > 0 && (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={retryFailedItems} className="flex-1 bg-transparent">
                    Retry Failed
                  </Button>
                  <Button variant="outline" onClick={clearFailedItems} className="flex-1 bg-transparent">
                    Clear Failed
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Offline Features */}
        <Card>
          <CardHeader>
            <CardTitle>Offline Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium text-green-600">Available Offline</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    View existing credentials
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Voice enrollment (stored locally)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Generate QR codes for sharing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    View loan information
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Access wallet dashboard
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-orange-600">Requires Connection</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    Submit loan applications
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    Request new credentials
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    Real-time verification
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    Sync with other devices
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                    Update reputation score
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
