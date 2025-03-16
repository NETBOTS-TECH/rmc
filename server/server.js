const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

// Middleware
// app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/estimates", require("./routes/estimateRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/chat-user", require("./routes/chatRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// 🟢 WebSocket Logic
let agents = {}; // { socketId: agentId }
let clients = {}; // { socketId: clientId }
let clientAgentPairs = {}; // { clientId: agentId }

// 🔹 Handle user connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // ✅ Register Clients
  socket.on("register-client", (clientId) => {
    clients[socket.id] = clientId;
    console.log(`Client Registered: ${clientId}`);
    io.emit("update-clients", Object.values(clients)); // Notify agents
  });

  // ✅ Register Agents
  socket.on("register-agent", (agentId) => {
    agents[socket.id] = agentId;
    console.log(`Agent Registered: ${agentId}`);
    io.emit("update-agents", Object.values(agents)); // Notify clients
  });

  // ✅ Handle Client Requesting Live Agent
  socket.on("request-live-agent", ({ userId }) => {
    const clientId = clients[socket.id] || userId;
    if (!clientId) return;
  
    // Find an available agent
    const availableAgentSocketId = Object.keys(agents).find(
      (socketId) => !Object.values(clientAgentPairs).includes(agents[socketId])
    );
  
    if (availableAgentSocketId) {
      const agentId = agents[availableAgentSocketId];
      clientAgentPairs[clientId] = agentId;
      
      // Notify both parties
      io.to(availableAgentSocketId).emit("client-assigned", { clientId });
      io.to(socket.id).emit("agent-connected");
      
      // Send response to client
      io.to(socket.id).emit("agent-response", { assigned: true });
      console.log(`Assigned Agent ${agentId} to Client ${clientId}`);
    } else {
      io.to(socket.id).emit("agent-response", { assigned: false });
      console.log(`No available agents for Client ${clientId}`);
    }
  });

  // ✅ Handle User Messages (Client → Agent)
  socket.on("client-message", ({ message, userId }) => {
    const clientId = clients[socket.id] || userId;
    const agentId = clientAgentPairs[clientId];
    
    if (agentId) {
      const agentSocketId = Object.keys(agents).find(
        (socketId) => agents[socketId] === agentId
      );
      if (agentSocketId) {
        io.to(agentSocketId).emit("receive-message", { 
          sender: clientId, 
          message, 
          chatId: clientId 
        });
      }
    }
  });
  // ✅ Handle Agent Messages (Agent → Client)
  socket.on("agent-message", ({ agentId, message }) => {
    // Find the client associated with this agent
    const clientId = Object.keys(clientAgentPairs).find(
      (cId) => clientAgentPairs[cId] === agentId
    );
    
    if (clientId) {
      const clientSocketId = Object.keys(clients).find(
        (socketId) => clients[socketId] === clientId
      );
      if (clientSocketId) {
        io.to(clientSocketId).emit("agent-message", message);
      }
    }
  });
  // ✅ Handle Disconnection
  socket.on("disconnect", () => {
    if (agents[socket.id]) {
      const agentId = agents[socket.id];
      console.log(`Agent disconnected: ${agentId}`);
      
      // Remove agent from all pairings
      Object.keys(clientAgentPairs).forEach(clientId => {
        if (clientAgentPairs[clientId] === agentId) {
          delete clientAgentPairs[clientId];
          // Notify the client that their agent has disconnected
          const clientSocket = Object.keys(clients).find((socketId) => clients[socketId] === clientId);
          if (clientSocket) {
            io.to(clientSocket).emit("agent-disconnected");
          }
        }
      });

      delete agents[socket.id];
      io.emit("update-agents", Object.values(agents)); // Notify clients
    } else if (clients[socket.id]) {
      const clientId = clients[socket.id];
      console.log(`Client disconnected: ${clientId}`);

      // Remove client from all pairings
      delete clientAgentPairs[clientId];

      delete clients[socket.id];
      io.emit("update-clients", Object.values(clients)); // Notify agents
    }
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
