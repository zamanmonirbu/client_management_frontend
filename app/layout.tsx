import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import RootLayoutClient from "./RootLayoutClient"



export const metadata: Metadata = {
  title: "Admin-Dashboard",
  description: "Admin Dashboard for managing clients and settings",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}
