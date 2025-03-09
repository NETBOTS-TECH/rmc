const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const allowedOrigins = [
  "https://repairmyconcrete.com",
  "http://localhost:3000",  // For local development
  "http://82.29.179.48:3000"
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);  // Allow only defined origins
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// ✅ Use only one CORS setup
app.use(cors(corsOptions));
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
