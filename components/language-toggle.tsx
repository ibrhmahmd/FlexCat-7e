"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

interface LanguageToggleProps {
  language: string
  onToggle: () => void
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <Button
      onClick={onToggle}
      variant="outline"
      size="sm"
      className="rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all bg-transparent"
    >
      <Globe className="w-4 h-4 mr-2" />
      {language === "en" ? "العربية" : "English"}
    </Button>
  )
}
