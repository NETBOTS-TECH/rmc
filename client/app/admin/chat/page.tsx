"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, User, MessageSquare, Users, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Initialize WebSocket
const socket = io(process.env.BASE_URL || "http://localhost:5000", {
  transports: ["websocket", "polling"],
  reconnectionAttempts: 5,
  timeout: 10000,
});

export default function AdminChat() {
  const [activeChats, setActiveChats] = useState<string[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Record<string, any[]>>({});
  const [chatUsers, setChatUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [agentId, setAgentId] = useState("");
  const itemsPerPage = 5;

  // Listen for Active Users & Messages
  useEffect(() => {
    if (!socket) return;
  
    const agentId = `Agent-${Math.floor(Math.random() * 1000)}`;
    socket.emit("register-agent", agentId);
  
    setAgentId(agentId);
  
    socket.on("client-assigned", ({ clientId }) => {
      console.log("Client assigned:", clientId);
      setSelectedChat(clientId);
  
      setChatMessages((prev) => ({
        ...prev,
        [clientId]: [...(prev[clientId] || [])],
      }));
      setActiveChats(Object.keys({
          ...chatMessages,
          [clientId]: [...(chatMessages[clientId] || [])],
        }));
    });
  
    socket.on("receive-message", ({ sender, message, chatId }) => {
      console.log("New message:", { sender, message, chatId });
      setChatMessages((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), { sender, message, timestamp: new Date() }],
      }));
      setActiveChats(Object.keys({
          ...chatMessages,
          [chatId]: [...(chatMessages[chatId] || []), { sender, message, timestamp: new Date() }],
        }));
    });
  
    return () => {
      console.log("Removing socket listeners...");
      socket.off("update-clients");
      socket.off("receive-message");
    };
  }, []); // Add chatMessages as a dependency

  // Fetch All Users
  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/api/chat-user`);
        if (!response.ok) throw new Error("Failed to fetch chat users");
        const data = await response.json();
        setChatUsers(data);
      } catch (error) {
        console.error("Error fetching chat users:", error);
      }
    };
    fetchChatUsers();
  }, []);

  // Send Message
  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      const newMessage = { sender: "Agent", message, timestamp: new Date() };
      
      // Add message to local state
      setChatMessages((prev) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage],
      }));
      
      // Send message to server with correct agentId
      socket.emit("agent-message", { 
        agentId: agentId, // Use stored agentId instead of socket.id
        message 
      });
      
      setMessage("");
    }
  };
  // Format time
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Filter users
  const filteredUsers = chatUsers.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.includes(searchTerm)
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Customer Support Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Chats Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader className="bg-gray-50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                Active Conversations
              </CardTitle>
              {/* <Badge variant="outline" className="bg-blue-50">
                {activeChats.length} Online
              </Badge> */}
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {activeChats.length > 0 ? (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {activeChats.map((chatId) => (
                  <div
                    key={chatId}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center 
                      ${selectedChat === chatId 
                        ? "bg-blue-100 border-l-4 border-blue-500" 
                        : "hover:bg-gray-100 border-l-4 border-transparent"}`}
                    onClick={() => setSelectedChat(chatId)}
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center text-white">
                      {chatId.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{chatId}</p>
                      <p className="text-sm text-gray-500">
                        {chatMessages[chatId] && chatMessages[chatId].length > 0
                          ? chatMessages[chatId][chatMessages[chatId].length - 1].message.substring(0, 20) + "..."
                          : "No messages yet"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No active conversations</p>
                <p className="text-sm text-gray-400">Waiting for customers to connect...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2">
          <CardHeader className="bg-gray-50 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                {selectedChat ? (
                  <>
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-400 flex items-center justify-center text-white mr-2">
                      {selectedChat.substring(0, 2).toUpperCase()}
                    </div>
                    <span>{selectedChat}</span>
                  </>
                ) : (
                  <span>Select a conversation</span>
                )}
              </CardTitle>
              {selectedChat && (
                <Badge variant="outline" className="bg-green-50 text-green-600">
                  Online
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {selectedChat ? (
              <>
                <div className="h-[400px] overflow-y-auto p-4 space-y-3">
                  {chatMessages[selectedChat]?.length > 0 ? (
                    chatMessages[selectedChat].map((msg, index) => (
                      <div key={index} className={`flex ${msg.sender === "Agent" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] p-3 rounded-lg shadow-sm
                          ${msg.sender === "Agent" 
                            ? "bg-blue-500 text-white rounded-br-none" 
                            : "bg-gray-100 rounded-bl-none"}`}>
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-sm">
                              {msg.sender === "Agent" ? "You" : msg.sender}
                            </span>
                            <span className="text-xs ml-2 opacity-70">
                              {msg.timestamp ? formatTime(msg.timestamp) : ""}
                            </span>
                          </div>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p>No messages yet</p>
                        <p className="text-sm text-gray-400">Send a message to start the conversation</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="focus-visible:ring-blue-500"
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-[450px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-lg font-medium">No conversation selected</p>
                  <p className="text-sm text-gray-400">Select a customer from the list to start chatting</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* User Management Section */}
      <Card className="mt-6">
        <CardHeader className="bg-gray-50 pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-500" />
              Customer Database
            </CardTitle>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search users..."
                className="pl-9 max-w-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                 
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user, index) => (
                    <TableRow key={user._id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                     
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <User className="h-10 w-10 text-gray-300 mb-2" />
                        {searchTerm ? "No users match your search" : "No users found"}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}