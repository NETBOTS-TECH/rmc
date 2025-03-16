"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  rating: string;
  description: string;
  image: string;
}

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: "",
    description: "",
    image: null as File | null,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${process.env.BASE_URL}/api/testimonials`);
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = (formData as any)[key];
      if (value !== null) {
        formDataToSend.append(key, value);
      }
    });

    try {
      const res = await fetch(
        `${process.env.BASE_URL}/api/testimonials${editMode ? `/${selectedId}` : ""}`,
        {
          method: editMode ? "PUT" : "POST",
          body: formDataToSend,
        }
      );
      if (res.ok) {
        fetchTestimonials();
        setModalOpen(false);
        setFormData({ name: "", location: "", rating: "", description: "", image: null });
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await fetch(`${process.env.BASE_URL}/api/testimonials/${id}`, { method: "DELETE" });
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    } finally {
      setLoading(false);
    }
  };
useEffect(()=>{
    if(!editMode){
    setFormData({ name: "", location: "", rating: "", description: "", image: null });
    }
},[modalOpen])
  return (
    <div className="p-6">
      <Button onClick={() => { setEditMode(false); setModalOpen(true); }}>Add Testimonial</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial._id}>
            <CardContent className="p-4 space-y-2">
              <img
                src={`${process.env.BASE_URL}/${testimonial.image}`}
                alt={testimonial.name}
                className="h-[200px] w-full object-cover rounded-md image-center"
              />
              <h2 className="text-xl font-bold">{testimonial.name}</h2>
              <p className="text-gray-500">{testimonial.location}</p>
              <p className="font-semibold">Rating: {testimonial.rating}</p>
              <p className="text-gray-700">{testimonial.description}</p>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setEditMode(true);
                    setSelectedId(testimonial._id);
                    setFormData({
                      name: testimonial.name,
                      location: testimonial.location,
                      rating: testimonial.rating,
                      description: testimonial.description,
                      image: null, // Image update not handled in edit
                    });
                    setModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(testimonial._id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={handleInputChange} required />
            <Label>Location</Label>
            <Input name="location" value={formData.location} onChange={handleInputChange} required />
            <Label>Rating</Label>
            <Input name="rating" type="number" value={formData.rating} onChange={handleInputChange} required />
            <Label>Description</Label>
            <Textarea name="description" value={formData.description} onChange={handleInputChange} required />
            <Label>Image</Label>
            <Input type="file" onChange={handleFileChange} />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsAdmin;
