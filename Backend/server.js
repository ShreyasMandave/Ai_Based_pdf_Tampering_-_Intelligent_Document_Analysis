const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const pdfRoutes = require('./routes/pdfRoutes'); // Import routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register API Routes
app.use('/api/pdf', pdfRoutes);

// Database Connection (MongoDB)
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/veripdf';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('Database connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('VeriPDF MERN Backend is running successfully!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});