"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "https://rmc-five.vercel.app/_next/static/media/01.4b47e3e0.webp",
    title: "Expert Foundation Repair Services",
    description:
      "Trust our experienced team to diagnose and fix your foundation issues, ensuring the stability of your property.",
  },
];

const serviceOrder = [
  "Concrete Leveling",
  "New Concrete",
  "Egress Window",
  "Foundation Repair",
  "Basement Waterproofing",
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services`);
      const data = await response.json();

      // Filter and sort services by predefined order
      const filteredServices:any = serviceOrder
        .map((name) => data.find((service:any) => service.name === name))
        .filter(Boolean); // Remove undefined entries

      setServices(filteredServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-[90vh]">
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
          <div className="absolute mx-[10%] inset-0 flex items-center justify-left z-20">
            <div className="text-left max-w-4xl px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {slide.title}
              </h1>
              <p className="text-xl text-gray-200 mb-8">{slide.description}</p>
              <ul className="gap-4 mb-6">
                {services.map((service:any) => (
                  <li key={service._id}>
                    <Link href={`/description?id=${service._id}`}>
                      <span className="text-lg text-white underline cursor-pointer hover:text-gray-300">
                        {service.name}
                      </span>
                    </Link>
                  </li>
                ))}
                {services.length > 0 && (
                  <li>
                    <Link href="/services">
                      <span className="text-lg text-white underline cursor-pointer hover:text-gray-300">
                        Others
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
              <div className="flex flex-col sm:flex-row justify-left gap-4">
                <Button size="lg" asChild className="btn-hover transition-all duration-300 hover:shadow-lg">
                  <Link href="/estimate">Get Free Estimate</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
