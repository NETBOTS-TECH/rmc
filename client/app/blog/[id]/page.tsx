"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, ArrowLeft, Facebook, Twitter, Share2 } from "lucide-react"
import ChatBot from "@/components/chat-bot"

interface Section {
  heading: string
  paragraph: string
  image?: string
}

interface Blog {
  _id: string
  title: string
  sections: Section[]
}

export default function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/api/blogs/${id}`)
        const data = await response.json()

        if (data.success) {
          setBlog(data.blog)
        } else {
          console.error("Error: ", data.message)
        }
      } catch (error) {
        console.error("Error fetching blog:", error)
      }
    }
    if (id) fetchBlog()
  }, [id])

  if (!blog) return <p className="text-center py-16 text-gray-500 text-lg">Loading...</p>

  return (
    <div className="container mx-auto py-12 px-6 max-w-3xl">
      {/* Blog Header */}
      <header className="mb-10 pb-8 border-b border-gray-200">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
          {blog.title}
        </h1>
        <div className="flex items-center mt-4 text-gray-500 text-sm">
          <Clock className="h-5 w-5 mr-2" />
          <span>{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
        </div>
      </header>

      {/* Blog Content */}
      <article className="prose prose-lg max-w-none text-gray-700">
        {blog.sections.map((section, index) => (
          <div key={index} className="mb-16">
            {/* Image Section */}
            {section.image && (
              <figure className="my-8">
                <div className="overflow-hidden rounded-xl shadow-md transition-all duration-500 hover:shadow-lg">
                  <img
                    src={section.image}
                    alt={section.heading || "Blog Image"}
                    className="w-full max-h-[450px] object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {section.heading && section.image && !section.paragraph && (
                  <figcaption className="text-center mt-3 text-sm text-gray-500">{section.heading}</figcaption>
                )}
              </figure>
            )}

            {/* Section Heading */}
            {section.heading && (section.paragraph || !section.image) && (
              <h2 className="text-3xl font-semibold mt-8 mb-4 text-gray-900">{section.heading}</h2>
            )}

            {/* Section Paragraph */}
            {section.paragraph && (
              <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {section.paragraph.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-5">{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </article>

      {/* Footer - Share & Back to Blog Button */}
      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Social Sharing */}
          {/* <div className="mb-6 md:mb-0">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Share this article</h3>
            <div className="flex space-x-4 mt-2">
              <Button variant="ghost" size="sm" className="p-2 text-gray-500 hover:text-blue-600">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-gray-500 hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-gray-500 hover:text-blue-800">
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div> */}

          {/* Back to Blog Button at Bottom */}
          <Button
            variant="outline"
            asChild
            className="w-full md:w-auto mt-6 md:mt-0 flex items-center justify-center px-6 py-3 text-lg font-medium border-gray-300 hover:bg-gray-100 transition"
          >
            <Link href="/blog">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Back to Blog</span>
            </Link>
          </Button>
        </div>
      </footer>
      <ChatBot />
    </div>
  )
}
