import 'dotenv/config';
import express from 'express';
import { authRoutes, userRoutes } from './routes/index.js';
import { buildCors, errorHandler } from './middlewares/index.js';
import { errorResponse, successResponse } from './utils/response.js';

/**
 * Express application setup
 */
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(buildCors());

// Auth Routes
app.use('/', authRoutes);

// User Routes
app.use('/users', userRoutes);

// Test endpoint
app.get('/test', (req, res) => {
  return successResponse(res, 'Server is running');
});

// 404 handler
app.use((req, res) => {
  return errorResponse(res, 'Route not found', 404);
});

// Global error handler
app.use(errorHandler);

export default app;
