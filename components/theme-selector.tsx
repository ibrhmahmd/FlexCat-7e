"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useLanguage } from "@/hooks/use-language"
import { useDarkMode } from "@/hooks/use-dark-mode"
import type { Theme } from "@/hooks/use-theme"
import { Palette } from "lucide-react"

interface ThemeSelectorProps {
  currentTheme: Theme
  onThemeChange: (theme: Theme) => void
  themes: Theme[]
}

export function ThemeSelector({ currentTheme, onThemeChange, themes }: ThemeSelectorProps) {
  const { t } = useLanguage()
  const { isDark } = useDarkMode()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all bg-transparent"
        >
          <currentTheme.icon className="w-4 h-4 mr-2" />
          <Palette className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`w-80 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white"} rounded-2xl shadow-xl border-2`}
      >
        <div className="space-y-4">
          <h3 className={`font-semibold text-center ${isDark ? "text-white" : "text-gray-800"}`}>{t("selectTheme")}</h3>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <Card
                key={theme.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-lg transform hover:scale-105 ${
                  currentTheme.id === theme.id
                    ? "ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-pink-50"
                    : isDark
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "hover:bg-gray-50"
                } rounded-2xl`}
                onClick={() => onThemeChange(theme)}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`p-3 rounded-2xl ${theme.gradient}`}>
                    <theme.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                    {t(theme.name)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
