"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { Lock, Star, Check, Crown, Trophy, Target } from "lucide-react"
import { challenges } from "@/lib/challenges"
import type { ProgressEntry } from "@/hooks/use-progress"

interface LevelSelectorProps {
  currentLevel: number
  onLevelChange: (level: number) => void
  progress: ProgressEntry[]
  userName: string
}

export function LevelSelector({ currentLevel, onLevelChange, progress, userName }: LevelSelectorProps) {
  const { t, language } = useLanguage()
  const { isDark } = useDarkMode()

  const getProgressForLevel = (level: number) => {
    return progress.find((p) => p.level === level)
  }

  const isLevelUnlocked = (level: number) => {
    if (level === 0) return true
    const prevProgress = getProgressForLevel(level - 1)
    return prevProgress?.completed || false
  }

  const getLevelTier = (level: number) => {
    if (level < 4)
      return {
        name: "beginner",
        color: "from-green-400 to-emerald-600",
        icon: Target,
        bgColor: isDark ? "bg-green-900" : "bg-green-50",
        textColor: isDark ? "text-green-300" : "text-green-700",
        borderColor: isDark ? "border-green-700" : "border-green-200",
      }
    if (level < 7)
      return {
        name: "intermediate",
        color: "from-yellow-400 to-orange-600",
        icon: Trophy,
        bgColor: isDark ? "bg-yellow-900" : "bg-yellow-50",
        textColor: isDark ? "text-yellow-300" : "text-yellow-700",
        borderColor: isDark ? "border-yellow-700" : "border-yellow-200",
      }
    return {
      name: "advanced",
      color: "from-red-400 to-pink-600",
      icon: Crown,
      bgColor: isDark ? "bg-red-900" : "bg-red-50",
      textColor: isDark ? "text-red-300" : "text-red-700",
      borderColor: isDark ? "border-red-700" : "border-red-200",
    }
  }

  return (
    <Card
      className={`p-6 rounded-3xl shadow-xl border-2 ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-purple-200"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-gray-800"
          } ${language === "ar" ? "font-arabic" : "font-comic"}`}
        >
          {language === "ar" ? `تقدم ${userName}` : `${userName}'s Progress`}
        </h2>
        <div className="flex gap-3">
          {[
            { tier: "beginner", range: "1-4", icon: Target },
            { tier: "intermediate", range: "5-7", icon: Trophy },
            { tier: "advanced", range: "8-9", icon: Crown },
          ].map(({ tier, range, icon: Icon }) => {
            const tierInfo = getLevelTier(tier === "beginner" ? 0 : tier === "intermediate" ? 4 : 7)
            return (
              <Badge
                key={tier}
                variant="outline"
                className={`${tierInfo.bgColor} ${tierInfo.textColor} ${tierInfo.borderColor} rounded-2xl px-3 py-1 shadow-md`}
              >
                <Icon className="w-4 h-4 mr-1" />
                {t(tier)} ({range})
              </Badge>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
        {challenges.map((challenge, index) => {
          const levelProgress = getProgressForLevel(index)
          const isUnlocked = isLevelUnlocked(index)
          const isCompleted = levelProgress?.completed || false
          const isCurrent = currentLevel === index
          const tier = getLevelTier(index)

          return (
            <Button
              key={index}
              onClick={() => isUnlocked && onLevelChange(index)}
              disabled={!isUnlocked}
              variant={isCurrent ? "default" : "outline"}
              className={`relative h-20 p-3 flex flex-col items-center justify-center rounded-3xl shadow-lg transition-all transform hover:scale-105 ${
                isCurrent
                  ? `bg-gradient-to-r ${tier.color} text-white shadow-xl`
                  : isCompleted
                    ? `${tier.bgColor} ${tier.textColor} ${tier.borderColor} border-2`
                    : isUnlocked
                      ? isDark
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                        : "hover:bg-gray-50"
                      : "opacity-50 cursor-not-allowed"
              }`}
            >
              <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-gradient-to-r ${tier.color}`} />

              {!isUnlocked ? (
                <Lock className="w-5 h-5 text-gray-400" />
              ) : isCompleted ? (
                <div className="flex flex-col items-center">
                  <Check className="w-5 h-5 text-green-600 mb-1" />
                  <span className="text-xs font-bold">{index + 1}</span>
                </div>
              ) : (
                <span className="text-lg font-bold">{index + 1}</span>
              )}

              {isCompleted && levelProgress && (
                <div className="flex mt-1">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        levelProgress.score >= star * 33 ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </Button>
          )
        })}
      </div>
    </Card>
  )
}
