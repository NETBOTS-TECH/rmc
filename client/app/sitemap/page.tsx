import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Sitemap() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Sitemap</h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Easily navigate through our website using the links below.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Main Pages</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 flex items-center hover:text-primary">
                  <ArrowRight className="h-4 w-4 mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 flex items-center hover:text-primary">
                  <ArrowRight className="h-4 w-4 mr-2" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 flex items-center hover:text-primary">
                  <ArrowRight className="h-4 w-4 mr-2" /> Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-600 flex items-center hover:text-primary">
                  <ArrowRight className="h-4 w-4 mr-2" /> Project Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Other Links</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/estimate" className="text-gray-600 flex items-center hover:text-primary">
                  <ArrowRight className="h-4 w-4 mr-2" /> Request Estimate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 flex items-center hover:text-primary">
                  <ArrowRight className="h-4 w-4 mr-2" /> Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-600 flex items-center hover:text-primary">
                  <ArrowRight className="h-4 w-4 mr-2" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-600 flex items-center hover:text-primary">
                  <ArrowRight className="h-4 w-4 mr-2" /> Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
