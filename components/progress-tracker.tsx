"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/hooks/use-language"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { Trophy, Star, Target, Zap } from "lucide-react"
import type { ProgressEntry } from "@/hooks/use-progress"

interface ProgressTrackerProps {
  progress: ProgressEntry[]
  userName: string
}

export function ProgressTracker({ progress, userName }: ProgressTrackerProps) {
  const { t, language } = useLanguage()
  const { isDark } = useDarkMode()

  const completedChallenges = progress.filter((p) => p.completed)
  const totalScore = completedChallenges.reduce((sum, p) => sum + p.score, 0)
  const averageScore = completedChallenges.length > 0 ? totalScore / completedChallenges.length : 0
  const perfectScores = completedChallenges.filter((p) => p.score === 100).length

  const achievements = [
    {
      name: language === "ar" ? "الخطوات الأولى" : "First Steps",
      description: language === "ar" ? "أكمل أول تحدي" : "Complete your first challenge",
      unlocked: completedChallenges.length >= 1,
      icon: Target,
      gradient: "from-green-400 to-emerald-600",
    },
    {
      name: language === "ar" ? "سيد الفليكس" : "Flex Master",
      description: language === "ar" ? "أكمل 5 تحديات" : "Complete 5 challenges",
      unlocked: completedChallenges.length >= 5,
      icon: Trophy,
      gradient: "from-blue-400 to-cyan-600",
    },
    {
      name: language === "ar" ? "النقاط المثالية" : "Perfect Score",
      description: language === "ar" ? "احصل على 100 نقطة في تحدي" : "Get 100 points on a challenge",
      unlocked: perfectScores >= 1,
      icon: Star,
      gradient: "from-yellow-400 to-orange-600",
    },
    {
      name: language === "ar" ? "عداء السرعة" : "Speed Runner",
      description: language === "ar" ? "أكمل تحدي بدون تلميحات" : "Complete a challenge with no hints",
      unlocked: completedChallenges.some((p) => p.hintsUsed === 0),
      icon: Zap,
      gradient: "from-purple-400 to-pink-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Overall Stats */}
      <Card
        className={`p-6 rounded-3xl shadow-xl border-2 ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-purple-200"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-2xl shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h3
            className={`font-bold ${
              isDark ? "text-white" : "text-gray-800"
            } ${language === "ar" ? "font-arabic" : "font-comic"}`}
          >
            {language === "ar" ? `إحصائيات ${userName}` : `${userName}'s Stats`}
          </h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className={isDark ? "text-gray-300" : "text-gray-600"}>{t("completed")}</span>
            <span className="font-medium">{completedChallenges.length}/9</span>
          </div>
          <Progress value={(completedChallenges.length / 9) * 100} className="h-3 rounded-full" />
          <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {language === "ar" ? "متوسط النقاط" : "Average Score"}: {Math.round(averageScore)}
          </div>
        </div>
      </Card>

      {/* Achievements */}
      {achievements.map((achievement, index) => (
        <Card
          key={index}
          className={`p-6 rounded-3xl shadow-xl border-2 transition-all transform hover:scale-105 ${
            achievement.unlocked
              ? `bg-gradient-to-br ${achievement.gradient.replace("from-", "from-").replace("to-", "to-")}/10 border-2`
              : isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`p-3 rounded-2xl shadow-lg ${
                achievement.unlocked ? `bg-gradient-to-r ${achievement.gradient}` : "bg-gray-400"
              }`}
            >
              <achievement.icon className="w-6 h-6 text-white" />
            </div>
            <h3
              className={`font-bold ${
                achievement.unlocked ? (isDark ? "text-white" : "text-gray-800") : "text-gray-500"
              } ${language === "ar" ? "font-arabic" : "font-comic"}`}
            >
              {achievement.name}
            </h3>
          </div>
          <p
            className={`text-sm mb-3 ${
              achievement.unlocked ? (isDark ? "text-gray-200" : "text-gray-700") : "text-gray-500"
            } ${language === "ar" ? "font-arabic" : ""}`}
          >
            {achievement.description}
          </p>
          {achievement.unlocked && (
            <Badge className={`bg-gradient-to-r ${achievement.gradient} text-white shadow-lg rounded-full`}>
              {language === "ar" ? "مفتوح!" : "Unlocked!"}
            </Badge>
          )}
        </Card>
      ))}
    </div>
  )
}
