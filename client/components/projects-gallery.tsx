import Link from "next/link"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: 1,
    title: "Driveway Leveling",
    category: "Residential",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Commercial Foundation Repair",
    category: "Commercial",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Basement Floor Repair",
    category: "Residential",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Sidewalk Replacement",
    category: "Municipal",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function ProjectsGallery() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 text-primary font-medium px-4 py-2 rounded-md mb-4">
            OUR PROJECTS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Concrete Repair Projects</h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Take a look at some of our recent concrete repair and foundation projects throughout Colorado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-lg service-card">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="text-primary font-medium mb-2">{project.category}</span>
                <h3 className="text-white text-xl font-bold">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="btn-hover transition-all duration-300 hover:shadow-lg">
            <Link href="/gallery">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

