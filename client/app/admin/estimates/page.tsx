"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"

// Define TypeScript Interface
interface Estimate {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  services: Record<string, string> // Services stored as an object
  propertyType: string
  schedulePreference: string
  details: string
  street1: string
  city: string
  state: string
  zipCode: string
  status: "pending" | "approved" | "completed" | "rejected"
  createdAt: string
  images: string[] // Assuming images are stored as URLs in an array
}

const API_URL = `${process.env.BASE_URL}/api/estimates`

export default function AdminEstimates() {
  const [estimates, setEstimates] = useState<Estimate[]>([]) // Ensure initial state is an empty array
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Fetch all estimates
  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error("Failed to fetch estimates")

        const data = await response.json()
        console.log("API Response:", data) // Debugging

        if (data && typeof data === "object" && "estimates" in data) {
          setEstimates(data.estimates)
        } else {
          console.error("Unexpected API response format:", data)
          setEstimates([])
        }
      } catch (error) {
        console.error("Error fetching estimates:", error)
        setEstimates([])
      }
    }
    fetchEstimates()
  }, [])

  // Function to update status
  const handleStatusChange = async (id: string, newStatus: Estimate["status"]) => {
    try {
      const response = await fetch(`${API_URL}/${id}/status`, { // ✅ Updated URL
        method: "PUT", // ✅ Match backend method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })
  
      if (!response.ok) throw new Error("Failed to update status")
  
      // ✅ Update state after success
      setEstimates((prev) =>
        prev.map((estimate) =>
          estimate._id === id ? { ...estimate, status: newStatus } : estimate
        )
      )
  
      toast({ title: "Success", description: "Status updated successfully", })
    } catch (error) {
      console.error("Error updating status:", error)
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" })
    }
  }
  

  // Filter estimates based on search term
  const filteredEstimates = estimates.filter(
    (estimate) =>
      estimate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(estimate.services).join(", ").toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredEstimates.length / itemsPerPage)
  const paginatedEstimates = filteredEstimates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Estimates</h1>

      {/* Search */}
      <div className="mb-4 relative">
        <Input
          placeholder="Search estimates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Estimates Table */}
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
          {paginatedEstimates.map((estimate) => (
            <TableRow key={estimate._id}>
              <TableCell>{estimate.firstName} {estimate.lastName}</TableCell>
              <TableCell className="w-[200px]  overflow-auto">{Object.values(estimate?.services).join(", ")}</TableCell>
              <TableCell>{new Date(estimate.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
              <select
  value={estimate.status}
  onChange={(e) => handleStatusChange(estimate._id, e.target.value as Estimate["status"])}
  className="border rounded px-2 py-1"
  style={{
    backgroundColor:
      estimate.status === "pending"
        ? "#facc15" // Yellow
        : estimate.status === "approved"
        ? "#22c55e" // Green
        : estimate.status === "completed"
        ? "#3b82f6" // Blue
        : "#ef4444", // Red
    color: "white",
  }}
>
  <option value="pending">Pending</option>
  <option value="approved">Approved</option>
  <option value="completed">Completed</option>
  <option value="rejected">Rejected</option>
</select>


              </TableCell>
              <TableCell>
                <Dialog >
                  <DialogTrigger  asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedEstimate(estimate)}>
                      <Eye className="mr-2 h-4 w-4" /> View
                    </Button>
                  </DialogTrigger>
                  {selectedEstimate && (
                    <DialogContent className="h-[70vh] overflow-y-scroll">
                      <DialogHeader>
                        <DialogTitle>Estimate Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2">
                        <p><strong>Name:</strong> {selectedEstimate.firstName} {selectedEstimate.lastName}</p>
                        <p><strong>Email:</strong> {selectedEstimate.email}</p>
                        <p><strong>Phone:</strong> {selectedEstimate.phone}</p>
                        <p><strong>Service:</strong> {Object.values(selectedEstimate?.services).join(", ")}</p>
                        <p><strong>Property Type:</strong> {selectedEstimate.propertyType}</p>
                        <p><strong>Schedule Preference:</strong> {selectedEstimate.schedulePreference}</p>
                        <p><strong>Details:</strong> {selectedEstimate.details}</p>
                        <p><strong>Address:</strong> {selectedEstimate.street1}, {selectedEstimate.city}, {selectedEstimate.state} {selectedEstimate.zipCode}</p>
                        <p><strong>Status:</strong> {selectedEstimate.status}</p>

                        {/* Display Images */}
                        {selectedEstimate.images.length > 0 && (
                          <div className="mt-4">
                            <h3 className="font-semibold">Images:</h3>
                            <div className="flex gap-2">
                            {selectedEstimate.images.map((img, index) => {
const fullImageUrl = img.startsWith("http") ? img : `${process.env.BASE_URL+"/"+img}`;


  return (
    <Image 
      key={index} 
      src={fullImageUrl} 
      alt={`Estimate Image ${index + 1}`} 
      width={100} 
      height={100} 
      className="w-full h-full object-cover rounded-md" 
    />
  )
})}


                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button key={index} variant={currentPage === index + 1 ? "default" : "outline"} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}
