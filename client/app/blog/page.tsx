"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ChatBot from "@/components/chat-bot";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch(`${process.env.BASE_URL}/api/blogs`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Blog</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog:any) => (
            <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {blog.sections[0]?.image && (
                <img
                  src={blog.sections[0].image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.sections[0]?.paragraph?.slice(0, 100)}...</p>
                <Button asChild>
                  <Link href={`/blog/${blog._id}`}>Read More</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatBot />
    </div>
  );
}
