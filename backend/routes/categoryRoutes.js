import express from 'express';
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from '../controllers/categoryController.js';

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

//here we make sure that the user is authrized and an admin to get access to the route.
router.route('/').post(authenticate, authorizeAdmin, createCategory);
router.route('/:categoryId').put(authenticate, authorizeAdmin, updateCategory);
router
  .route('/:categoryId')
  .delete(authenticate, authorizeAdmin, removeCategory);

router.route('/categories').get(listCategory);

router.route('/:id').get(readCategory);
export default router;
