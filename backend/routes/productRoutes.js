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
  fetchProductById,
  fetchAllProducts,
} from '../controllers/productController.js';
router
  .route('/')
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route('/allproducts').get(fetchAllProducts);

router
  .route('/:id')
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
