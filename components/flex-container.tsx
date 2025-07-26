"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { useDarkMode } from "@/hooks/use-dark-mode"
import type { Theme } from "@/hooks/use-theme"

interface FlexContainerProps {
  css: string
  targetPositions?: Array<{ x: number; y: number }>
  showCelebration: boolean
  theme: Theme
  userName: string
}

export function FlexContainer({ css, targetPositions, showCelebration, theme, userName }: FlexContainerProps) {
  const [appliedStyles, setAppliedStyles] = useState<React.CSSProperties>({})
  const { t } = useLanguage()
  const { isDark } = useDarkMode()

  const elements = [
    { id: 1, emoji: theme.elements.emoji[0], name: theme.elements.names[0] },
    { id: 2, emoji: theme.elements.emoji[1], name: theme.elements.names[1] },
    { id: 3, emoji: theme.elements.emoji[2], name: theme.elements.names[2] },
  ]

  useEffect(() => {
    try {
      const styles: React.CSSProperties = {
        display: "flex",
        width: "100%",
        height: "350px",
        border: `3px dashed ${isDark ? "#4A5568" : "#CBD5E0"}`,
        borderRadius: "24px",
        backgroundColor: isDark ? "#2D3748" : "#F7FAFC",
        position: "relative",
        transition: "all 0.3s ease-in-out",
        backgroundImage: isDark
          ? `linear-gradient(to right, #4A5568 1px, transparent 1px), linear-gradient(to bottom, #4A5568 1px, transparent 1px)`
          : `linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)`,
        backgroundSize: "25px 25px",
      }

      const cssRules = css.match(/([a-z-]+)\s*:\s*([^;]+)/gi) || []

      cssRules.forEach((rule) => {
        const [property, value] = rule.split(":").map((s) => s.trim())
        const camelCaseProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())

        const validProperties = [
          "display",
          "flexDirection",
          "justifyContent",
          "alignItems",
          "flexWrap",
          "alignContent",
          "gap",
        ]

        if (validProperties.includes(camelCaseProperty)) {
          styles[camelCaseProperty as keyof React.CSSProperties] = value as any
        }
      })

      setAppliedStyles(styles)
    } catch (error) {
      console.error("Error parsing CSS:", error)
    }
  }, [css, isDark])

  return (
    <div className="space-y-6">
      {targetPositions && (
        <div
          className={`text-sm p-3 rounded-2xl ${
            isDark ? "bg-gray-700 text-gray-200" : "bg-blue-50 text-blue-700"
          } shadow-inner`}
        >
          🎯 <strong>{t("target", { name: userName })}:</strong> Position the {theme.name} to match the highlighted
          areas
        </div>
      )}

      <div className="relative overflow-hidden shadow-2xl" style={appliedStyles}>
        {/* Target Position Indicators */}
        {targetPositions?.map((pos, index) => (
          <div
            key={`target-${index}`}
            className="absolute w-20 h-20 bg-green-400 opacity-40 rounded-3xl border-3 border-green-400 border-dashed animate-pulse"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Theme Elements */}
        {elements.map((element, index) => (
          <div
            key={element.id}
            className={`flex flex-col items-center justify-center p-4 ${
              isDark ? "bg-gray-600 border-gray-500" : "bg-white border-gray-200"
            } rounded-3xl shadow-lg border-3 transition-all duration-500 ease-in-out transform hover:scale-105 ${
              showCelebration ? theme.celebrationAnimation : ""
            }`}
            style={{
              minWidth: "80px",
              minHeight: "80px",
            }}
          >
            <div className="text-3xl mb-2 drop-shadow-lg">{element.emoji}</div>
            <div className={`text-xs font-bold ${isDark ? "text-gray-200" : "text-gray-700"} text-center`}>
              {element.name}
            </div>
          </div>
        ))}

        {/* Celebration Effects */}
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 rounded-full animate-ping shadow-lg"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"][
                    Math.floor(Math.random() * 6)
                  ],
                  animationDelay: `${Math.random() * 1000}ms`,
                  animationDuration: "1.5s",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* CSS Properties Display */}
      <Card
        className={`p-4 ${isDark ? "bg-gray-900 border-gray-700" : "bg-gray-800"} text-white rounded-3xl shadow-xl`}
      >
        <div className="text-sm font-mono">
          <div className="text-green-400 mb-2 font-bold">Applied CSS Properties:</div>
          {Object.entries(appliedStyles)
            .filter(([key]) => !["transition", "position", "backgroundImage", "backgroundSize"].includes(key))
            .map(([key, value]) => (
              <div key={key} className="text-gray-300 hover:text-white transition-colors">
                <span className="text-pink-400">{key.replace(/([A-Z])/g, "-$1").toLowerCase()}</span>
                <span className="text-white">: </span>
                <span className="text-cyan-400">{String(value)}</span>
                <span className="text-white">;</span>
              </div>
            ))}
        </div>
      </Card>
    </div>
  )
}
