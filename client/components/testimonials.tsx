"use client";

import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  rating: number;
  description: string;
  image: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/testimonials`);
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-12 md:py-20 bg-gray-100 relative">
      <div className="container mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-block bg-primary/10 text-primary font-medium px-4 py-2 rounded-md mb-3 md:mb-4">
            TESTIMONIALS
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-5">
            What Our Clients Say
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
            Don't just take our word for it. Here's what our satisfied customers say about our concrete repair services.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-200 transition swiper-prev hidden md:flex">
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-200 transition swiper-next hidden md:flex">
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="!pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                <div className="bg-white rounded-lg shadow-md p-5 md:p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${testimonial.image}` : "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover mr-3 md:mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-sm md:text-base">{testimonial.name}</h3>
                      <p className="text-gray-600 text-xs md:text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-3 md:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">{testimonial.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
