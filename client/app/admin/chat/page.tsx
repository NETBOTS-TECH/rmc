"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Dummy data for active chats
const dummyChats = [
  { id: 1, user: "John Doe", lastMessage: "Hello, I need help with my driveway.", timestamp: "2 min ago" },
  { id: 2, user: "Jane Smith", lastMessage: "What are your rates for foundation repair?", timestamp: "5 min ago" },
  { id: 3, user: "Bob Johnson", lastMessage: "Can you give me a quote for concrete leveling?", timestamp: "10 min ago" },
]

export default function AdminChat() {
  const [activeChats, setActiveChats] = useState(dummyChats)
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<{ user: string; message: string; timestamp: string }[]>([])
  const [chatUsers, setChatUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  useEffect(() => {
    if (selectedChat) {
      setChatMessages([
        { user: "John Doe", message: "Hello, I need help with my driveway.", timestamp: "2 min ago" },
        { user: "Agent", message: "Hello John, I'd be happy to help. What seems to be the issue?", timestamp: "1 min ago" },
      ])
    }
  }, [selectedChat])

  // Fetch chat users from backend
  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/api/chat-user`) // Adjust API route as needed
        if (!response.ok) throw new Error("Failed to fetch chat users")
        const data = await response.json()
        setChatUsers(data)
      } catch (error) {
        console.error("Error fetching chat users:", error)
      }
    }
    fetchChatUsers()
  }, [])

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      setChatMessages([...chatMessages, { user: "Agent", message, timestamp: "Just now" }])
      setMessage("")
    }
  }
  const totalPages = Math.ceil(chatUsers.length / itemsPerPage)
  const paginatedEstimates = chatUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Live Chat</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Chats List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Active Chats</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {activeChats.map((chat) => (
                <li
                  key={chat.id}
                  className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${selectedChat === chat.id ? "bg-gray-100" : ""}`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="font-semibold">{chat.user}</div>
                  <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                  <div className="text-xs text-gray-400">{chat.timestamp}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedChat ? `Chat with ${activeChats.find((c) => c.id === selectedChat)?.user}` : "Select a chat"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedChat ? (
              <>
                <div className="h-96 overflow-y-auto mb-4 space-y-2">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded ${msg.user === "Agent" ? "bg-blue-100 ml-auto" : "bg-gray-100"} max-w-[70%]`}
                    >
                      <div className="font-semibold">{msg.user}</div>
                      <div>{msg.message}</div>
                      <div className="text-xs text-gray-400">{msg.timestamp}</div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">Select a chat to start messaging</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Chat Users Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Chat User Tracking</h2>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Issue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEstimates.length > 0 ? (
                  paginatedEstimates.map((user:any, index) => (
                    <TableRow key={user._id}>
                      <TableCell>{index+1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.description}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">
                      No chat users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
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
