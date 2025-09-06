"use client"

import { useState, useEffect, useCallback } from "react"

interface SyncItem {
  id: string
  type: "credential" | "loan_application" | "voice_enrollment" | "profile_update"
  data: any
  timestamp: number
  retryCount: number
}

interface SyncStatus {
  isOnline: boolean
  isSyncing: boolean
  lastSyncTime: number | null
  pendingItems: number
  failedItems: number
}

export function useOfflineSync() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    isSyncing: false,
    lastSyncTime: null,
    pendingItems: 0,
    failedItems: 0,
  })

  const [syncQueue, setSyncQueue] = useState<SyncItem[]>([])

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setSyncStatus((prev) => ({ ...prev, isOnline: true }))
      // Trigger sync when coming back online
      syncPendingItems()
    }

    const handleOffline = () => {
      setSyncStatus((prev) => ({ ...prev, isOnline: false }))
    }

    if (typeof window !== "undefined") {
      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)

      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [])

  // Load sync queue from IndexedDB on mount
  useEffect(() => {
    loadSyncQueue()
  }, [])

  const loadSyncQueue = async () => {
    try {
      const stored = localStorage.getItem("simbaid_sync_queue")
      if (stored) {
        const queue = JSON.parse(stored) as SyncItem[]
        setSyncQueue(queue)
        setSyncStatus((prev) => ({
          ...prev,
          pendingItems: queue.filter((item) => item.retryCount < 3).length,
          failedItems: queue.filter((item) => item.retryCount >= 3).length,
        }))
      }
    } catch (error) {
      console.error("Failed to load sync queue:", error)
    }
  }

  const saveSyncQueue = (queue: SyncItem[]) => {
    try {
      localStorage.setItem("simbaid_sync_queue", JSON.stringify(queue))
      setSyncStatus((prev) => ({
        ...prev,
        pendingItems: queue.filter((item) => item.retryCount < 3).length,
        failedItems: queue.filter((item) => item.retryCount >= 3).length,
      }))
    } catch (error) {
      console.error("Failed to save sync queue:", error)
    }
  }

  const addToSyncQueue = useCallback(
    (type: SyncItem["type"], data: any) => {
      const item: SyncItem = {
        id: `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type,
        data,
        timestamp: Date.now(),
        retryCount: 0,
      }

      const newQueue = [...syncQueue, item]
      setSyncQueue(newQueue)
      saveSyncQueue(newQueue)

      // Try to sync immediately if online
      if (syncStatus.isOnline) {
        syncItem(item)
      }

      return item.id
    },
    [syncQueue, syncStatus.isOnline],
  )

  const syncItem = async (item: SyncItem): Promise<boolean> => {
    try {
      // Mock API call - in real app this would call actual endpoints
      console.log(`[v0] Syncing ${item.type}:`, item.data)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

      // Simulate occasional failures for testing
      if (Math.random() < 0.1) {
        throw new Error("Network error")
      }

      // Remove successfully synced item from queue
      const newQueue = syncQueue.filter((queueItem) => queueItem.id !== item.id)
      setSyncQueue(newQueue)
      saveSyncQueue(newQueue)

      return true
    } catch (error) {
      console.error(`Failed to sync ${item.type}:`, error)

      // Increment retry count
      const newQueue = syncQueue.map((queueItem) =>
        queueItem.id === item.id ? { ...queueItem, retryCount: queueItem.retryCount + 1 } : queueItem,
      )
      setSyncQueue(newQueue)
      saveSyncQueue(newQueue)

      return false
    }
  }

  const syncPendingItems = useCallback(async () => {
    if (!syncStatus.isOnline || syncStatus.isSyncing) return

    setSyncStatus((prev) => ({ ...prev, isSyncing: true }))

    const pendingItems = syncQueue.filter((item) => item.retryCount < 3)

    for (const item of pendingItems) {
      await syncItem(item)
    }

    setSyncStatus((prev) => ({
      ...prev,
      isSyncing: false,
      lastSyncTime: Date.now(),
    }))
  }, [syncStatus.isOnline, syncStatus.isSyncing, syncQueue])

  const clearFailedItems = () => {
    const newQueue = syncQueue.filter((item) => item.retryCount < 3)
    setSyncQueue(newQueue)
    saveSyncQueue(newQueue)
  }

  const retryFailedItems = () => {
    const newQueue = syncQueue.map((item) => ({ ...item, retryCount: 0 }))
    setSyncQueue(newQueue)
    saveSyncQueue(newQueue)

    if (syncStatus.isOnline) {
      syncPendingItems()
    }
  }

  return {
    syncStatus,
    addToSyncQueue,
    syncPendingItems,
    clearFailedItems,
    retryFailedItems,
  }
}
