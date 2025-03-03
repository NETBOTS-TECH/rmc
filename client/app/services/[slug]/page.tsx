import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { servicesData } from "@/data/services-data"
import { ArrowLeft, Phone } from "lucide-react"

interface ServicePageProps {
  params: {
    slug: string
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  // Find the service by slug
  const service = [...servicesData.residential, ...servicesData.commercial].find(
    (service) => service.slug === params.slug,
  )

  // If service not found, return 404
  if (!service) {
    notFound()
  }

  // Get related services (3 random services excluding current one)
  const allServices = [...servicesData.residential, ...servicesData.commercial]
  const relatedServices = allServices
    .filter((s) => s.id !== service.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-primary transition-colors">
              Services
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{service.title}</span>
          </div>
        </div>

        {/* Service Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{service.title}</h1>
            <p className="text-lg text-gray-600 mb-8">{service.fullDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="btn-hover transition-all duration-300 hover:shadow-lg">
                <Link href="/estimate">Get Free Estimate</Link>
              </Button>
              <Button variant="outline" className="btn-hover transition-all duration-300 hover:shadow-lg">
                <Phone className="mr-2 h-5 w-5" />
                <span>720-555-1234</span>
              </Button>
            </div>
          </div>
          <div>
            <img
              src={service.image || "/placeholder.svg?height=400&width=600"}
              alt={service.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Service Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">How Our {service.title} Works</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    1
                  </span>
                  Assessment
                </h3>
                <p className="text-gray-600">
                  Our experts will thoroughly assess your concrete issues to determine the best approach for your
                  specific situation. We use advanced technology to identify underlying problems.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    2
                  </span>
                  Solution Design
                </h3>
                <p className="text-gray-600">
                  We'll create a customized solution based on your specific needs, taking into account factors like soil
                  conditions, drainage, and structural requirements.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    3
                  </span>
                  Implementation
                </h3>
                <p className="text-gray-600">
                  Our skilled technicians will implement the solution using industry-leading techniques and high-quality
                  materials to ensure lasting results.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    4
                  </span>
                  Quality Assurance
                </h3>
                <p className="text-gray-600">
                  We conduct thorough quality checks to ensure the work meets our high standards and your expectations.
                  Our services come with comprehensive warranties for your peace of mind.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>15+ years of experience in concrete repair</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Licensed and insured professionals</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>High-quality materials and techniques</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Comprehensive warranties</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Transparent pricing with no hidden fees</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild className="w-full btn-hover transition-all duration-300 hover:shadow-lg">
                  <Link href="/estimate">Request Free Estimate</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedServices.map((relatedService) => (
              <div key={relatedService.id} className="bg-white rounded-lg shadow-md overflow-hidden service-card">
                <img
                  src={relatedService.image || "/placeholder.svg?height=200&width=400"}
                  alt={relatedService.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{relatedService.title}</h3>
                  <p className="text-gray-600 mb-4">{relatedService.shortDescription}</p>
                  <Link
                    href={`/services/${relatedService.slug}`}
                    className="inline-flex items-center text-primary font-medium hover:underline transition-all duration-200 hover:translate-x-1"
                  >
                    Learn More <ArrowLeft className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Services */}
        <div className="mt-12 text-center">
          <Button variant="outline" asChild className="btn-hover transition-all duration-300">
            <Link href="/services" className="flex items-center">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to All Services
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

