require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const aiRoutes = require("./routes/aiRoutes");

connectDB();

const app = express();

// CORS
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

// Handle preflight requests
app.options("*", cors());

// Body parser
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("AI Travel Planner API Running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/ai", aiRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Server Error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});