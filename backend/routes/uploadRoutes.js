import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// Configure Multer for file upload and specify the destination folder for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  // Define the filename for the uploaded file
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

// Define a file filter for allowed file types and MIME types
const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  // Check if the file type and MIME type are allowed
  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Images only'), false);
  }
};

// Create Multer middleware with the configured storage and file filter
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

// Route for handling image uploads
router.post('/', (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: 'No image file provided' });
    }
  });
});

export default router;
