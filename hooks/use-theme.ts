"use client"

import { useState, useEffect } from "react"
import { Cat, Rocket, Pizza, Bot } from "lucide-react"

export interface Theme {
  id: string
  name: string
  icon: any
  gradient: string
  elements: {
    emoji: string[]
    names: string[]
  }
  celebrationAnimation: string
}

export const themes: Theme[] = [
  {
    id: "cats",
    name: "cats",
    icon: Cat,
    gradient: "bg-gradient-to-r from-pink-500 to-purple-600",
    elements: {
      emoji: ["🐱", "🐈", "😺"],
      names: ["Whiskers", "Shadow", "Mittens"],
    },
    celebrationAnimation: "animate-bounce",
  },
  {
    id: "space",
    name: "space",
    icon: Rocket,
    gradient: "bg-gradient-to-r from-blue-500 to-cyan-600",
    elements: {
      emoji: ["🚀", "🛸", "🌟"],
      names: ["Rocket", "UFO", "Star"],
    },
    celebrationAnimation: "animate-pulse",
  },
  {
    id: "food",
    name: "food",
    icon: Pizza,
    gradient: "bg-gradient-to-r from-yellow-500 to-orange-600",
    elements: {
      emoji: ["🍕", "🍔", "🍰"],
      names: ["Pizza", "Burger", "Cake"],
    },
    celebrationAnimation: "animate-spin",
  },
  {
    id: "robots",
    name: "robots",
    icon: Bot,
    gradient: "bg-gradient-to-r from-green-500 to-teal-600",
    elements: {
      emoji: ["🤖", "⚙️", "🔧"],
      names: ["Bot", "Gear", "Tool"],
    },
    celebrationAnimation: "animate-ping",
  },
]

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0])

  useEffect(() => {
    const saved = localStorage.getItem("catflex-theme")
    if (saved) {
      const theme = themes.find((t) => t.id === saved)
      if (theme) {
        setCurrentTheme(theme)
      }
    }
  }, [])

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme)
    localStorage.setItem("catflex-theme", theme.id)
  }

  return {
    currentTheme,
    setTheme,
    themes,
  }
}
