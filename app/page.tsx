"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CodeEditor } from "@/components/code-editor"
import { FlexContainer } from "@/components/flex-container"
import { HintSystem } from "@/components/hint-system"
import { LevelSelector } from "@/components/level-selector"
import { ProgressTracker } from "@/components/progress-tracker"
import { WelcomeModal } from "@/components/welcome-modal"
import { CongratulationsModal } from "@/components/congratulations-modal"
import { ThemeSelector } from "@/components/theme-selector"
import { LanguageToggle } from "@/components/language-toggle"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { challenges } from "@/lib/challenges"
import { useProgress } from "@/hooks/use-progress"
import { useTheme } from "@/hooks/use-theme"
import { useLanguage } from "@/hooks/use-language"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { Trophy, Star, Lightbulb } from "lucide-react"

export default function CatFlexApp() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [code, setCode] = useState("")
  const [showHints, setShowHints] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showCongratulations, setShowCongratulations] = useState(false)
  const [userName, setUserName] = useState("")
  const [completedTier, setCompletedTier] = useState<string | null>(null)

  const { progress, updateProgress, getScore } = useProgress()
  const { currentTheme, setTheme, themes } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const { isDark, toggleDark } = useDarkMode()

  const challenge = challenges[currentLevel]
  const score = getScore(currentLevel, attempts, hintsUsed)

  // Check for stored name on mount
  useEffect(() => {
    const storedName = localStorage.getItem("catflex-username")
    if (storedName) {
      setUserName(storedName)
    } else {
      setShowWelcome(true)
    }
  }, [])

  useEffect(() => {
    setCode(challenge.startingCode || "")
    setHintsUsed(0)
    setAttempts(0)
    setShowHints(false)
  }, [currentLevel, challenge])

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    setAttempts((prev) => prev + 1)
  }

  const checkSolution = () => {
    const isCorrect = challenge.checkSolution(code)
    if (isCorrect) {
      setShowCelebration(true)
      updateProgress(currentLevel, score, attempts, hintsUsed)

      // Check if tier completed
      const tierCompleted = checkTierCompletion(currentLevel)
      if (tierCompleted) {
        setCompletedTier(tierCompleted)
        setTimeout(() => {
          setShowCongratulations(true)
        }, 1500)
      }

      setTimeout(() => {
        setShowCelebration(false)
        if (currentLevel < challenges.length - 1) {
          setCurrentLevel((prev) => prev + 1)
        }
      }, 2000)
    }
    return isCorrect
  }

  const checkTierCompletion = (level: number) => {
    if (level === 3) return "beginner" // Completed levels 0-3
    if (level === 6) return "intermediate" // Completed levels 4-6
    if (level === 8) return "advanced" // Completed levels 7-8
    return null
  }

  const handleHint = () => {
    setShowHints(true)
    setHintsUsed((prev) => prev + 1)
  }

  const resetCode = () => {
    setCode(challenge.startingCode || "")
    setAttempts(0)
    setHintsUsed(0)
  }

  const completedChallenges = progress.filter((p) => p.completed).length
  const overallProgress = (completedChallenges / challenges.length) * 100

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100"
      } p-4 ${language === "ar" ? "rtl" : "ltr"}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                <currentTheme.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1
                  className={`text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent ${
                    language === "ar" ? "font-arabic" : "font-comic"
                  }`}
                >
                  {t("title")}
                </h1>
                <p
                  className={`${isDark ? "text-gray-300" : "text-gray-600"} ${language === "ar" ? "font-arabic" : ""}`}
                >
                  {t("subtitle", { name: userName })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeSelector currentTheme={currentTheme} onThemeChange={setTheme} themes={themes} />
              <LanguageToggle language={language} onToggle={toggleLanguage} />
              <DarkModeToggle isDark={isDark} onToggle={toggleDark} />

              <div className="text-right">
                <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{t("overallProgress")}</div>
                <div className="flex items-center gap-2">
                  <Progress value={overallProgress} className="w-32" />
                  <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
                </div>
              </div>
              <Badge variant="secondary" className="bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg">
                <Trophy className="w-4 h-4 mr-1" />
                {completedChallenges}/{challenges.length}
              </Badge>
            </div>
          </div>

          <LevelSelector
            currentLevel={currentLevel}
            onLevelChange={setCurrentLevel}
            progress={progress}
            userName={userName}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Code Editor - 40% */}
          <div className="lg:col-span-2">
            <Card
              className={`h-full shadow-xl border-2 ${
                isDark ? "bg-gray-800 border-gray-700" : "bg-white border-purple-200"
              } rounded-3xl overflow-hidden`}
            >
              <div
                className={`p-6 border-b-2 ${
                  isDark
                    ? "border-gray-700 bg-gray-750"
                    : "border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2
                    className={`text-xl font-bold ${
                      isDark ? "text-white" : "text-gray-800"
                    } ${language === "ar" ? "font-arabic" : "font-comic"}`}
                  >
                    {t("codeEditor")}
                  </h2>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-md"
                    >
                      {t("score")}: {score}
                    </Badge>
                    <div className="flex">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${score >= star * 33 ? "text-yellow-400 fill-current" : "text-gray-300"} drop-shadow-sm`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className={`text-sm mb-4 p-3 rounded-2xl ${
                    isDark ? "bg-gray-700 text-gray-200" : "bg-white text-gray-700"
                  } shadow-inner ${language === "ar" ? "font-arabic" : ""}`}
                >
                  {t("instructions", { name: userName, instruction: challenge.instructions })}
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleHint}
                    variant="outline"
                    size="sm"
                    disabled={hintsUsed >= 3}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    {t("hint")} ({3 - hintsUsed} {t("left")})
                  </Button>
                  <Button
                    onClick={resetCode}
                    variant="outline"
                    size="sm"
                    className="rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all bg-transparent"
                  >
                    {t("reset")}
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <CodeEditor code={code} onChange={handleCodeChange} onCheck={checkSolution} userName={userName} />
              </div>
            </Card>
          </div>

          {/* Visual Area - 60% */}
          <div className="lg:col-span-3">
            <Card
              className={`h-full shadow-xl border-2 ${
                isDark ? "bg-gray-800 border-gray-700" : "bg-white border-purple-200"
              } rounded-3xl overflow-hidden`}
            >
              <div
                className={`p-6 border-b-2 ${
                  isDark
                    ? "border-gray-700 bg-gray-750"
                    : "border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50"
                }`}
              >
                <h2
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-gray-800"
                  } ${language === "ar" ? "font-arabic" : "font-comic"}`}
                >
                  {t("challenge")} {currentLevel + 1}: {challenge.title}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <Badge
                    variant={
                      challenge.difficulty === "Beginner"
                        ? "default"
                        : challenge.difficulty === "Intermediate"
                          ? "secondary"
                          : "destructive"
                    }
                    className="rounded-full shadow-md"
                  >
                    {t(challenge.difficulty.toLowerCase())}
                  </Badge>
                  <span
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    } ${language === "ar" ? "font-arabic" : ""}`}
                  >
                    {t("attempts")}: {attempts} | {t("hints")}: {hintsUsed}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1">
                <FlexContainer
                  css={code}
                  targetPositions={challenge.targetPositions}
                  showCelebration={showCelebration}
                  theme={currentTheme}
                  userName={userName}
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Hints Panel */}
        {showHints && (
          <HintSystem
            challenge={challenge}
            hintsUsed={hintsUsed}
            onClose={() => setShowHints(false)}
            userName={userName}
          />
        )}

        {/* Progress Tracker */}
        <ProgressTracker progress={progress} userName={userName} />
      </div>

      {/* Modals */}
      <WelcomeModal
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
        onNameSubmit={(name) => {
          setUserName(name)
          localStorage.setItem("catflex-username", name)
          setShowWelcome(false)
        }}
      />

      <CongratulationsModal
        isOpen={showCongratulations}
        onClose={() => setShowCongratulations(false)}
        userName={userName}
        tier={completedTier || ""}
        theme={currentTheme}
      />
    </div>
  )
}
