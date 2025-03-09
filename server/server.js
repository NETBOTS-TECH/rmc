const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const allowedOrigins = [
  "https://repairmyconcrete.com",
  "http://localhost:3000",   // Local development
  "http://82.29.179.48:3000"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS for all routes
app.use(cors(corsOptions));
app.options("/api/services", cors(corsOptions));
app.options("/api/estimates", cors(corsOptions));
app.options("/api/contacts", cors(corsOptions));
app.options("/api/gallery", cors(corsOptions));
app.options("/api/chat-user", cors(corsOptions));
app.options("/api/blogs", cors(corsOptions));
app.options("/auth", cors(corsOptions));

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
