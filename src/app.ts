import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from '@routes/event.routes';
import bookingRoutes from '@routes/booking.routes';
import { errorHandler, notFoundHandler } from '@middlewares/error.handler';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

