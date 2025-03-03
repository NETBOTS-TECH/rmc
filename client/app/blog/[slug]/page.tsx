import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { blogData } from "@/data/blog-data"
import { ArrowLeft } from "lucide-react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogData.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <img
            src={post.image || "/placeholder.svg?height=400&width=800"}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-500 mb-8">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
          <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>
            <div className="flex space-x-4">
              <Button variant="outline">Share</Button>
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

