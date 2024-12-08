const express = require('express');
const multer = require('multer');
const { PythonShell } = require('python-shell');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    
    // Ensure uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB file size limit
});

// Utility function to run Python scripts
const runPythonScript = (scriptPath, args) => {
  return new Promise((resolve, reject) => {
    PythonShell.run(scriptPath, { args: args }, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Endpoint for Static Data Model
app.post('/api/static-data-model', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;

    try {
      const results = await runPythonScript('./models/static_data_analysis.py', [filePath]);
      
      // Clean up the uploaded file
      fs.unlinkSync(filePath);

      res.json({
        message: 'Static data analysis completed',
        results: results
      });
    } catch (modelError) {
      // Remove file if model processing fails
      fs.unlinkSync(filePath);
      res.status(500).json({ error: 'Model processing failed', details: modelError.toString() });
    }
  } catch (error) {
    res.status(500).json({ error: 'File upload and processing failed', details: error.toString() });
  }
});

// Endpoint for Infrastructure Age Model
app.post('/api/infrastructure-age-model', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;

    try {
      const results = await runPythonScript('./models/infrastructure_age_prediction.py', [filePath]);
      
      // Clean up the uploaded file
      fs.unlinkSync(filePath);

      res.json({
        message: 'Infrastructure age prediction completed',
        results: results
      });
    } catch (modelError) {
      // Remove file if model processing fails
      fs.unlinkSync(filePath);
      res.status(500).json({ error: 'Model processing failed', details: modelError.toString() });
    }
  } catch (error) {
    res.status(500).json({ error: 'File upload and processing failed', details: error.toString() });
  }
});

// Endpoint for Infrastructure Image Model
app.post('/api/infrastructure-image-model', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const filePath = req.file.path;

    try {
      const results = await runPythonScript('./models/infrastructure_condition_analysis.py', [filePath]);
      
      // Clean up the uploaded file
      fs.unlinkSync(filePath);

      res.json({
        message: 'Infrastructure condition analysis completed',
        results: results
      });
    } catch (modelError) {
      // Remove file if model processing fails
      fs.unlinkSync(filePath);
      res.status(500).json({ error: 'Model processing failed', details: modelError.toString() });
    }
  } catch (error) {
    res.status(500).json({ error: 'Image upload and processing failed', details: error.toString() });
  }
});

// Endpoint for Lab Facilities Model
app.post('/api/lab-facilities-model', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;

    try {
      const results = await runPythonScript('./models/lab_facilities_assessment.py', [filePath]);
      
      // Clean up the uploaded file
      fs.unlinkSync(filePath);

      res.json({
        message: 'Lab facilities assessment completed',
        results: results
      });
    } catch (modelError) {
      // Remove file if model processing fails
      fs.unlinkSync(filePath);
      res.status(500).json({ error: 'Model processing failed', details: modelError.toString() });
    }
  } catch (error) {
    res.status(500).json({ error: 'File upload and processing failed', details: error.toString() });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  process.exit(0);
});