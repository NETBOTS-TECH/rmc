const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://repairmyconcrete.com",
    "http://localhost:3000",  // For local development
    "http://82.29.179.48:3000"
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/auth", require("./routes/authRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/estimates", require("./routes/estimateRoutes"));
app.use("/api/contacts", require('./routes/contactRoutes'))
app.use("/api/gallery", require("./routes/galleryRoutes"))
app.use("/api/chat-user", require("./routes/chatRoutes"))
app.use("/api/blogs", require("./routes/blogRoutes"))
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
