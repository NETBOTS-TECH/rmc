"use client";

import { useRouter } from "next/navigation"; // Next.js router
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Driveway Leveling",
    category: "Concrete Leveling",
    image: "https://www.usginc.net/wp-content/uploads/2023/08/USG-Driveway-Leveling--1024x536.png",
  },
  {
    id: 2,
    title: "Commercial Foundation Repair",
    category: "Foundation Repair",
    image: "https://tse3.mm.bing.net/th?id=OIP.8n9wkgl3Szf2dW6qYeaCLgHaE1&pid=Api&P=0&h=220",
  },
  {
    id: 3,
    title: "New Concrete",
    category: "New Concrete",
    image: "https://americandry.com/wp-content/uploads/2019/08/news-adbs-fixing-concrete-floor.jpg",
  },
  {
    id: 4,
    title: "Others",
    category: "All Gallery", // "Others" now selects all images
    image: "https://tse3.mm.bing.net/th?id=OIP.eNZ1irS6NXK9Fopp8ndIVQHaFj&pid=Api&P=0&h=220",
  },
];

export default function ProjectsGallery() {
  const router = useRouter();

  // Handle category selection
  const handleCategoryClick = (category: string) => {
 
    localStorage.setItem("selectedCategory", category); // Save selected category
    router.push("/gallery"); // Navigate to Gallery Page
  };

  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block bg-primary/10 text-primary font-medium px-4 py-2 rounded-md mb-3">
            OUR PROJECTS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Recent Concrete Repair Projects</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Take a look at some of our recent concrete repair and foundation projects throughout Colorado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-lg service-card cursor-pointer"
              onClick={() => handleCategoryClick(project.category)} // Set category and navigate
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                height={300}
                width={500}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-5">
                <span className="text-primary font-medium mb-2">{project.category}</span>
                <h3 className="text-white text-lg font-bold">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
