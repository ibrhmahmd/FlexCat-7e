"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

interface DarkModeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export function DarkModeToggle({ isDark, onToggle }: DarkModeToggleProps) {
  return (
    <Button
      onClick={onToggle}
      variant="outline"
      size="sm"
      className="rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all bg-transparent"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  )
}
