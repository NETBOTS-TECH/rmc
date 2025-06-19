const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors"); // ✅ Add this line
const { Server } = require("socket.io");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ Allow requests from your frontend
app.use(cors({
  origin: "http://localhost:3000", // replace with your frontend URL in production
  credentials: true
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // ✅ Also allow socket.io CORS
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
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
let agents = {};
let clients = {};
let clientAgentPairs = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("register-client", (clientId) => {
    clients[socket.id] = clientId;
    console.log(`Client Registered: ${clientId}`);
    io.emit("update-clients", Object.values(clients));
  });

  socket.on("register-agent", (agentId) => {
    agents[socket.id] = agentId;
    console.log(`Agent Registered: ${agentId}`);
    io.emit("update-agents", Object.values(agents));
  });

  socket.on("request-live-agent", ({ userId }) => {
    const clientId = clients[socket.id] || userId;
    if (!clientId) return;

    const availableAgentSocketId = Object.keys(agents).find(
      (socketId) => !Object.values(clientAgentPairs).includes(agents[socketId])
    );

    if (availableAgentSocketId) {
      const agentId = agents[availableAgentSocketId];
      clientAgentPairs[clientId] = agentId;

      io.to(availableAgentSocketId).emit("client-assigned", { clientId });
      io.to(socket.id).emit("agent-connected");
      io.to(socket.id).emit("agent-response", { assigned: true });
      console.log(`Assigned Agent ${agentId} to Client ${clientId}`);
    } else {
      io.to(socket.id).emit("agent-response", { assigned: false });
      console.log(`No available agents for Client ${clientId}`);
    }
  });

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

  socket.on("agent-message", ({ agentId, message }) => {
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

  socket.on("disconnect", () => {
    if (agents[socket.id]) {
      const agentId = agents[socket.id];
      console.log(`Agent disconnected: ${agentId}`);

      Object.keys(clientAgentPairs).forEach(clientId => {
        if (clientAgentPairs[clientId] === agentId) {
          delete clientAgentPairs[clientId];
          const clientSocket = Object.keys(clients).find(
            (socketId) => clients[socketId] === clientId
          );
          if (clientSocket) {
            io.to(clientSocket).emit("agent-disconnected");
          }
        }
      });

      delete agents[socket.id];
      io.emit("update-agents", Object.values(agents));
    } else if (clients[socket.id]) {
      const clientId = clients[socket.id];
      console.log(`Client disconnected: ${clientId}`);
      delete clientAgentPairs[clientId];
      delete clients[socket.id];
      io.emit("update-clients", Object.values(clients));
    }
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
