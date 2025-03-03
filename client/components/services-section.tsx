import Link from "next/link"
import { servicesData } from "@/data/services-data"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ServicesSection() {
  // Display only the first 6 services
  const displayedServices = servicesData.residential.slice(0, 6)

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden service-card">
              <img
                src={service.image || "/placeholder.svg?height=200&width=400"}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                <Link
                  href={`/services/${service.slug}`}
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

