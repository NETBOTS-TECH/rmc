"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import ChatBot from "@/components/chat-bot";

const API_URL = `${process.env.BASE_URL}/api/gallery`; // Change if hosted

interface ImageData {
  _id: string;
  url: string;
}

const Gallery = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);
 
  const fetchImages = async () => {
    try {
      const response = await fetch(API_URL);
      const data: ImageData[] = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center ">
        {images.length > 0 ? (
          images.map((image) => (
            <Card key={image._id} className="relative w-[300px] h-[300px] overflow-hidden">
              <CardContent className="p-2 w-full h-full flex justify-center items-center">
                <div className="relative w-full h-full">
                  <Image
                    src={`${process.env.BASE_URL}${image.url}`} // Ensure full URL
                    alt="Gallery"
                    layout="fill" // Cover entire div
                    objectFit="cover" // Maintain aspect ratio, fill the card
                    className="rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          
          <p className="text-gray-500 text-center col-span-full">No images available. </p>
        )}
      </div>
      <ChatBot />
    </div>
  );
};

export default Gallery;
