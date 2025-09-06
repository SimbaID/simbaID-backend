"use client"

import { useEffect, useRef } from "react"

interface VoiceWaveformProps {
  isRecording: boolean
  audioLevel: number
  duration: number
}

export function VoiceWaveform({ isRecording, audioLevel, duration }: VoiceWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = () => {
      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Set up gradient
      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, "rgb(217, 119, 6)") // primary color
      gradient.addColorStop(1, "rgb(161, 98, 7)") // secondary color

      ctx.fillStyle = gradient

      // Draw waveform bars
      const barCount = 20
      const barWidth = width / barCount
      const centerY = height / 2

      for (let i = 0; i < barCount; i++) {
        const x = i * barWidth
        let barHeight = 4 // minimum height

        if (isRecording) {
          // Animate based on audio level and add some randomness
          const randomFactor = Math.random() * 0.5 + 0.5
          barHeight = Math.max(4, audioLevel * height * 0.8 * randomFactor)
        }

        const y = centerY - barHeight / 2

        ctx.fillRect(x + 2, y, barWidth - 4, barHeight)
      }

      if (isRecording) {
        animationRef.current = requestAnimationFrame(draw)
      }
    }

    if (isRecording) {
      draw()
    } else {
      // Draw static waveform when not recording
      draw()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isRecording, audioLevel])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <canvas ref={canvasRef} width={300} height={80} className="rounded-lg bg-muted/30" />
        {isRecording && <div className="absolute -top-2 -right-2 h-4 w-4 animate-pulse rounded-full bg-red-500" />}
      </div>

      {duration > 0 && (
        <div className="text-sm text-muted-foreground">
          Duration: {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, "0")}
        </div>
      )}
    </div>
  )
}
