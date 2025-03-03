"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Phone, Mail, Facebook, Instagram, Twitter, ThumbsUp } from "lucide-react"
import { menuData } from "@/data/menu-data"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Check if user has already liked the page
    const hasLiked = localStorage.getItem("liked") === "true"
    setLiked(hasLiked)

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLike = () => {
    setLiked(true)
    localStorage.setItem("liked", "true")
    toast({
      title: "Thank you!",
      description: "We appreciate your support!",
      duration: 3000,
    })
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <a href="tel:720-555-1234" className="flex items-center text-sm hover:text-primary transition-colors">
                <Phone className="h-4 w-4 mr-1" />
                <span>720-555-1234</span>
              </a>
              <a
                href="mailto:info@repairmyconcrete.com"
                className="flex items-center text-sm hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 mr-1" />
                <span>info@repairmyconcrete.com</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <button
                onClick={handleLike}
                className={`flex items-center text-sm hover:text-primary transition-colors ${liked ? "text-primary" : ""}`}
                disabled={liked}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{liked ? "Liked" : "Like Us"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Repair my Concrete</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {menuData.mainMenu.map((item) => (
                <div key={item.id} className="relative group">
                  {item.hasDropdown ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center text-gray-700 hover:text-primary font-medium transition-colors duration-200">
                          {item.label}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="horizontal-dropdown p-4">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <DropdownMenuItem key={dropdownItem.id} asChild>
                            <Link
                              href={dropdownItem.url}
                              className="w-full hover:bg-secondary hover:text-primary transition-colors duration-200 p-2 rounded"
                            >
                              {dropdownItem.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={item.url}
                      className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <Button asChild className="btn-hover transition-all duration-300 hover:shadow-lg">
                <Link href="/estimate">Get Free Estimate</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4 mb-4">
                <a
                  href="tel:720-555-1234"
                  className="flex items-center text-gray-700 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  <span>720-555-1234</span>
                </a>
                <a
                  href="mailto:info@repairmyconcrete.com"
                  className="flex items-center text-gray-700 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  <span>info@repairmyconcrete.com</span>
                </a>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-primary transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-primary transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-primary transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <nav className="flex flex-col space-y-4">
                {menuData.mainMenu.map((item) => (
                  <div key={item.id} className="relative">
                    {item.hasDropdown ? (
                      <div className="space-y-2">
                        <div className="font-medium text-gray-700">{item.label}</div>
                        <div className="pl-4 space-y-2 border-l-2 border-gray-200">
                          {item.dropdownItems?.slice(0, 6).map((dropdownItem) => (
                            <Link
                              key={dropdownItem.id}
                              href={dropdownItem.url}
                              className="block text-gray-600 hover:text-primary transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                          {item.dropdownItems && item.dropdownItems.length > 6 && (
                            <Link
                              href={item.url}
                              className="block text-primary font-medium hover:underline"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              View all {item.label}
                            </Link>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.url}
                        className="block font-medium text-gray-700 hover:text-primary transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-6">
                <Button asChild className="w-full btn-hover transition-all duration-300">
                  <Link href="/estimate" onClick={() => setIsMenuOpen(false)}>
                    Get Free Estimate
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

