"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/hooks/use-language"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { Cat, Rocket, Pizza, Bot } from "lucide-react"

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
  onNameSubmit: (name: string) => void
}

export function WelcomeModal({ isOpen, onClose, onNameSubmit }: WelcomeModalProps) {
  const [name, setName] = useState("")
  const { language, t } = useLanguage()
  const { isDark } = useDarkMode()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onNameSubmit(name.trim())
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-md ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-gradient-to-br from-purple-50 to-pink-50"
        } rounded-3xl border-2 ${language === "ar" ? "rtl" : "ltr"}`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-2xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent ${
              language === "ar" ? "font-arabic" : "font-comic"
            }`}
          >
            {t("welcome")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-4">
          <div className="flex justify-center space-x-4">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-2xl animate-bounce">
              <Cat className="w-8 h-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-3 rounded-2xl animate-bounce delay-100">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-3 rounded-2xl animate-bounce delay-200">
              <Pizza className="w-8 h-8 text-white" />
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-3 rounded-2xl animate-bounce delay-300">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>

          <div
            className={`text-center ${
              isDark ? "text-gray-200" : "text-gray-700"
            } ${language === "ar" ? "font-arabic" : ""}`}
          >
            {t("welcomeMessage")}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="name"
                className={`text-sm font-medium ${
                  isDark ? "text-gray-200" : "text-gray-700"
                } ${language === "ar" ? "font-arabic" : ""}`}
              >
                {t("enterName")}
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("namePlaceholder")}
                className={`mt-1 rounded-2xl border-2 ${
                  isDark ? "bg-gray-700 border-gray-600 text-white" : "border-purple-200"
                } focus:border-purple-500 ${language === "ar" ? "font-arabic text-right" : ""}`}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              disabled={!name.trim()}
            >
              {t("startLearning")}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
