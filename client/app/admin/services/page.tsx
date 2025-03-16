"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast"
const API_URL = `${process.env.BASE_URL}/api/services/`; // Change if hosted elsewhere

interface Service {
  _id: string;
  name: string;
  subheading: string;
  description: string;
  image: string;
  category: "residential" | "commercial";
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1)
  const [loading,setLoading]= useState(false);
  const subheadingOptions = ["CONCRETE REPAIR","FOUNDATION REPAIR","NEW CONCRETE","WATERPROOFING", "COMMERCIAL SERVICES", "PARTNERED INDUSTRIES", "PREMIER PARTNER"];
  const [deleting,setDeleting]= useState("");
  const itemsPerPage = 10
  
  const [newService, setNewService] = useState({
    name: "",
    subheading : "",
    description: "",
    image: null as File | null,
    category: "residential",
  });
  const totalPages = Math.ceil(services.length / itemsPerPage)
  const paginatedServices = services.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(API_URL);
      const data: Service[] = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setServices((prev) => prev.filter((service) => service._id !== id));
      toast({ title: "Success", description: "service deleted successfully", })
      setDeleting("")
    } catch (error) {
      console.error("Error deleting service:", error);
      toast({ title: "error", description: "service deletion failed", })
      setDeleting("")
    }
  };

  const handleAddService = async () => {
    if (!newService.name || !newService.description || !newService.image) {
      alert("Please fill in all fields.");
      return;
    }
 setLoading(true);
    const formData = new FormData();
    formData.append("name", newService.name);
    formData.append("description", newService.description);
    formData.append("image", newService.image);
    formData.append("category", newService.category);
    formData.append("subheading", newService.subheading);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      const addedService: Service = await response.json();
      setServices([addedService, ...services]);

      setIsAddModalOpen(false);
      setNewService({ name: "", description: "", image: null, category: "residential", subheading: "" });
      toast({ title: "Success", description: "Service added successfully" })
      setLoading(false)
    } catch (error) {
      console.error("Error adding service:", error);
      setLoading(false);
      toast({ title: "failed", description: "Service can not be added" })
    }
  };

  const handleEditService = async () => {
    if (!editingService) return;
    if (!editingService.name || !editingService.description || !editingService.subheading) {
      alert("Please fill in all fields.");
      return;
    }
 setLoading(true);
    const formData = new FormData();
    formData.append("name", editingService.name);
    formData.append("description", editingService.description);
    formData.append("category", editingService.category);
    formData.append("subheading", editingService.subheading);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await fetch(`${API_URL}/${editingService._id}`, {
        method: "PUT",
        body: formData,
      });
      const updatedService: Service = await response.json();

      setServices((prev) =>
        prev.map((s) => (s._id === updatedService._id ? updatedService : s))
      );

      setIsEditModalOpen(false);
      setEditingService(null);
      setSelectedImage(null);
      toast({ title: "Success", description: "Service updated successfully", })
      setLoading(false)
    } catch (error) {
      console.error("Error updating service:", error);
      toast({ title: "error", description: "Service update failed", })
      setLoading(false)
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Services</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </div>

      <div className="mb-4">
        <Input placeholder="Search services..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
          <TableHead>S.no</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Subheading</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedServices
            .filter((service) => service.name?.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((service,index) => (
              <TableRow key={service._id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.subheading ?service.subheading : "N/A" }</TableCell>
                <TableCell style={{
  width: "300px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2
}}>
  {service.description}
</TableCell>

                <TableCell>{service.category}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingService({ ...service });
                        setSelectedImage(null);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(service._id)}>
                      <Trash className="mr-2 h-4 w-4" /> {deleting === service._id  ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Add Service Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input placeholder="Service Name" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} />
            <Textarea placeholder="Service Description" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} />
            <Select
  value={newService.subheading}
  onValueChange={(value) => setNewService({ ...newService, subheading: value })}
>
  <SelectTrigger>
    <SelectValue placeholder="Select Service Subheading" />
  </SelectTrigger>
  <SelectContent>
    {subheadingOptions.map((option) => (
      <SelectItem key={option} value={option}>
        {option}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
            
            <Input type="file" accept="image/*" onChange={(e) => setNewService({ ...newService, image: e.target.files?.[0] || null })} />

            <Select value={newService.category} onValueChange={(value) => setNewService({ ...newService, category: value as "residential" | "commercial" })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddService}>{loading ? "Adding Service...": "Add Service"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input placeholder="Service Name" value={editingService?.name || ""} onChange={(e) => setEditingService(prev => prev ? { ...prev, name: e.target.value } : null)} />
            <Textarea
              placeholder="Service Description"
              value={editingService?.description || ""}
              onChange={(e) => setEditingService((prev) => prev ? { ...prev, description: e.target.value } : null)}
            />
<Select
  value={editingService?.subheading || ""}
  onValueChange={(value) =>
    setEditingService((prev) => (prev ? { ...prev, subheading: value } : null))
  }
>
  <SelectTrigger>
    <SelectValue placeholder="Select Service Subheading" />
  </SelectTrigger>
  <SelectContent>
    {subheadingOptions.map((option) => (
      <SelectItem key={option} value={option}>
        {option}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
            {/* Existing Image Preview */}
            {editingService?.image && !selectedImage && (
              <Image src={editingService.image} alt="Current Service" width={100} height={100} className="w-full h-[300px] rounded-md" />
            )}

            <Input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files?.[0] || null)} />

            <Select
              value={editingService?.category}
              onValueChange={(value) =>
                setEditingService((prev) => prev ? { ...prev, category: value as "residential" | "commercial" } : null)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button onClick={handleEditService}>{loading ? "Updating...." : "Update Service"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button key={index} variant={currentPage === index + 1 ? "default" : "outline"} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
