"use client"

import { useState, useEffect } from "react"

interface StorageItem<T> {
  data: T
  timestamp: number
  synced: boolean
}

export function useOfflineStorage<T>(key: string, initialValue: T) {
  const [data, setData] = useState<T>(initialValue)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`simbaid_${key}`)
      if (stored) {
        const parsed = JSON.parse(stored) as StorageItem<T>
        setData(parsed.data)
        setLastUpdated(parsed.timestamp)
      }
    } catch (error) {
      console.error(`Failed to load ${key} from storage:`, error)
    } finally {
      setIsLoading(false)
    }
  }, [key])

  const updateData = (newData: T, synced = false) => {
    const item: StorageItem<T> = {
      data: newData,
      timestamp: Date.now(),
      synced,
    }

    try {
      localStorage.setItem(`simbaid_${key}`, JSON.stringify(item))
      setData(newData)
      setLastUpdated(item.timestamp)
    } catch (error) {
      console.error(`Failed to save ${key} to storage:`, error)
    }
  }

  const clearData = () => {
    try {
      localStorage.removeItem(`simbaid_${key}`)
      setData(initialValue)
      setLastUpdated(null)
    } catch (error) {
      console.error(`Failed to clear ${key} from storage:`, error)
    }
  }

  return {
    data,
    updateData,
    clearData,
    isLoading,
    lastUpdated,
  }
}
