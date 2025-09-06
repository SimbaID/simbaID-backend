"use client"

import { useState } from "react"
import { ArrowLeft, Mic, MicOff, Play, RotateCcw, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { VoiceWaveform } from "@/components/voice/voice-waveform"
import { LanguageSelector } from "@/components/voice/language-selector"
import { useVoiceRecording } from "@/hooks/use-voice-recording"

const enrollmentSteps = [
  {
    id: 1,
    title: "Say your full name",
    instruction: "Please say your full name clearly",
    phrases: {
      en: "My name is [Your Name]",
      sw: "Jina langu ni [Jina Lako]",
      yo: "Oruko mi ni [Oruko Re]",
    },
  },
  {
    id: 2,
    title: "Repeat the phrase",
    instruction: "Repeat this phrase exactly as shown",
    phrases: {
      en: "I am creating my digital identity",
      sw: "Ninaunda utambulisho wangu wa kidijitali",
      yo: "Mo n ṣẹda idanimọ dijitali mi",
    },
  },
  {
    id: 3,
    title: "Count from 1 to 10",
    instruction: "Count slowly and clearly",
    phrases: {
      en: "One, two, three, four, five, six, seven, eight, nine, ten",
      sw: "Moja, mbili, tatu, nne, tano, sita, saba, nane, tisa, kumi",
      yo: "Ọkan, meji, mẹta, mẹrin, marun, mẹfa, meje, mẹjọ, mẹsan, mẹwa",
    },
  },
]

export default function VoiceEnrollmentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isEnrollmentComplete, setIsEnrollmentComplete] = useState(false)

  const {
    isRecording,
    audioLevel,
    recordingDuration,
    hasRecording,
    startRecording,
    stopRecording,
    playRecording,
    resetRecording,
    isPlaying,
  } = useVoiceRecording()

  const handleNextStep = () => {
    if (hasRecording && !completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }

    if (currentStep < enrollmentSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      resetRecording()
    } else {
      // All steps completed
      setIsEnrollmentComplete(true)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      resetRecording()
    }
  }

  const progress = ((completedSteps.length + (hasRecording ? 1 : 0)) / enrollmentSteps.length) * 100

  if (isEnrollmentComplete) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="mb-4 text-2xl font-bold text-foreground">Voice Enrollment Complete!</h1>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Your voice biometric profile has been successfully created. You can now use your voice to access your
                digital identity.
              </p>
              <Button size="lg" className="w-full">
                Continue to Wallet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentStepData = enrollmentSteps[currentStep]

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={handlePreviousStep} disabled={currentStep === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Badge variant="secondary">
            Step {currentStep + 1} of {enrollmentSteps.length}
          </Badge>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Language Selector */}
        <div className="mb-8">
          <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">{currentStepData.title}</CardTitle>
            <p className="text-center text-muted-foreground">{currentStepData.instruction}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Phrase to Read */}
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-lg font-medium text-foreground">
                "{currentStepData.phrases[selectedLanguage as keyof typeof currentStepData.phrases]}"
              </p>
            </div>

            {/* Voice Waveform */}
            <div className="flex justify-center">
              <VoiceWaveform isRecording={isRecording} audioLevel={audioLevel} duration={recordingDuration} />
            </div>

            {/* Recording Controls */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-center gap-4">
                {!isRecording && !hasRecording && (
                  <Button size="lg" onClick={startRecording} className="h-16 w-16 rounded-full p-0">
                    <Mic className="h-6 w-6" />
                  </Button>
                )}

                {isRecording && (
                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={stopRecording}
                    className="h-16 w-16 rounded-full p-0"
                  >
                    <MicOff className="h-6 w-6" />
                  </Button>
                )}

                {hasRecording && !isRecording && (
                  <div className="flex gap-2">
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={playRecording}
                      disabled={isPlaying}
                      className="h-16 w-16 rounded-full p-0 bg-transparent"
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={resetRecording}
                      className="h-16 w-16 rounded-full p-0 bg-transparent"
                    >
                      <RotateCcw className="h-6 w-6" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Status Text */}
              <div className="text-center">
                {!isRecording && !hasRecording && (
                  <p className="text-muted-foreground">Tap the microphone to start recording</p>
                )}
                {isRecording && <p className="text-primary font-medium">Recording... Speak clearly</p>}
                {hasRecording && !isRecording && (
                  <p className="text-muted-foreground">Recording complete. Play to review or record again</p>
                )}
              </div>
            </div>

            {/* Next Button */}
            <Button size="lg" onClick={handleNextStep} disabled={!hasRecording} className="w-full">
              {currentStep === enrollmentSteps.length - 1 ? "Complete Enrollment" : "Next Step"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
