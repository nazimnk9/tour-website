import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import StoreProvider from "@/components/StoreProvider"
import { LanguageProvider } from "@/components/LanguageProvider"
import GoogleTranslate from "@/components/GoogleTranslate"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "City Rome Tickets - Book Tours & Experiences",
  description: "Discover and book things to do worldwide",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          <StoreProvider>
            <GoogleTranslate />
            {children}
          </StoreProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
