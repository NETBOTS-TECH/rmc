import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Fix Your Concrete Problems?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact us today for a free estimate on your concrete repair or foundation project. We serve all areas
            throughout Colorado.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="btn-hover transition-all duration-300 hover:shadow-lg">
              <Link href="/estimate">Get Free Estimate</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-dark hover:bg-white hover:text-gray-900 transition-all duration-300 hover:shadow-lg"
            >
             <Phone className="h-5 w-5 text-primary mr-3" />
                <a href="tel:720-555-1234" className="text-primary hover:text-primary transition-colors">
                  720-555-1234
                </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

