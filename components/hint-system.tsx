"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/hooks/use-language"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { Lightbulb, X, Eye } from "lucide-react"
import type { Challenge } from "@/lib/challenges"

interface HintSystemProps {
  challenge: Challenge
  hintsUsed: number
  onClose: () => void
  userName: string
}

export function HintSystem({ challenge, hintsUsed, onClose, userName }: HintSystemProps) {
  const currentHints = challenge.hints.slice(0, hintsUsed)
  const { t, language } = useLanguage()
  const { isDark } = useDarkMode()

  return (
    <Card
      className={`mb-6 border-3 rounded-3xl shadow-2xl ${
        isDark ? "bg-gray-800 border-purple-600" : "border-purple-500"
      }`}
    >
      <div
        className={`p-6 border-b-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-3xl ${
          isDark ? "border-gray-700" : "border-purple-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-2xl">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${language === "ar" ? "font-arabic" : "font-comic"}`}>
                {language === "ar" ? `مساعدة لـ ${userName}` : `Hints for ${userName}`}
              </h3>
              <Badge variant="secondary" className="bg-white text-purple-600 mt-1">
                {hintsUsed}/3 {t("used")}
              </Badge>
            </div>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-2xl">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className={`p-6 space-y-4 ${isDark ? "bg-gray-800" : "bg-gradient-to-br from-purple-50 to-pink-50"}`}>
        {currentHints.map((hint, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
              {index + 1}
            </div>
            <div className="flex-1">
              <Card
                className={`p-4 rounded-2xl shadow-md ${
                  isDark ? "bg-gray-700 text-gray-200" : "bg-white text-gray-700"
                }`}
              >
                <p className={`${language === "ar" ? "font-arabic text-right" : ""}`}>
                  {language === "ar" ? `${userName}، ${hint}` : `${userName}, ${hint}`}
                </p>
              </Card>
            </div>
          </div>
        ))}

        {hintsUsed < 3 && (
          <div className="pt-4 border-t-2 border-dashed border-purple-300">
            <div
              className={`text-sm mb-3 p-3 rounded-2xl ${
                isDark ? "bg-gray-700 text-gray-300" : "bg-white text-gray-600"
              } ${language === "ar" ? "font-arabic text-right" : ""}`}
            >
              {language === "ar"
                ? `تحتاج مساعدة أكثر ${userName}؟ لديك ${3 - hintsUsed} تلميح متبقي.`
                : `Need more help ${userName}? You have ${3 - hintsUsed} hint${3 - hintsUsed !== 1 ? "s" : ""} remaining.`}
            </div>
          </div>
        )}

        {hintsUsed === 3 && (
          <div className="pt-4 border-t-2 border-dashed border-purple-300">
            <Button
              variant="outline"
              size="sm"
              className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Eye className="w-4 h-4 mr-2" />
              {t("showSolution")}
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
