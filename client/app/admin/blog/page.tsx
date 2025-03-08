"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Eye, Edit, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast"
const BASE_URL = process.env.BASE_URL;
interface BlogSection {
    heading: string;
    paragraph: string;
    image: File | string | null;
  }
  
  interface Blog {
    _id: string;
    title: string;
    sections: BlogSection[];
  }
  
export default function BlogCRUD() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [blogData, setBlogData] = useState<Blog>({ _id: "", title: "", sections: [] });
  const [isLoading,setIsLoading] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState("")
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch(`${BASE_URL}/api/blogs`);
    const data = await res.json();
    setBlogs(data);
  };
  // Handle section additions
  
  const handleAddSection = () => {
    setBlogData({ ...blogData, sections: [...blogData.sections, { heading: "", paragraph: "", image: null }] });
  };
 const handleAddSection2 = () => {
  if (!currentBlog) return; // Prevent null reference error
  setCurrentBlog({ 
    ...currentBlog, 
    sections: [...(currentBlog.sections || []), { heading: "", paragraph: "", image: null }] 
  });
};
 

// Delete section in Create Blog
const handleDeleteSection = (index: number) => {
    setBlogData({
      ...blogData,
      sections: blogData.sections.filter((_, i) => i !== index),
    });
  };
  
  // Delete section in Edit Blog
  const handleDeleteSectionEdit = (index: number) => {
    if (!currentBlog) return;
    setCurrentBlog({
      ...currentBlog,
      sections: currentBlog.sections.filter((_, i) => i !== index),
    });
  };
  
  // Handle file selection for images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!e.target.files) return;
    const newSections = [...blogData.sections];
    newSections[index].image = e.target.files[0];
    setBlogData({ ...blogData, sections: newSections });
  };
  // Handle text input changes
  const handleChange = (index: number, key: keyof BlogSection, value: string) => {
    const newSections = [...blogData.sections];
    newSections[index][key] = value;
    setBlogData({ ...blogData, sections: newSections });
  };

  // Handle blog creation
  const handleSubmit = async () => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append("title", blogData.title);
  
    // Track image placeholders for correct mapping
    const sectionsData = blogData.sections.map((section, index) => ({
      heading: section.heading,
      paragraph: section.paragraph,
      image: section.image instanceof File ? `NEW_IMAGE_${index}` : section.image, // Track new images
    }));
  
    formData.append("sections", JSON.stringify(sectionsData));
  
    // Append images using a consistent naming pattern
    blogData.sections.forEach((section, index) => {
      if (section.image instanceof File) {
        formData.append(`images`, section.image); // Files are appended in order
      }
    });
  
    try {
      const response = await fetch(`${BASE_URL}/api/blogs`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Failed to create blog");
  
      setOpenDialog(false);
      fetchBlogs();
      toast({ title: "Success", description: "blog added successfully", })
      setIsLoading(false)
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast({ title: "errpr", description: "blog creation failed", })
      setIsLoading(false)
    }
  };
  
  
  
  

  // Handle blog deletion
  const handleDelete = async (id: string) => {
    setDeletingIndex(id)
    await fetch(`${BASE_URL}/api/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
    toast({ title: "Success", description: "Blog deleted successfully", })
    setDeletingIndex("");
  };

  // Handle blog editing
  const handleEdit = async () => {
    if (!currentBlog) return;
  setIsLoading(true);
    const formData = new FormData();
    formData.append("title", currentBlog.title);
  
    const updatedSections = currentBlog.sections.map((section, index) => ({
      heading: section.heading,
      paragraph: section.paragraph,
      image: section.image instanceof File ? `NEW_IMAGE_${index}` : section.image, // Track new images
    }));
  
    formData.append("sections", JSON.stringify(updatedSections));
  
    currentBlog.sections.forEach((section, index) => {
      if (section.image instanceof File) {
        formData.append(`images`, section.image);
      }
    });
  
    try {
      const response = await fetch(`${BASE_URL}/api/blogs/${currentBlog._id}`, {
        method: "PUT",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Failed to update blog");
  
      setOpenEditDialog(false);
      fetchBlogs();
      toast({ title: "Success", description: "Blog updated successfully", })
      setIsLoading(false)
    } catch (error) {
      console.error("Error updating blog:", error);
      toast({ title: "error", description: "Blog updation failed", })
      setIsLoading(false)
    }
  };
  
  
  
  
  useEffect(()=>{
    if(openDialog)
    {
    setBlogData({ _id: "", title: "", sections: [] })
    }
  },[openDialog])
  useEffect(() => {
    if (!openEditDialog) {
      setCurrentBlog((prev) =>
        prev ? { ...prev, sections: prev.sections.map((section) => ({ ...section, image: section.image instanceof File ? null : section.image })) } : null
      );
    }
  }, [openEditDialog]);
  
  
  
  return (
    <div className="p-6 bg-gray-50">
    <Button 
      onClick={() => setOpenDialog(true)} 
      className="mb-6 flex items-center bg-primary hover:bg-primary/90 shadow-sm"
    >
      <Plus className="mr-2 h-4 w-4" /> Create Blog
    </Button>
  
    {/* Blog Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog,index) => (
        <Card key={blog._id} className="hover:shadow-md transition-shadow duration-300 overflow-hidden">
          {blog.sections[0]?.image && (
            <div className="h-40 overflow-hidden">
              <img 
                src={String(blog.sections[0].image)} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold truncate">{blog.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
              {blog.sections[0]?.paragraph?.substring(0, 100) || "No content"}
              {blog.sections[0]?.paragraph?.length > 100 ? "..." : ""}
            </p>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => { setCurrentBlog(blog); setOpenViewDialog(true); }}
                className="flex-1 text-xs"
              >
                <Eye className="w-4 h-4 mr-1" /> View
              </Button>
              <Button 
                variant="outline" 
                onClick={() => { setCurrentBlog(blog); setOpenEditDialog(true); }}
                className="flex-1 text-xs"
              >
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleDelete(blog._id)}
                className="text-red-500 hover:bg-red-50 text-xs"
              >
              {blog._id === deletingIndex ? "Deleting..." :  <Trash className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
           {/* Delete Section Button */}
    
        </Card>
        
      ))}
    </div>
  
    {/* Create Blog Dialog */}
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4 mb-4">
          <DialogTitle className="text-xl font-bold">Create Blog</DialogTitle>
        </DialogHeader>
        
        <Input
          value={blogData.title}
          onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
          placeholder="Title"
          className="mb-6 border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
        />
        
        <div className="space-y-6">
          {blogData.sections.map((section, index) => (
            <div key={index} className="p-4 border rounded-md bg-gray-50 space-y-3">
                   <Button 
  variant="destructive" 
  onClick={() => handleDeleteSection(index)} 
  className=" text-xs float-right"
>
  <Trash className="w-4 h-4" /> Delete
</Button>
              <p className="text-sm font-medium text-gray-500 mb-1">Section {index + 1}</p>
           

              <Input
                value={section.heading || ""}
                onChange={(e) => handleChange(index, "heading", e.target.value)}
                placeholder="Heading"
                className="mb-2 border-gray-300"
              /> 
              
              <Textarea
                value={section.paragraph || ""}
                onChange={(e) => handleChange(index, "paragraph", e.target.value)}
                placeholder="Paragraph"
                className="min-h-24 border-gray-300"
              />
              
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Section Image</p>
                {section.image && (
                  <div className="mb-2 h-24 w-full rounded overflow-hidden bg-gray-100">
                    <img
                      src={typeof section.image === "string" ? section.image : URL.createObjectURL(section.image)}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <Input 
                  type="file" 
                  onChange={(e) => handleFileChange(e, index)} 
                  className="text-sm"
                />
                
              </div>

            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <Button 
            onClick={handleAddSection}
            variant="outline"
            className="flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Section
          </Button>
          
          <Button 
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90"
          >
           {isLoading ? "Saving....." : "Save Blog"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  
    {/* View Blog Dialog */}
    {currentBlog && (
      <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="border-b pb-4 mb-6">
            <DialogTitle className="text-2xl font-bold">{currentBlog.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8">
            {currentBlog.sections.map((section, index) => (
              <div key={index} className="mb-6">
                {section.heading && (
                  <h3 className="font-bold text-xl mb-3 text-gray-800">{section.heading}</h3>
                )}
                
                {section.image && (
                  <div className="rounded-md overflow-hidden mb-4 shadow-sm">
                    <img 
                      src={String(section.image)} 
                      alt="" 
                      className="w-full object-cover" 
                    />
                  </div>
                )}
                
                {section.paragraph && (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.paragraph}
                  </p>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    )}
  
    {/* Edit Blog Dialog */}
    {currentBlog && (
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
          <DialogHeader className="border-b pb-4 mb-4">
            <DialogTitle className="text-xl font-bold">Edit Blog</DialogTitle>
          </DialogHeader>
          
          <Input
            value={currentBlog?.title || ""}
            onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
            placeholder="Title"
            className="mb-6 border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
          />
          
          <div className="space-y-6">
            {currentBlog?.sections.map((section, index) => (
              <div key={index} className="p-4 border rounded-md bg-gray-50 space-y-3">
                   <Button 
  variant="destructive" 
  onClick={() => handleDeleteSectionEdit(index)} 
  className=" text-xs float-right"
>
  <Trash className="w-4 h-4" /> Delete
</Button>
                <p className="text-sm font-medium text-gray-500 mb-1">Section {index + 1}</p>
                
                <Input
                  value={section.heading || ""}
                  onChange={(e) => {
                    const updatedSections = [...currentBlog.sections];
                    updatedSections[index].heading = e.target.value;
                    setCurrentBlog({ ...currentBlog, sections: updatedSections });
                  }}
                  placeholder="Heading"
                  className="mb-2 border-gray-300"
                />
                
                <Textarea
                  value={section.paragraph || ""}
                  onChange={(e) => {
                    const updatedSections = [...currentBlog.sections];
                    updatedSections[index].paragraph = e.target.value;
                    setCurrentBlog({ ...currentBlog, sections: updatedSections });
                  }}
                  placeholder="Paragraph"
                  className="min-h-24 border-gray-300"
                />
                
                {/* Show existing image if available */}
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Section Image</p>
                  {section.image && (
                    <div className="mb-2 h-24 w-full rounded overflow-hidden bg-gray-100">
                      <img
                        src={typeof section.image === "string" ? section.image : URL.createObjectURL(section.image)}
                        alt="Blog Section"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* File upload input */}
                  <Input
                    type="file"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      const newFile = e.target.files[0];
                      setCurrentBlog((prevBlog) =>
                        prevBlog
                          ? {
                              ...prevBlog,
                              sections: prevBlog.sections.map((section, i) =>
                                i === index ? { ...section, image: newFile } : section
                              ),
                            }
                          : null
                      );
                    }}
                    className="text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <Button 
            onClick={handleAddSection2}
            variant="outline"
            className="flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Section
          </Button>
            <Button 
              onClick={() => handleEdit()}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? "Updating...." : "Update Blog"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )}
  </div>
  );
}