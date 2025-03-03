import Link from "next/link"
import { Button } from "@/components/ui/button"
import { servicesData } from "@/data/services-data"

export default function ServicesPage() {
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
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Residential Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.residential.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden service-card">
                <img
                  src={service.image || "/placeholder.svg?height=200&width=400"}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                  <Button asChild>
                    <Link href={`/services/${service.slug}`}>Learn More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commercial Services */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Commercial Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.commercial.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden service-card">
                <img
                  src={service.image || "/placeholder.svg?height=200&width=400"}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                  <Button asChild>
                    <Link href={`/services/${service.slug}`}>Learn More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

