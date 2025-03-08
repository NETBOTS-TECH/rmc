"use client";

import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import ChatBot from "@/components/chat-bot";
interface Service {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: "residential" | "commercial";
}

export default function ServicePage() {


    const searchParams = useSearchParams();
  const serviceId = searchParams.get("id");
  console.log(serviceId)
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId) return;

    const fetchService = async () => {
        try {
          setLoading(true);
          setError(null);
  
          const { data } = await axios.get(`${process.env.BASE_URL}/api/services/${serviceId}`);
          setService(data.service);
          setRelatedServices(data.relatedServices);
        } catch (err) {
          console.error("Error fetching service:", err);
          setError("Service not found");
          setService(null);
        } finally {
          setLoading(false);
        }
      };

    fetchService();
  }, [serviceId]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-40 h-40 border-8 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-600">Loading...</p>
    </div>
  );
  
  // 
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!service) return <p className="text-center text-red-500">Service not found</p>;

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
            <span className="text-primary">{service.name}</span>
          </div>
        </div>

        {/* Service Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{service.name}</h1>
            <p className="text-lg text-gray-600 mb-8">{service.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="btn-hover transition-all duration-300 hover:shadow-lg">
                <Link href="/estimate">Get Free Estimate</Link>
              </Button>
              <Button variant="outline" className="btn-hover transition-all duration-300 hover:shadow-lg">
              <a href="tel:720-555-1234" className="flex items-center text-sm hover:text-primary transition-colors">
              <Phone className="h-4 w-4 mr-1" />
              <span>720-555-1234</span>
            </a>
              </Button>
            </div>
          </div>
          <div>
            <img
              src={service.image || "/placeholder.svg?height=400&width=600"}
              alt={service.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Related Services */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedServices.map((relatedService) => (
              <div key={relatedService._id} className="bg-white rounded-lg shadow-md overflow-hidden service-card">
                <img
                  src={relatedService.image || "/placeholder.svg?height=200&width=400"}
                  alt={relatedService.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{relatedService.name}</h3>
                  <p className="text-gray-600 mb-4">{relatedService.description.substring(0, 100)}...</p>
                  <Link
                    href={`/description?id=${relatedService._id}`}
                    className="inline-flex items-center text-primary font-medium hover:underline transition-all duration-200 hover:translate-x-1"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
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
      <ChatBot />
    </div>
  );
}
