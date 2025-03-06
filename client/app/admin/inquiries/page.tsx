"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Define the type for an Inquiry
interface Inquiry {
  message: string;
  id: number;
  name: string;
  email: string;
  subject: string;
  date: string; // ISO date string
}

// Admin Inquiries Component
export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Fetch all inquiries from the API
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get(`${process.env.BASE_URL}/api/contacts`);
        setInquiries(response.data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchInquiries();
  }, []);

  // Filter inquiries based on search term
  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage)
  const paginatedContact = filteredInquiries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  // Handle opening the modal
  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Contact </h1>

      <div className="mb-4 relative">
        <Input
          placeholder="Search contact..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
           
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedContact.map((inquiry:any) => (
            <TableRow key={inquiry.id}>
              <TableCell>{inquiry.name}</TableCell>
              <TableCell>{inquiry.email}</TableCell>
              <TableCell>{inquiry.subject}</TableCell>
             
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleViewInquiry(inquiry)}>
                  <Eye className="mr-2 h-4 w-4" /> View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Inquiry Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <p><strong>Name:</strong> {selectedInquiry.name}</p>
              <p><strong>Email:</strong> {selectedInquiry.email}</p>
              <p><strong>Subject:</strong> {selectedInquiry.subject}</p>
              <p><strong>Message:</strong> {selectedInquiry.message}</p>
             
            </div>
          )}
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
