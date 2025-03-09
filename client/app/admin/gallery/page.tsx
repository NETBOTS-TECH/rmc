"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash, Upload } from "lucide-react";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast"
const API_URL = `${process.env.BASE_URL}/api/gallery`; // Change if hosted elsewhere

interface Image {
  _id: string;
  url: string;
}

export default function Gallery() {
  const [images, setImages] = useState<Image[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("token"); // Ensure the user is authenticated
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: Image[] = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }, // Do NOT manually set Content-Type
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }
  
      const newImage: Image = await response.json();
      setImages((prev) => [newImage,...prev]);
      setFile(null);
      toast({ title: "Success", description: "File uploaded successfully", })
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Check console for details.");
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setImages((prev) => prev.filter((image) => image._id !== id));
      toast({ title: "Success", description: "image deleted successfully", })
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gallery Management</h1>

      {/* Upload Section */}
      <div className="mb-6 flex items-center gap-4">
        <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <Button onClick={handleUpload} disabled={!file}>
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 place-items-center ">
      {images.map((image) => (
  <Card key={image._id} style={{width:'300px', height:'300px'}} className="relative  overflow-hidden">
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
      <Button
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
        size="icon"
        onClick={() => handleDelete(image._id)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
))}
      </div>

      {images.length === 0 && <p className="text-gray-500 text-center mt-4">No images uploaded.</p>}
    </div>
  );
}
