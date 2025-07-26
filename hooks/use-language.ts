"use client"

import { useState, useEffect } from "react"

const translations = {
  en: {
    title: "CatFlex",
    subtitle: "Learn CSS Flexbox with fun, {name}!",
    welcome: "Welcome to CatFlex!",
    welcomeMessage: "Let's learn CSS Flexbox together with fun characters and exciting challenges!",
    enterName: "What's your name?",
    namePlaceholder: "Enter your name...",
    startLearning: "Start Learning!",
    overallProgress: "Overall Progress",
    codeEditor: "CSS Editor",
    score: "Score",
    instructions: "Hey {name}! {instruction}",
    hint: "Hint",
    left: "left",
    reset: "Reset",
    challenge: "Challenge",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    attempts: "Attempts",
    hints: "Hints",
    selectTheme: "Select Theme",
    cats: "Cats",
    space: "Space",
    food: "Food",
    robots: "Robots",
    tierComplete: "Amazing work {name}! You've completed the {tier} level!",
    continue: "Continue Learning",
  },
  ar: {
    title: "كات فليكس",
    subtitle: "تعلم CSS Flexbox بمتعة، {name}!",
    welcome: "مرحباً بك في كات فليكس!",
    welcomeMessage: "هيا نتعلم CSS Flexbox معاً بشخصيات ممتعة وتحديات مثيرة!",
    enterName: "ما اسمك؟",
    namePlaceholder: "أدخل اسمك...",
    startLearning: "ابدأ التعلم!",
    overallProgress: "التقدم العام",
    codeEditor: "محرر CSS",
    score: "النقاط",
    instructions: "مرحباً {name}! {instruction}",
    hint: "تلميح",
    left: "متبقي",
    reset: "إعادة تعيين",
    challenge: "التحدي",
    beginner: "مبتدئ",
    intermediate: "متوسط",
    advanced: "متقدم",
    attempts: "المحاولات",
    hints: "التلميحات",
    selectTheme: "اختر الموضوع",
    cats: "قطط",
    space: "فضاء",
    food: "طعام",
    robots: "روبوتات",
    tierComplete: "عاش {name}! لقد أكملت مستوى {tier}!",
    continue: "واصل التعلم",
  },
}

export function useLanguage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")

  useEffect(() => {
    const saved = localStorage.getItem("catflex-language") as "en" | "ar"
    if (saved && (saved === "en" || saved === "ar")) {
      setLanguage(saved)
    }
  }, [])

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en"
    setLanguage(newLang)
    localStorage.setItem("catflex-language", newLang)
  }

  const t = (key: string, params?: Record<string, string>) => {
    let text = translations[language][key as keyof (typeof translations)["en"]] || key

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, value)
      })
    }

    return text
  }

  return {
    language,
    toggleLanguage,
    t,
  }
}
