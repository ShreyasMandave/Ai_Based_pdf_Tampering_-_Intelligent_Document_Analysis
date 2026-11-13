const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  tamperingScore: {
    type: Number,
    default: 0 // Will store your AI risk probability score later
  },
  status: {
    type: String,
    default: 'Pending Analysis'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);