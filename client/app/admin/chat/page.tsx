"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from "lucide-react"

// Dummy data for active chats
const dummyChats = [
  { id: 1, user: "John Doe", lastMessage: "Hello, I need help with my driveway.", timestamp: "2 min ago" },
  { id: 2, user: "Jane Smith", lastMessage: "What are your rates for foundation repair?", timestamp: "5 min ago" },
  {
    id: 3,
    user: "Bob Johnson",
    lastMessage: "Can you give me a quote for concrete leveling?",
    timestamp: "10 min ago",
  },
]

export default function AdminChat() {
  const [activeChats, setActiveChats] = useState(dummyChats)
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<{ user: string; message: string; timestamp: string }[]>([])

  useEffect(() => {
    if (selectedChat) {
      // In a real application, you would fetch the chat history for the selected chat
      setChatMessages([
        { user: "John Doe", message: "Hello, I need help with my driveway.", timestamp: "2 min ago" },
        {
          user: "Agent",
          message: "Hello John, I'd be happy to help. What seems to be the issue with your driveway?",
          timestamp: "1 min ago",
        },
      ])
    }
  }, [selectedChat])

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      setChatMessages([...chatMessages, { user: "Agent", message, timestamp: "Just now" }])
      setMessage("")
      // In a real application, you would send this message to the backend
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Live Chat</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  )
}

