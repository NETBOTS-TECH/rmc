"use client"

import { useState, useEffect, useRef } from "react"
import { X, MessageSquare, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { chatbotData } from "@/data/chatbot-data"
import { useToast } from "@/components/ui/use-toast"
import { io } from "socket.io-client"
const messageSoundURL = "https://www.fesliyanstudios.com/play-mp3/4315";
const typingSoundURL = "https://www.fesliyanstudios.com/play-mp3/2763"; // Example typing sound
import axios from "axios"
import { usePathname } from "next/navigation"
// Define message types
type Message = {
  id: string
  type: "user" | "bot" | "agent"
  text: string
  isTyping?: boolean
}

type UserInfo = {
  name: string
  email: string
  phone: string
  issue: string
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showChatbot, setShowChatbot] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [collectingUserInfo, setCollectingUserInfo] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    phone: "",
    issue: "",
  })
  const [currentUserInfoField, setCurrentUserInfoField] = useState<keyof UserInfo | null>(null)
  const [liveAgentRequested, setLiveAgentRequested] = useState(false)
  const [socket, setSocket] = useState<any>(null)
  const [agentConnected, setAgentConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const messageSoundRef = useRef<HTMLAudioElement | null>(null);
  const typingSoundRef = useRef<HTMLAudioElement | null>(null);
const pathname = usePathname();
  useEffect(() => {
    // Initialize sounds
    messageSoundRef.current = new Audio(messageSoundURL);
    typingSoundRef.current = new Audio(typingSoundURL);
  }, []);

  const playMessageSound = () => {
    if (messageSoundRef.current) {
      messageSoundRef.current.play().catch((error) => console.error("Error playing message sound:", error));
    }
  };

  const playTypingSound = () => {
    if (typingSoundRef.current) {
      typingSoundRef.current.play().catch((error) => console.error("Error playing typing sound:", error));
    }
  };
  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || process.env.BASE_URL)
    setSocket(socketInstance)

    // Initialize audio
    // messageSoundRef.current = new Audio("https://www.fesliyanstudios.com/play-mp3/4380")

    // Show chatbot after 3 seconds
    const timer = setTimeout(() => {
      if(pathname === "/")
      {
      setIsOpen(true)
      }
    }, 3000)

    // Initial greeting and suggested questions
    const initialQuestions = chatbotData.slice(0, 3).map((item) => item.question)
    setSuggestedQuestions(initialQuestions)

    // Socket event listeners
    socketInstance.on("agent-message", (message: string) => {
      addMessage({
        id: Date.now().toString(),
        type: "agent",
        text: message,
      })
      playMessageSound()
    })

    socketInstance.on("agent-connected", () => {
      setAgentConnected(true)
      addMessage({
        id: Date.now().toString(),
        type: "agent",
        text: "Live agent connected. How can I help you today?",
      })
      playMessageSound()
    })

    socketInstance.on("agent-disconnected", () => {
      setAgentConnected(false)
      addMessage({
        id: Date.now().toString(),
        type: "bot",
        text: "The live agent has disconnected. You can continue chatting with our bot or request another live agent.",
      })
      setLiveAgentRequested(false)
      playMessageSound()
    })

    return () => {
      clearTimeout(timer)
      socketInstance.disconnect()
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

 

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
    // playMessageSound()
  }

  const simulateTyping = (text: string, type: "bot" | "agent" = "bot") => {
    const typingId = Date.now().toString()

    // Add typing indicator
    setMessages((prev) => [...prev, { id: typingId, type, text: "", isTyping: true }])
    setIsTyping(true)

    // Simulate typing delay (1-2 seconds based on message length)
    const typingDelay = Math.min(1000 + text.length * 10, 2000)
    playTypingSound();

    setTimeout(() => {
      // Remove typing indicator and add actual message
      setMessages((prev) => prev.filter((m) => m.id !== typingId))
      addMessage({ id: Date.now().toString(), type, text })
      setIsTyping(false)
      playMessageSound();
    }, typingDelay)
  }

  const handleQuestionClick = (question: string) => {
    // Add user question to messages
    addMessage({
      id: Date.now().toString(),
      type: "user",
      text: question,
    })

    // Find answer in chatbot data
    const chatbotItem = chatbotData.find((item) => item.question === question)

    if (chatbotItem) {
      // Simulate bot typing
      simulateTyping(chatbotItem.answer)

      // Update suggested questions (exclude the one just asked)
      const newSuggestions = chatbotData
        .filter((item) => item.question !== question)
        .slice(0, 3)
        .map((item) => item.question)

      setSuggestedQuestions(newSuggestions)
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    if (collectingUserInfo && currentUserInfoField) {
      // Handle user info collection
      setUserInfo((prev) => ({
        ...prev,
        [currentUserInfoField]: inputValue,
      }))

      addMessage({
        id: Date.now().toString(),
        type: "user",
        text: inputValue,
      })

      // Move to next field or complete collection
      const fields: (keyof UserInfo)[] = ["name", "email", "phone", "issue"]
      const currentIndex = fields.indexOf(currentUserInfoField)

      if (currentIndex < fields.length - 1) {
        // Move to next field
        const nextField = fields[currentIndex + 1]
        setCurrentUserInfoField(nextField)

        // Ask for next field
        let nextQuestion = ""
        switch (nextField) {
          case "email":
            nextQuestion = "Great! Now, what's your email address so we can reach out to you?"
            break
          case "phone":
            nextQuestion = "Thanks! Could you provide your phone number?"
            break
          case "issue":
            nextQuestion = "Finally, please briefly describe your concrete issue or project:"
            break
        }

        simulateTyping(nextQuestion)
      } else {
        // All fields collected
        setCollectingUserInfo(false)
        setCurrentUserInfoField(null)

        // Submit user info to backend
        fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((response) => response.json())
          .then(() => {
            simulateTyping(
              "Thank you for providing your information! Our team will contact you shortly to discuss your concrete repair needs.",
            )

            // Show toast notification
            toast({
              title: "Contact Request Submitted",
              description: "We'll get back to you as soon as possible!",
              duration: 5000,
            })
          })
          .catch((error) => {
            console.error("Error submitting contact info:", error)
            // simulateTyping(
            //   "I'm sorry, there was an error submitting your information. Please try again or call us directly at 720-555-1234.",
            // )
          })
      }
    } else if (liveAgentRequested && agentConnected) {
      // Send message to live agent
      addMessage({
        id: Date.now().toString(),
        type: "user",
        text: inputValue,
      })

      // Emit message to server
      socket.emit("client-message", {
        message: inputValue,
        userId: socket.id,
      })
    } else {
      // Regular chatbot interaction
      addMessage({
        id: Date.now().toString(),
        type: "user",
        text: inputValue,
      })

      // Check for keywords to trigger specific responses
      const lowerCaseInput = inputValue.toLowerCase()

      if (
        lowerCaseInput.includes("agent") ||
        lowerCaseInput.includes("human") ||
        lowerCaseInput.includes("person") ||
        lowerCaseInput.includes("representative")
      ) {
        handleLiveAgentRequest()
      } else if (
        lowerCaseInput.includes("contact") ||
        lowerCaseInput.includes("call me") ||
        lowerCaseInput.includes("reach out")
      ) {
        handleContactRequest()
      } else {
        // Try to find a matching question in chatbot data
        const matchingItem = chatbotData.find(
          (item) =>
            item.question.toLowerCase().includes(lowerCaseInput) ||
            lowerCaseInput.includes(item.question.toLowerCase()),
        )

        if (matchingItem) {
          simulateTyping(matchingItem.answer)
        } else {
          simulateTyping("I'm not sure I understand. Would you like to speak with a live agent or have us contact you?")
        }
      }
    }

    setInputValue("")
  }

  const handleContactRequest = () => {
    simulateTyping("I'd be happy to have someone contact you. To better assist you, I'll need some information.")

    setTimeout(() => {
      setCollectingUserInfo(true)
      setCurrentUserInfoField("name")
      simulateTyping("What's your name?")
    }, 2500)
  }

  const handleLiveAgentRequest = () => {
    // if (liveAgentRequested) {
    //   simulateTyping("We're already trying to connect you with a live agent. Please wait a moment.")
    //   return
    // }

    // setLiveAgentRequested(true)
    // simulateTyping("I'm connecting you with a live agent. This may take a moment...")
    simulateTyping("Our agents are busy now.Will contact you when they are free...")
    // Emit request to server
    // socket.emit("request-agent", { userId: socket.id })
  }

  const handleClose = () => {
    setIsOpen(false)

    // If connected to a live agent, disconnect
    if (agentConnected) {
      socket.emit("client-disconnect")
      setAgentConnected(false)
    }
  }
  const handleSubmitUserInfo = async () => {
    try {
      await axios.post(`${process.env.BASE_URL}/api/chat-user`, userInfo)
      simulateTyping(
        "Thank you for providing your information! Our team will contact you shortly to discuss your concrete repair needs. and will also send you a mail"
      )
      // toast({
      //   title: "Contact Request Submitted",
      //   description: "We'll get back to you as soon as possible!",
      //   duration: 5000,
      // })
    } catch (error) {
      console.error("Error submitting contact info:", error)
      simulateTyping(
        "I'm sorry, there was an error submitting your information. Please try again or call us directly at 720-555-1234."
      )
    }
  }

  useEffect(() => {
    if (!collectingUserInfo && userInfo.name && userInfo.email && userInfo.phone && userInfo.issue) {
      handleSubmitUserInfo()
    }
  }, [collectingUserInfo])
  if (!showChatbot) {
    return null
  }

  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button onClick={() => setIsOpen(true)} className="rounded-full h-14 w-14 shadow-lg">
          <MessageSquare className="h-6 w-6" />
        </Button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 max-h-[500px] flex flex-col">
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">How can we help?</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 text-white hover:bg-primary/80"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <p className="font-medium">Welcome to Repair my Concrete!</p>
                  <p className="text-sm mt-1">How can we help you today?</p>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">Select a question or ask your own:</p>
                  <button
                        onClick={handleContactRequest}
                        className="w-full text-left p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-200 mb-1 text-sm text-primary"
                      >
                        I'd like to be contacted by your team
                      </button>
                      <button
                        onClick={handleLiveAgentRequest}
                        className="w-full text-left p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-200 mb-1 text-sm text-primary"
                      >
                        Connect me with a live agent
                      </button>
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(question)}
                      className="w-full text-left p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 mb-2 text-sm"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-primary text-white"
                          : message.type === "agent"
                            ? "bg-blue-100 text-gray-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.isTyping ? (
                        <div className="flex space-x-1 items-center h-6">
                          <div
                            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      ) : (
                        <p>{message.text}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Suggested follow-up questions */}
                {!isTyping &&
                  !collectingUserInfo &&
                  !agentConnected &&
                  messages.length > 0 &&
                  messages[messages.length - 1].type === "bot" && (
                    <div className="space-y-2 mt-4">
                      <p className="text-gray-600 text-xs">You might also want to know:</p>
                      <button
                        onClick={handleContactRequest}
                        className="w-full text-left p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-200 mb-1 text-sm text-primary"
                      >
                        I'd like to be contacted by your team
                      </button>
                      <button
                        onClick={handleLiveAgentRequest}
                        className="w-full text-left p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors duration-200 mb-1 text-sm text-primary"
                      >
                        Connect me with a live agent
                      </button>
                      {suggestedQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuestionClick(question)}
                          className="w-full text-left p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 mb-1 text-sm"
                        >
                          {question}
                        </button>
                      ))}
                      
                    </div>
                  )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <div className="border-t p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center space-x-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  collectingUserInfo
                    ? `Enter your ${currentUserInfoField}...`
                    : agentConnected
                      ? "Chat with live agent..."
                      : "Type your message..."
                }
                className="flex-1"
                disabled={isTyping}
              />
              <Button type="submit" size="icon" disabled={isTyping || !inputValue.trim()} className="h-10 w-10">
                {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

