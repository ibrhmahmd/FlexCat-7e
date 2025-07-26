"use client"

import { useState, useEffect } from "react"

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("catflex-dark-mode")
    if (saved) {
      setIsDark(JSON.parse(saved))
    }
  }, [])

  const toggleDark = () => {
    const newDark = !isDark
    setIsDark(newDark)
    localStorage.setItem("catflex-dark-mode", JSON.stringify(newDark))
  }

  return {
    isDark,
    toggleDark,
  }
}
