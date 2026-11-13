const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure Multer Storage for PDFs
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the uploads folder
  },
  filename: (req, file, cb) => {
    // Give the file a unique timestamp prefix to prevent name collisions
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter to allow ONLY PDF files
const fileFilter = (req, file, cb) => {
  if (path.extname(file.originalname).toLowerCase() === '.pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only .pdf files are allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// POST Route for Uploading PDF
router.post('/upload', upload.single('pdfFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a valid PDF file.' });
    }

    console.log('File uploaded successfully:', req.file.filename);

    res.status(200).json({
      message: 'PDF uploaded successfully!',
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;