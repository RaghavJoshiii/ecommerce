import express from 'express';
import { addOrderItems } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Only logged-in consumers can create an order
router.route('/').post(protect, addOrderItems); 

export default router;