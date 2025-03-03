import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Michael Johnson",
    location: "Denver, CO",
    rating: 5,
    text: "Repair my Concrete did an amazing job leveling my driveway. The team was professional, efficient, and the results exceeded my expectations. I highly recommend their services!",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Sarah Williams",
    location: "Boulder, CO",
    rating: 5,
    text: "We had severe foundation issues in our home, and Repair my Concrete provided excellent service from start to finish. They explained everything clearly and completed the work on time and within budget.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "David Thompson",
    location: "Colorado Springs, CO",
    rating: 5,
    text: "I'm extremely satisfied with the concrete repair work done on my garage floor. The team was knowledgeable, courteous, and the quality of work was outstanding. Will definitely use them again!",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
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
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

