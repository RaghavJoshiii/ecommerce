import express from 'express';
import { getProducts, createProduct, searchProducts,updateProduct } from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Search route MUST go first
router.get('/search', searchProducts);

// Standard routes
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.route('/:id')
  .put(protect, admin, updateProduct);
export default router;