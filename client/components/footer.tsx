import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, Dot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faYoutube, faYelp } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
export default function Footer() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch(`${process.env.BASE_URL}/api/services`); // Replace with actual API URL
        const data = await response.json();
        setServices(data); // Assuming API returns an array of services
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }

    fetchServices();
  }, []);
  return (
    <footer className="bg-gray-900 text-white">
    
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-8 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
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
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary transition-colors p-2 rounded-full"
              >
                 <FontAwesomeIcon icon={faLinkedin} size="1x" className="text-light" />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary transition-colors p-2 rounded-full"
              >
                 <FontAwesomeIcon icon={faYoutube} size="1x" className="text-light" />
              </a>
              <a
                href="https://www.yelp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary transition-colors p-2 rounded-full"
              >
                 <FontAwesomeIcon icon={faYelp} size="1x" className="text-light" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-0">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <Dot className="h-8 w-8 mr-1" />
                  Home
                </Link>
              </li>

              <li>
                <Link href="/services" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                <Dot className="h-8 w-8 mr-1" />
                  Services
                </Link>
              </li>
            
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                <Dot className="h-8 w-8 mr-1" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                <Dot className="h-8 w-8 mr-1" />
                  Blog
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
  <h3 className="text-xl font-bold">Our Services</h3>
  <div className="grid grid-cols-1 gap-0">
    {["Concrete Leveling", "New Concrete", "Egress Window", "Foundation Repair", "Basement Waterproofing"].map(
      (serviceName) => {
        const service:any = services.find((s: any) => s.name === serviceName);
        return service ? (
          <Link
            key={service._id}
            href={`/description?id=${service._id}`}
            className="text-gray-300 hover:text-primary transition-colors flex items-center truncate max-w-[200px]"
          >
            <Dot className="h-6 w-6 mr-1 text-primary" />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              {service.name}
            </span>
          </Link>
        ) : null;
      }
    )}
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
        <div className="border-t border-gray-800 mt-1 pt-8">
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

