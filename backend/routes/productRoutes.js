import express from 'express';
import formidable from 'express-formidable';
const router = express.Router();

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

//controllers
import { addProduct } from '../controllers/productController.js';
import { updateProductDetails } from '../controllers/productController.js';

router.route('/').post(authenticate, authorizeAdmin, formidable(), addProduct);
router
  .route('/:id')
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails);
export default router;
