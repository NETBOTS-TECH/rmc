"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    image: "https://kentcompanies.nyc3.cdn.digitaloceanspaces.com/production/general/_1200x1534_crop_center-center_82_line/structure-bw.png",
    title: "Colorado's Premier Concrete Repair Specialists",
    description:
      "Professional concrete repair, leveling, and foundation services for residential and commercial properties throughout Colorado.",
  },
  {
    image: "https://rmc-five.vercel.app/_next/static/media/01.4b47e3e0.webp",
    title: "Expert Foundation Repair Services",
    description:
      "Trust our experienced team to diagnose and fix your foundation issues, ensuring the stability of your property.",
  },
  {
    image: "https://kingcrete.com/assets/images/home2-slider-banner-img-03.jpg",
    title: "Concrete Leveling Solutions",
    description: "Restore the safety and appearance of your concrete surfaces with our advanced leveling techniques.",
  },
]


export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative h-screen">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black opacity-60 z-10" aria-hidden="true"></div>
          <img
            src={slide.image || "/placeholder.svg"}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center max-w-4xl px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{slide.title}</h1>
              <p className="text-xl text-gray-200 mb-8">{slide.description}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild className="btn-hover transition-all duration-300 hover:shadow-lg">
                  <Link href="/estimate">Get Free Estimate</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900 transition-all duration-300 hover:shadow-lg"
                  asChild
                >
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-30"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-30"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  )
}

