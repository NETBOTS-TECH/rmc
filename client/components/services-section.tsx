"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services`
 // Update if hosted elsewhere

interface Service {
  _id: string
  title: string
  shortDescription: string 
  image: string
  slug: string
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error("Failed to fetch services")
        const data: Service[] = await response.json()
        setServices(data.slice(2, 6)) // Only show 6 services
      } catch (err) {
        console.log("Error in Service :",err)
        setError("Error fetching services")
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) return <p className="text-center text-gray-600">Loading services...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 text-primary font-medium px-4 py-2 rounded-md mb-4">
            OUR SERVICES
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Concrete Solutions</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            We offer a wide range of concrete repair and foundation services for both residential and commercial
            properties throughout Colorado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service:any) => (
            <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden service-card">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                <p className="text-gray-600 mb-4">
  {service.description.length > 10000 ? service.description.substring(0, 60) + "..." : service.description}
</p>

                <Link
                  href={`/description?id=${service._id}`}
                  className="inline-flex items-center text-primary font-medium hover:underline transition-all duration-200 hover:translate-x-1"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="btn-hover transition-all duration-300 hover:shadow-lg">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
