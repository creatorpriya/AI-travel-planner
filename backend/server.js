require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const aiRoutes = require("./routes/aiRoutes");

connectDB();

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-travel-planner-4ewl.vercel.app",
      "https://ai-travel-planner-4ewl-6c98vsedb-priya-kumari.vercel.app"
    ],
    credentials: true
  })
);

// Root Route
app.get("/", (req, res) => {
  res.send("AI Travel Planner API Running 🚀");
});

// Test Route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API working"
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/ai", aiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Server Error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});