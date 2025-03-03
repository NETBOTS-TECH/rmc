import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Repair my Concrete | Colorado's Concrete Repair Specialists",
  description:
    "Professional concrete repair, leveling, and foundation services for residential and commercial properties throughout Colorado.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAdminPage =
    typeof window !== "undefined" &&
    (window.location.pathname.startsWith("/admin") || window.location.pathname === "/login")

  return (
    <html lang="en">
      <body className={inter.className}>
        {!isAdminPage && <Header />}
        {children}
        {!isAdminPage && <Footer />}
      </body>
    </html>
  )
}

