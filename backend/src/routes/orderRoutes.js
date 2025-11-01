import express from 'express';
import { createOrder, getAllOrders } from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getAllOrders);

export default router;

