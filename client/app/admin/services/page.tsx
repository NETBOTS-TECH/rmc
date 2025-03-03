"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { servicesData } from "@/data/services-data"
import { Plus, Pencil, Trash } from "lucide-react"

export default function AdminServices() {
  const [services, setServices] = useState([...servicesData.residential, ...servicesData.commercial])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredServices = services.filter((service) => service.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleDelete = (id: number) => {
    setServices(services.filter((service) => service.id !== id))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Services</h1>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Service
          </Link>
        </Button>
      </div>

      <div className="mb-4">
        <Input placeholder="Search services..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredServices.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.title}</TableCell>
              <TableCell>{service.id < 100 ? "Residential" : "Commercial"}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/services/${service.id}`}>
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

