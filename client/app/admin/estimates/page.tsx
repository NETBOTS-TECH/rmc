"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Search } from "lucide-react"

// Dummy data for estimates
const dummyEstimates = [
  { id: 1, name: "John Doe", service: "Concrete Repair", date: "2023-07-15", status: "Pending" },
  { id: 2, name: "Jane Smith", service: "Foundation Repair", date: "2023-07-14", status: "Approved" },
  { id: 3, name: "Bob Johnson", service: "Concrete Leveling", date: "2023-07-13", status: "Completed" },
  { id: 4, name: "Alice Brown", service: "Commercial Concrete", date: "2023-07-12", status: "Pending" },
  { id: 5, name: "Charlie Davis", service: "Driveway Repair", date: "2023-07-11", status: "Rejected" },
]

export default function AdminEstimates() {
  const [estimates, setEstimates] = useState(dummyEstimates)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEstimates = estimates.filter(
    (estimate) =>
      estimate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.service.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Estimates</h1>

      <div className="mb-4 relative">
        <Input
          placeholder="Search estimates..."
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
            <TableHead>Service</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEstimates.map((estimate) => (
            <TableRow key={estimate.id}>
              <TableCell>{estimate.name}</TableCell>
              <TableCell>{estimate.service}</TableCell>
              <TableCell>{estimate.date}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    estimate.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : estimate.status === "Approved"
                        ? "bg-green-200 text-green-800"
                        : estimate.status === "Completed"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-red-200 text-red-800"
                  }`}
                >
                  {estimate.status}
                </span>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/estimates/${estimate.id}`}>
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

