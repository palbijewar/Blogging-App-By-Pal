import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/users.routes.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());

// Server-side CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

mongoose.connect(`${process.env.MONGODB_URL}`).then(() => console.log(`Database connected!`)).catch((error) => console.log(error));

app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port: ${process.env.PORT || 3001}`);
});