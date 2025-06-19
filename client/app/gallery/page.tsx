"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import ChatBot from "@/components/chat-bot";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gallery`;

interface ImageData {
  _id: string;
  url: string;
  name: string;
  category: string;
}

const Gallery = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const category = localStorage.getItem("selectedCategory") || "All Gallery";
    setSelectedCategory(category);
  }, []);

  useEffect(() => {
    if (selectedCategory === "All Gallery") {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter((img) => img.category === selectedCategory));
    }
  }, [images, selectedCategory]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data: ImageData[] = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Gallery</h1>
      <p className="text-lg text-center text-gray-700 mb-4">Completed Projects showcasing our expertise and quality work.</p>

      {loading ? (
       <div className="flex flex-col items-center justify-center">
       <div className="w-40 h-40 border-8 border-gray-300 border-t-primary rounded-full animate-spin"></div>
       <p className="mt-4 text-lg text-gray-600">Loading...</p>
     </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {filteredImages.length > 0 ? (
            filteredImages.map((image) => (
              <Card key={image._id} className="relative w-[300px] h-[350px] shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-2 w-full h-full flex flex-col justify-between items-center">
                  <div className="relative w-full h-[250px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${image.url}`}
                      alt={image.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="text-center p-2">
                    <h3 className="text-lg font-bold text-gray-800">{image.name}</h3>
                    <p className="text-sm text-gray-600">{image.category}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">No images available for {selectedCategory}.</p>
          )}
        </div>
      )}
      
      <ChatBot />
    </div>
  );
};

export default Gallery;