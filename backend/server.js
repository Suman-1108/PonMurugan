import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import productRoutes from './routes/productRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import wholesaleRoutes from './routes/wholesaleRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'PON MURUGAN Fireworks API Server',
    location: config.store.city,
    time: new Date().toISOString()
  });
});

// Category Route Alias
import { getCategories } from './controllers/productController.js';
app.get('/api/categories', getCategories);

// Mount API routes
app.use('/api/products', productRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/wholesale-enquiries', wholesaleRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🎆 PON MURUGAN Fireworks API running on port ${PORT} [${config.nodeEnv}]`);
  console.log(`📍 Sivakasi Headquarters: +91 ${config.store.phone}`);
});

