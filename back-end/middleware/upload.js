const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define and create uploads folder if not exist
const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('✅ Uploads folder created at:', uploadDir);
} else {
  console.log('✅ Uploads folder already exists at:', uploadDir);
}

// Multer storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('📥 Saving file to:', uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    console.log('📝 Generated filename:', uniqueName);
    cb(null, uniqueName);
  }
});

// File filter: Only allow JPG, PNG, and PDF
function fileFilter(req, file, cb) {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    console.log('✅ File type allowed:', file.mimetype);
    cb(null, true);
  } else {
    console.error('❌ Invalid file type:', file.mimetype);
    cb(new Error('Only JPG, PNG, and PDF files are allowed.'));
  }
}

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit (optional)
  }
});

module.exports = upload;
