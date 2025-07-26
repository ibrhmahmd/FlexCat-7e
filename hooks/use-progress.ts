"use client"

import { useState, useEffect } from "react"

export interface ProgressEntry {
  level: number
  completed: boolean
  score: number
  attempts: number
  hintsUsed: number
  completedAt?: Date
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressEntry[]>([])

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("catflex-progress")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setProgress(
          parsed.map((p: any) => ({
            ...p,
            completedAt: p.completedAt ? new Date(p.completedAt) : undefined,
          })),
        )
      } catch (error) {
        console.error("Error loading progress:", error)
      }
    }
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (progress.length > 0) {
      localStorage.setItem("catflex-progress", JSON.stringify(progress))
    }
  }, [progress])

  const updateProgress = (level: number, score: number, attempts: number, hintsUsed: number) => {
    setProgress((prev) => {
      const existing = prev.find((p) => p.level === level)
      const newEntry: ProgressEntry = {
        level,
        completed: true,
        score: Math.max(score, existing?.score || 0), // Keep best score
        attempts,
        hintsUsed,
        completedAt: new Date(),
      }

      if (existing) {
        return prev.map((p) => (p.level === level ? newEntry : p))
      } else {
        return [...prev, newEntry]
      }
    })
  }

  const getScore = (level: number, attempts: number, hintsUsed: number) => {
    // Base score of 100, minus 10 for each hint used
    const baseScore = 100 - hintsUsed * 10
    // Bonus for fewer attempts (up to 20 bonus points)
    const attemptBonus = Math.max(0, 20 - attempts)
    return Math.max(0, Math.min(100, baseScore + attemptBonus))
  }

  const resetProgress = () => {
    setProgress([])
    localStorage.removeItem("catflex-progress")
  }

  return {
    progress,
    updateProgress,
    getScore,
    resetProgress,
  }
}
