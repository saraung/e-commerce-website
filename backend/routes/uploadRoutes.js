import express from 'express';
import multer from 'multer';
import { ImgurClient } from 'imgur';
import path from 'path';

const router = express.Router();

// Configure multer to handle file uploads
const storage = multer.memoryStorage(); // Use memory storage for direct upload to Imgur
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  },
});

// Instantiate the Imgur client with your Client ID
const client = new ImgurClient({ clientId: process.env.IMGUR_CLIENT_ID });

// Endpoint to upload an image
// Endpoint to upload an image
router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send({ msg: 'No file uploaded' });
    }
  
    try {
        // Upload image to Imgur
        const response = await client.upload({
          image: req.file.buffer.toString('base64'), // Convert buffer to base64
          type: 'base64', // Set the type to base64
        });
      
        // Log the response for debugging
        console.log(response);
      
        if (response.data && response.data.link) {
          const imageUrl = response.data.link;
          console.log(imageUrl);
          res.status(200).send({
            msg: 'Image uploaded successfully',
            imageUrl,
          });
        } else {
          res.status(500).send({ msg: 'No link found in response' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Failed to upload image to Imgur', error: error.message });
      }
      
    })

export default router;
