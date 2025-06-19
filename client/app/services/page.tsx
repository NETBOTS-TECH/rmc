"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ChatBot from "@/components/chat-bot"

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services` // Change this if hosted elsewhere

interface Service {
  _id: string
  title: string
  shortDescription: string
  image: string
  slug: string
  category: "residential" | "commercial"
}

export default function ServicesPage() {
  const [residentialServices, setResidentialServices] = useState<Service[]>([])
  const [commercialServices, setCommercialServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error("Failed to fetch services")
        const data: Service[] = await response.json()

        // Filter services based on category
        setResidentialServices(data.filter((service) => service.category === "residential"))
        setCommercialServices(data.filter((service) => service.category === "commercial"))
      } catch (err) {
        setError("Error fetching services")
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-16 h-16 border-8 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-600">Loading Services...</p>
    </div>
  );
  
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive concrete repair and foundation services for residential and commercial properties.
          </p>
        </div>

        {/* Residential Services */}
        {residentialServices.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Residential Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {residentialServices.map((service:any) => (
                <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden service-card">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                    <p className="text-gray-600 mb-4">
  {service.description.length > 60000 ? service.description.substring(0, 60) + "..." : service.description}
</p>

                    <Button asChild>
                      <Link href={`/description?id=${service._id}`}>Learn More</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commercial Services */}
        {commercialServices.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Commercial Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {commercialServices.map((service:any) => (
                <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden service-card">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                    <p className="text-gray-600 mb-4">
  {service.description}
</p>

                    <Button asChild>
                      <Link href={`/description?id=${service._id}`}>Learn More</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <ChatBot />
    </div>
  )
}
