import express from 'express';
import { createWholesaleEnquiry, getWholesaleEnquiries } from '../controllers/wholesaleController.js';

const router = express.Router();

router.post('/', createWholesaleEnquiry);
router.get('/', getWholesaleEnquiries);

export default router;

