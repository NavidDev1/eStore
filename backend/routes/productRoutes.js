import express from 'express';
import formidable from 'express-formidable';
const router = express.Router();

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';
//controllers
import {
  addProduct,
  removeProduct,
  updateProductDetails,
  fetchProducts,
  fetchProductById,
  addProductReview,
  fetchAllProducts,
  fetchTopProducts,
  fetchNewProducts,
} from '../controllers/productController.js';
router
  .route('/')
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route('/allproducts').get(fetchAllProducts);
router.route('/:id/reviews').post(authenticate, checkId, addProductReview);

//Rated as top products
router.route('/top').get(fetchTopProducts);
router.route('/new').get(fetchNewProducts);

router
  .route('/:id')
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
