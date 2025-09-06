import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/layout/header"
import { OfflineBanner } from "@/components/offline/offline-banner"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "SimbaID - Voice-Powered Decentralized Identity",
  description:
    "Secure, voice-biometric decentralized identity system for African users. Create your DID, manage credentials, and access financial services.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <OfflineBanner />
          <main>{children}</main>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
