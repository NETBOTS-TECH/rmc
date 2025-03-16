"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash, Upload, Edit } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const API_URL = `${process.env.BASE_URL}/api/gallery`;
const subheadingOptions = [
  "Concrete Leveling", "Foundation Repair", "New Concrete", "Basement WATERPROOFING",
 "Egress Window"
];


interface ImageData {
  _id?: string;
  url: string;
  name: string;
  category: string;
}

export default function Gallery() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageData | null>(null);
  const [newGallery, setNewGallery] = useState<ImageData>({ name: "", category: "", url: "" });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: ImageData[] = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  const handleUpload = async () => {
    if (!file || !newGallery.name || !newGallery.category) return alert("All fields are required.");
    
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", newGallery.name);
    formData.append("category", newGallery.category);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const newImage: ImageData = await response.json();
      setImages((prev) => [newImage, ...prev]);
      setNewGallery({ name: "", category: "", url: "" });
      setFile(null);
      setDialogOpen(false);
      toast({ title: "Success", description: "Gallery item added successfully" });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  const handleUpdate = async () => {
    if (!editingImage) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/${editingImage._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editingImage.name, category: editingImage.category }),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      setImages((prev) => prev.map(img => img._id === editingImage._id ? editingImage : img));
      setEditingImage(null);
      setDialogOpen(false);
      toast({ title: "Success", description: "Gallery item updated successfully" });
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setImages((prev) => prev.filter((image) => image._id !== id));
      toast({ title: "Success", description: "Image deleted successfully" });
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gallery Management</h1>
      <Button onClick={() => { setDialogOpen(true); setEditingImage(null); }}>Create Gallery</Button>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
  {images.map((image) => (
    <Card 
      key={image._id} 
      className="relative w-[300px] h-full shadow-lg rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      {/* Edit & Delete Buttons */}
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <Button 
          size="icon" 
          className="bg-blue-500 text-white hover:bg-blue-600 shadow-md"
          onClick={() => { setEditingImage(image); setDialogOpen(true); }}
        >
          <Edit className="h-5 w-5" />
        </Button>
        <Button 
          size="icon" 
          className="bg-red-500 text-white hover:bg-red-600 shadow-md"
          onClick={() => handleDelete(image._id)}
        >
          <Trash className="h-5 w-5" />
        </Button>
      </div>

      {/* Image Display */}
      <Image 
        src={`${process.env.BASE_URL}${image.url}`} 
        alt={image.name} 
        width={320} 
        height={200} 
        className="w-full h-[200px] object-cover"
      />

      {/* Card Content */}
      <CardContent className="p-4 text-center">
        <h3 className="text-lg font-bold text-gray-800">{image.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{image.category}</p>
      </CardContent>
    </Card>
  ))}
</div>

      {/* Create/Update Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingImage ? "Update Gallery Item" : "Create Gallery Item"}</DialogTitle>
          </DialogHeader>
          
          <Input 
            type="file" accept="image/*" 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
          />
          
          <Input 
            placeholder="Name" 
            value={editingImage?.name || newGallery.name} 
            onChange={(e) => 
              editingImage 
                ? setEditingImage({ ...editingImage, name: e.target.value }) 
                : setNewGallery({ ...newGallery, name: e.target.value })} 
          />

          {/* Category Selection */}
          <Select 
            value={editingImage?.category || newGallery.category} 
            onValueChange={(value) => 
              editingImage 
                ? setEditingImage({ ...editingImage, category: value }) 
                : setNewGallery({ ...newGallery, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {subheadingOptions.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Dialog Footer */}
          <DialogFooter>
            {editingImage ? (
              <Button onClick={handleUpdate}>Update</Button>
            ) : (
              <Button onClick={handleUpload}>Create</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
