const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Serve static files from 'public' so uploaded files can be accessed
app.use(express.static('public'));

// Configure storage (save files directly in 'public' folder)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/'); // Save files in 'public/' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// API Route for File Upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Generate the public URL of the uploaded file
  const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
  
  return res.json({ url: fileUrl });
});

// Start the Server
app.listen(3000, () => console.log('Server running on port 3000'));
