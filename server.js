// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'public/images')));


// Routes
app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start server after DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error("Error connecting to MongoDB:", err));
