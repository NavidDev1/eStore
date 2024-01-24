import express from 'express';
import formidable from 'express-formidable';
const router = express.Router();

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

//controllers
import {
  addProduct,
  removeProduct,
  updateProductDetails,
  fetchProducts,
} from '../controllers/productController.js';
router
  .route('/')
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router
  .route('/:id')
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
