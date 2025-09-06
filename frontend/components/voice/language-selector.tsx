"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface LanguageSelectorProps {
  selectedLanguage: string
  onLanguageChange: (language: string) => void
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "sw", name: "Kiswahili", flag: "🇹🇿" },
  { code: "yo", name: "Yorùbá", flag: "🇳🇬" },
]

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-3 text-sm font-medium text-foreground">Select your preferred language:</div>
        <div className="flex gap-2">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant={selectedLanguage === language.code ? "default" : "outline"}
              size="sm"
              onClick={() => onLanguageChange(language.code)}
              className="flex-1"
            >
              <span className="mr-2">{language.flag}</span>
              {language.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
