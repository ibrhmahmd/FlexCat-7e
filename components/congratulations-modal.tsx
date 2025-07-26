"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { useDarkMode } from "@/hooks/use-dark-mode"
import type { Theme } from "@/hooks/use-theme"
import { Star } from "lucide-react"

interface CongratulationsModalProps {
  isOpen: boolean
  onClose: () => void
  userName: string
  tier: string
  theme: Theme
}

export function CongratulationsModal({ isOpen, onClose, userName, tier, theme }: CongratulationsModalProps) {
  const { language, t } = useLanguage()
  const { isDark } = useDarkMode()

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "beginner":
        return "from-green-400 to-emerald-600"
      case "intermediate":
        return "from-yellow-400 to-orange-600"
      case "advanced":
        return "from-red-400 to-pink-600"
      default:
        return "from-purple-400 to-pink-600"
    }
  }

  const getTierEmoji = (tier: string) => {
    switch (tier) {
      case "beginner":
        return "🌟"
      case "intermediate":
        return "🏆"
      case "advanced":
        return "👑"
      default:
        return "🎉"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-lg ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-gradient-to-br from-purple-50 to-pink-50"
        } rounded-3xl border-2 ${language === "ar" ? "rtl" : "ltr"}`}
      >
        <div className="space-y-6 p-6 text-center">
          {/* Animated celebration icons */}
          <div className="flex justify-center space-x-4 mb-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`bg-gradient-to-r ${getTierColor(tier)} p-3 rounded-2xl animate-bounce shadow-lg`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <theme.icon className="w-6 h-6 text-white" />
              </div>
            ))}
          </div>

          {/* Congratulations text */}
          <div className="space-y-4">
            <div className="text-6xl animate-pulse">{getTierEmoji(tier)}</div>

            <h2
              className={`text-3xl font-bold bg-gradient-to-r ${getTierColor(tier)} bg-clip-text text-transparent ${
                language === "ar" ? "font-arabic" : "font-comic"
              }`}
            >
              {language === "ar" ? "عاش!" : "Congratulations!"}
            </h2>

            <div
              className={`text-xl ${
                isDark ? "text-gray-200" : "text-gray-700"
              } ${language === "ar" ? "font-arabic" : ""}`}
            >
              {t("tierComplete", { name: userName, tier: t(tier) })}
            </div>

            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-8 h-8 text-yellow-400 fill-current animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Confetti effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"][
                    Math.floor(Math.random() * 5)
                  ],
                  animationDelay: `${Math.random() * 2000}ms`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>

          <Button
            onClick={onClose}
            className={`bg-gradient-to-r ${getTierColor(tier)} text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all px-8 py-3`}
          >
            {t("continue")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
