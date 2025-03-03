import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, MessageSquare, FileText, ArrowRight } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Estimates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+7% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Estimates</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-medium">Estimate #{i}</p>
                    <p className="text-sm text-gray-500">John Doe - Concrete Repair</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/estimates/${i}`}>View</Link>
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button variant="link" asChild className="p-0">
                <Link href="/admin/estimates" className="flex items-center">
                  View all estimates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-medium">Inquiry #{i}</p>
                    <p className="text-sm text-gray-500">Jane Smith - Foundation Repair</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/inquiries/${i}`}>View</Link>
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button variant="link" asChild className="p-0">
                <Link href="/admin/inquiries" className="flex items-center">
                  View all inquiries
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild>
              <Link href="/admin/estimates/new">Create New Estimate</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/services/new">Add New Service</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/chat">View Live Chats</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

