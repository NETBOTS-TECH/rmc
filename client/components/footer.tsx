import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-300">
                Stay updated with our latest services, promotions, and concrete repair tips.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
                <Button type="submit" className="btn-hover transition-all duration-300 hover:shadow-lg">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Repair my Concrete</h3>
            <p className="text-gray-300">
              Colorado's trusted concrete repair specialists serving residential and commercial properties with quality
              workmanship and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary transition-colors p-2 rounded-full"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary transition-colors p-2 rounded-full"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary transition-colors p-2 rounded-full"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Project Gallery
                </Link>
              </li>
              <li>
                <Link href="/estimate" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Request Estimate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Our Services</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link
                href="/services/concrete-repair"
                className="text-gray-300 hover:text-primary transition-colors flex items-center"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Concrete Repair
              </Link>
              <Link
                href="/services/concrete-leveling"
                className="text-gray-300 hover:text-primary transition-colors flex items-center"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Concrete Leveling
              </Link>
              <Link
                href="/services/foundation-repair"
                className="text-gray-300 hover:text-primary transition-colors flex items-center"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Foundation Repair
              </Link>
              <Link
                href="/services/basement-waterproofing"
                className="text-gray-300 hover:text-primary transition-colors flex items-center"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Waterproofing
              </Link>
              <Link
                href="/services/new-concrete-installation"
                className="text-gray-300 hover:text-primary transition-colors flex items-center"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                New Concrete
              </Link>
              <Link
                href="/services/commercial-concrete-leveling"
                className="text-gray-300 hover:text-primary transition-colors flex items-center"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Commercial Services
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <span className="text-gray-300">123 Main Street, Denver, CO 80202</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <a href="tel:720-555-1234" className="text-gray-300 hover:text-primary transition-colors">
                  720-555-1234
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <a
                  href="mailto:info@repairmyconcrete.com"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  info@repairmyconcrete.com
                </a>
              </li>
            </ul>
            <div>
              <Button asChild className="w-full btn-hover transition-all duration-300 hover:shadow-lg">
                <Link href="/estimate">Get Free Estimate</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Repair my Concrete. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-400 text-sm hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 text-sm hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 text-sm hover:text-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

