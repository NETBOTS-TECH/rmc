import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import ChatBot from "@/components/chat-bot"

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">About Repair my Concrete</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Colorado's trusted concrete repair specialists with over 15 years of experience serving residential and
            commercial properties.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2008, Repair my Concrete began with a simple mission: to provide Colorado property owners with
              high-quality concrete repair services at fair prices. What started as a small family business has grown
              into one of the region's most trusted concrete repair companies.
            </p>
            <p className="text-gray-600 mb-4">
              Our founder, John Smith, recognized a need for specialized concrete repair services that focused on
              extending the life of existing concrete rather than simply replacing it. This approach not only saved
              customers money but was also more environmentally sustainable.
            </p>
            <p className="text-gray-600">
              Today, we continue to build on that foundation, combining traditional craftsmanship with modern techniques
              and materials to deliver exceptional results for every project we undertake.
            </p>
          </div>
          <div>
            <img
              src="https://cdn.homedit.com/wp-content/uploads/2017/05/Amazing-house-architecture-with-concrete-ceiling-deck.jpg"
              alt="Repair my Concrete team"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-gray-50 rounded-lg p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and help us deliver the highest quality service to our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on quality. From the materials we use to the techniques we employ, excellence is our
                standard.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We believe in honest communication, transparent pricing, and doing what we say we'll do, when we say
                we'll do it.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously seek out and implement the latest techniques and materials to provide better, more
                durable solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our experienced professionals are dedicated to delivering exceptional concrete repair services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "John Smith", title: "Founder & CEO", image: "https://tse2.mm.bing.net/th?id=OIP.BLFXBzfWeDCHY2Rk1S7LHgHaHa&pid=Api&P=0&h=220" },
              { name: "Sarah Johnson", title: "Operations Manager", image: "https://tse1.mm.bing.net/th?id=OIP.I_dzLmkTIT3klVsN3L_tNQHaEK&pid=Api&P=0&h=220" },
              { name: "Mike Williams", title: "Lead Technician", image: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/09/StrangerThings_Season-4_Finn-Wolfhard.jpg" },
              { name: "Lisa Brown", title: "Customer Service Manager", image: "https://i0.wp.com/www.fashionchingu.com/wp-content/uploads/2021/12/Lisa-Blackpink-Brown-Suit-Jacket-And-Trousers-Set-6.jpg" },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-5px]"
              >
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.CB6a0YuQYPYsDatqk7lydQHaE8&pid=Api&P=0&h=100%"
              alt="Concrete repair work"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Choose Us</h2>
            <div className="space-y-4">
              {[
                "15+ years of experience in concrete repair",
                "Licensed and insured professionals",
                "State-of-the-art equipment and techniques",
                "Comprehensive warranties on all work",
                "Free, detailed estimates",
                "Excellent customer service",
                "Locally owned and operated",
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-2 mt-0.5" />
                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button asChild className="btn-hover transition-all duration-300 hover:shadow-lg">
                <Link href="/estimate" className="flex items-center">
                  Get Free Estimate <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gray-50 rounded-lg p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Michael Johnson",
                location: "Denver, CO",
                text: "Repair my Concrete did an amazing job leveling my driveway. The team was professional, efficient, and the results exceeded my expectations. I highly recommend their services!",
              },
              {
                name: "Sarah Williams",
                location: "Boulder, CO",
                text: "We had severe foundation issues in our home, and Repair my Concrete provided excellent service from start to finish. They explained everything clearly and completed the work on time and within budget.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <svg
                    className="w-12 h-12 text-primary opacity-20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <div className="ml-4">
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Fix Your Concrete Problems?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today for a free estimate on your concrete repair or foundation project.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="btn-hover transition-all duration-300 hover:shadow-lg"
            >
              <Link href="/estimate">Get Free Estimate</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="btn-hover  transition-all duration-300 hover:shadow-lg"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  )
}

