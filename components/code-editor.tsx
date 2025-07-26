"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { Check, Sparkles } from "lucide-react"

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  onCheck: () => boolean
  userName: string
}

export function CodeEditor({ code, onChange, onCheck, userName }: CodeEditorProps) {
  const [isValid, setIsValid] = useState(true)
  const [error, setError] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { t, language } = useLanguage()
  const { isDark } = useDarkMode()

  const validateCSS = (css: string) => {
    try {
      const lines = css.split("\n").filter((line) => line.trim())
      for (const line of lines) {
        if (line.trim() && !line.includes(":") && !line.includes("{") && !line.includes("}")) {
          throw new Error(`Invalid CSS syntax: ${line}`)
        }
      }
      setIsValid(true)
      setError("")
      return true
    } catch (err) {
      setIsValid(false)
      setError(err instanceof Error ? err.message : "Invalid CSS")
      return false
    }
  }

  const handleCodeChange = (newCode: string) => {
    onChange(newCode)
    validateCSS(newCode)
  }

  const formatCode = () => {
    const formatted = code
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line)
      .map((line) => {
        if (line.includes(":")) {
          return `  ${line}`
        }
        return line
      })
      .join("\n")

    onChange(formatted)
  }

  const handleCheck = () => {
    if (validateCSS(code)) {
      const isCorrect = onCheck()
      if (!isCorrect) {
        setError(
          language === "ar"
            ? `${userName}، العناصر ليست في المكان الصحيح بعد. جرب تعديل CSS!`
            : `${userName}, the elements aren't in the right position yet. Try adjusting your CSS!`,
        )
      }
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [code])

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gray-900 rounded-l-3xl flex flex-col text-xs text-gray-400 pt-4 z-10">
          {code.split("\n").map((_, index) => (
            <div key={index} className="h-6 flex items-center justify-center font-mono">
              {index + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          className={`w-full pl-20 pr-6 py-4 bg-gray-900 text-white font-mono text-sm rounded-3xl border-3 resize-none overflow-hidden shadow-inner ${
            isValid ? "border-gray-600" : "border-red-500"
          } ${language === "ar" ? "text-right" : ""}`}
          placeholder={
            language === "ar"
              ? `.flex-container {
  display: flex;
  /* أضف CSS هنا */
}`
              : `.flex-container {
  display: flex;
  /* Add your CSS here */
}`
          }
          rows={Math.max(8, code.split("\n").length)}
          dir={language === "ar" ? "rtl" : "ltr"}
        />
      </div>

      {error && (
        <Card
          className={`p-4 border-3 rounded-3xl shadow-lg ${
            isDark ? "bg-red-900 border-red-700 text-red-200" : "bg-red-50 border-red-200 text-red-600"
          }`}
        >
          <p className={`text-sm ${language === "ar" ? "font-arabic text-right" : ""}`}>{error}</p>
        </Card>
      )}

      <div className="flex gap-3">
        <Button
          onClick={handleCheck}
          disabled={!isValid}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          <Check className="w-4 h-4 mr-2" />
          {t("checkSolution")}
        </Button>
        <Button
          onClick={formatCode}
          variant="outline"
          size="sm"
          className="rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all bg-transparent"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {t("formatCode")}
        </Button>
      </div>

      <div
        className={`text-xs space-y-2 p-4 rounded-2xl ${
          isDark ? "bg-gray-700 text-gray-300" : "bg-blue-50 text-blue-700"
        } ${language === "ar" ? "font-arabic text-right" : ""}`}
      >
        <div>
          💡 <strong>{t("tip")}:</strong>{" "}
          {language === "ar"
            ? "استخدم خصائص مثل flex-direction, justify-content, و align-items"
            : "Use properties like flex-direction, justify-content, and align-items"}
        </div>
        <div>
          🎯 <strong>{t("goal")}:</strong>{" "}
          {language === "ar"
            ? `${userName}، ضع العناصر لتطابق التخطيط المطلوب`
            : `${userName}, position the elements to match the target layout`}
        </div>
      </div>
    </div>
  )
}
