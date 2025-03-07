const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(`📡 Connecting to MongoDB at: ${process.env.MONGO_URI}`);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}:${conn.connection.port} (${conn.connection.name})`);

    // Listen for disconnect event
    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB Disconnected");
    });

  } catch (error) {
    console.error("❌ Error connecting to DB:", error.message);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔌 MongoDB Connection Closed (App Terminated)");
  process.exit(0);
});

module.exports = connectDB;
