const multer = require('multer');
const path = require('path');
const mime = require('mime');

// Define the middleware function
const uploadMiddleware = () => {
  const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, './client/public/images/'); // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5 MB file size limit
    },
    fileFilter: (req, file, cb) => {
      // Check if the uploaded file is one of the allowed types
      const allowedTypes = ['pdf', 'jpeg', 'jpg', 'png'];
      const fileExt = mime.getExtension(file.mimetype);

      if (allowedTypes.includes(fileExt)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only PDF, JPEG, JPG, and PNG are allowed.'));
      }
    },
  });

  // Return the actual middleware function
  return (req, res, next) => {
    upload.single('file')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Multer error (e.g., file size exceeded)
        return res.status(400).json({ error: 'File upload error', message: err.message });
      } else if (err) {
        // Other unexpected errors
        return res.status(500).json({ error: 'Internal server error', message: err.message });
      }

      // If no errors occurred, proceed to the next middleware/route handler
      next();
    });
  };
};

module.exports = uploadMiddleware;
