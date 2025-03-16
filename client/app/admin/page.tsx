"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, MessageSquare, FileText, ArrowRight, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Define Estimate and Contact types
interface Estimate {
  id: number;
  customer: string;
  service: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
}

// Admin Dashboard Component
export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedItem, setSelectedItem] = useState<Estimate | Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pEstimates, setPEstimates] =  useState<Estimate[]>([]);
const [nContact, setNContact] =  useState<Contact[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [estimatesRes, contactsRes] = await Promise.all([
          axios.get(`${process.env.BASE_URL}/api/estimates`),
          axios.get(`${process.env.BASE_URL}/api/contacts`),
        ]);
         console.log("estimates are",estimatesRes)
         setPEstimates(estimatesRes.data.estimates)
         setNContact(contactsRes.data)
        setEstimates(estimatesRes.data.estimates.reverse().slice(0, 5)); // Show last 5 estimates
        setContacts(contactsRes.data.reverse().slice(0, 5)); // Show last 5 contacts
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle opening the modal
  const handleView = (item: Estimate | Contact) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  if (!isAuthenticated) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[100px] mb-8">
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Estimates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">  {pEstimates.filter((estimate:any) => estimate.status === "pending").length}</div>
            {/* <p className="text-xs text-muted-foreground">+19% from last month</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Contacts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nContact.length}</div>
            {/* <p className="text-xs text-muted-foreground">+7% from last month</p> */}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Recent Estimates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Estimates</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {estimates.map((estimate:any,index) => (
                <li key={estimate._id} className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-medium">Estimate #{index+1}</p>
                    <p className="text-sm text-gray-500">{estimate.firstName} - {Object.values(estimate?.services).join(", ")} </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleView(estimate)}>
                    <Eye className="mr-2 h-4 w-4" /> View
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button variant="link" asChild>
                <Link href="/admin/estimates">View all estimates <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {contacts.map((contact:any, index) => (
                <li key={contact._id} className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-medium">Contact #{index+1}</p>
                    <p className="text-sm text-gray-500">{contact.name} - {contact.subject}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleView(contact)}>
                    <Eye className="mr-2 h-4 w-4" /> View
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button variant="link" asChild>
                <Link href="/admin/inquiries">View all contacts <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

   {/* Modal for Viewing Details */}
<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent className="overflow-y-auto max-h-[80vh]">
    <DialogHeader>
      <DialogTitle>
        {selectedItem ? (selectedItem as Contact).email ? "Contact Details" : "Estimate Details" : ""}
      </DialogTitle>
    </DialogHeader>
    {selectedItem && (
      <div className="space-y-2">
        {Object.entries(selectedItem)
          .filter(([key]) => !["_id", "__v", "createdAt", "updatedAt", "status"].includes(key)) // Exclude unwanted fields
          .map(([key, value]) => (
            <div key={key}>
              {key === "images" && Array.isArray(value) ? ( // Check if images exist
                <div className="grid grid-cols-1s gap-4 ">
                  {value.map((image: string, idx: number) => (
                    <img
                      key={idx}
                      src={process.env.BASE_URL+"/"+image}
                      alt={`Estimate Image ${idx + 1}`}
                      className="w-full h-full rounded-lg shadow-md"
                    />
                  ))}
                </div>
              ) : key === "services" && typeof value === "object" ? (
                <p>
                  <strong>{key}:</strong> {Object.values(value).join(", ")}
                </p>
              ) : (
                <p>
                  <strong>{key}:</strong> {value}
                </p>
              )}
            </div>
          ))}
      </div>
    )}
  </DialogContent>
</Dialog>

    </div>
  );
}
