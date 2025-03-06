import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AboutPreview() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-primary/10 text-primary font-medium px-4 py-2 rounded-md mb-4">
              TRUSTED CONCRETE EXPERTS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Solutions For Residential & Commercial Concrete Repair
            </h2>
            <p className="text-gray-600 mb-6">
              With over 15 years of experience, Repair my Concrete has been providing top-quality concrete repair and
              foundation services throughout Colorado. Our team of skilled professionals is dedicated to delivering
              exceptional results that stand the test of time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-md mr-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Licensed & Insured</h3>
                  <p className="text-gray-600 text-sm">Fully licensed and insured for your peace of mind</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-md mr-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Expert Team</h3>
                  <p className="text-gray-600 text-sm">Skilled professionals with years of experience</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-md mr-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Quality Materials</h3>
                  <p className="text-gray-600 text-sm">We use only the highest quality materials</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-md mr-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Satisfaction Guaranteed</h3>
                  <p className="text-gray-600 text-sm">We're not satisfied until you are</p>
                </div>
              </div>
            </div>
            <Button asChild>
              <Link href="/about" className="flex items-center">
                Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://rmc-five.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F01.f1fb0a99.webp&w=640&q=75"
                alt="Concrete repair work"
                className="rounded-lg w-full h-[300px] object-cover"
              />
              <img
                src="https://rmc-five.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F02.dab248fe.webp&w=640&h=300&q=75"
                alt="Foundation repair"
                className="rounded-lg w-full h-[300px] object-cover"
              />
            </div>
            <div className="mt-8">
              <img
                src="https://rmc-five.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F03.763c49c3.webp&w=640&q=75"
                alt="Concrete leveling"
                className="rounded-lg w-full h-[300px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

