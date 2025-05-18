import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import connectDB from './Config/Mongodb.js';
import connectCloudinary from './Config/Cloudinary.js';
import adminRouter from './Routes/adminRoutes.js';
import doctorRouter from './Routes/doctorRoutes.js';
import { userRouter } from './Routes/userRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 10000;

connectDB().catch(err => console.error("DB connection error:", err));
connectCloudinary().catch(err => console.error("Cloudinary error:", err));

// CORS setup
app.use(cors({
  origin: [
    'https://doctor-appointment-website-1-gnjq.onrender.com',
    'https://doctor-appointment-website-admin-02z3.onrender.com',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

// Serve frontend
app.use(express.static(path.join(__dirname, '../Frontend/build')));
app.get('/:catchAll(*)', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
