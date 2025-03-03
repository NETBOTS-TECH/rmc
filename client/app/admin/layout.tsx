"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Users, MessageSquare, FileText, Settings, LogOut, Menu, X, Hammer, Image } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/login")
  }

  const navItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard", href: "/admin" },
    { icon: <Hammer className="h-5 w-5" />, label: "Services", href: "/admin/services" },
    { icon: <FileText className="h-5 w-5" />, label: "Estimates", href: "/admin/estimates" },
    { icon: <Users className="h-5 w-5" />, label: "Contacts", href: "/admin/inquiries" },
    { icon: <MessageSquare className="h-5 w-5" />, label: "Live Chat", href: "/admin/chat" },
    { icon: <Image className="h-5 w-5" />, label: "Gallery", href: "/admin/gallery" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings", href: "/admin/settings" },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r">
        <div className="flex items-center justify-center h-16 border-b">
          <Link href="/admin" className="font-bold text-xl text-primary">
            Admin Dashboard
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium mb-1 ${
                pathname === item.href ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Mobile header and sidebar */}
      <div className="lg:hidden">
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <Link href="/admin" className="font-bold text-xl text-primary">
            Admin Dashboard
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
            <div
              className="absolute top-0 left-0 w-64 h-full bg-white p-4 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <Link href="/admin" className="font-bold text-xl text-primary">
                  Admin Dashboard
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="space-y-1">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === item.href ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-4 left-4 right-4">
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-2" /> Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  )
}

