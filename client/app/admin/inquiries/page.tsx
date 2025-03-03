"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Search } from "lucide-react"

// Dummy data for inquiries
const dummyInquiries = [
  { id: 1, name: "John Doe", email: "john@example.com", subject: "Quote Request", date: "2023-07-15", status: "New" },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Service Inquiry",
    date: "2023-07-14",
    status: "In Progress",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    subject: "Complaint",
    date: "2023-07-13",
    status: "Resolved",
  },
  { id: 4, name: "Alice Brown", email: "alice@example.com", subject: "Feedback", date: "2023-07-12", status: "New" },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    subject: "Partnership Proposal",
    date: "2023-07-11",
    status: "In Progress",
  },
]

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState(dummyInquiries)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Inquiries</h1>

      <div className="mb-4 relative">
        <Input
          placeholder="Search inquiries..."
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
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInquiries.map((inquiry) => (
            <TableRow key={inquiry.id}>
              <TableCell>{inquiry.name}</TableCell>
              <TableCell>{inquiry.email}</TableCell>
              <TableCell>{inquiry.subject}</TableCell>
              <TableCell>{inquiry.date}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    inquiry.status === "New"
                      ? "bg-green-200 text-green-800"
                      : inquiry.status === "In Progress"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {inquiry.status}
                </span>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/inquiries/${inquiry.id}`}>
                    <Eye className="mr-2 h-4 w-4" /> View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

