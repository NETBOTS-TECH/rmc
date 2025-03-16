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
        const res = await fetch(`${process.env.BASE_URL}/api/testimonials`);
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-100 relative">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 text-primary font-medium px-4 py-2 rounded-md mb-4">
            TESTIMONIALS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Don't just take our word for it. Here's what our satisfied customers have to say about our concrete repair
            services.
          </p>
        </div>

        {/* Navigation Arrows (Outside of Swiper) */}
        <div className="relative">
          <button className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-200 transition swiper-prev">
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-200 transition swiper-next">
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Swiper Slider */}
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
            pagination={{ clickable: true }}
            autoplay={{ disableOnInteraction: false }}
            className="!pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image ? `${process.env.BASE_URL}/${testimonial.image}` : "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600">{testimonial.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
