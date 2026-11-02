import express from 'express';
import { createOrderIntent, getOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrderIntent);
router.get('/', getOrders);

export default router;

