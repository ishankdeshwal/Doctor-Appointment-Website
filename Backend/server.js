import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import connectDB from './Config/Mongodb.js'
import connectCloudinary from './Config/Cloudinary.js'
import adminRouter from './Routes/adminRoutes.js'
import doctorRouter from './Routes/doctorRoutes.js'
import {userRouter} from './Routes/userRoutes.js'

// app config
const app = express()
const port = process.env.PORT || 4000

// Connect to services - but don't wait for them
connectDB().catch(err => console.error("DB connection error:", err))
connectCloudinary().catch(err => console.error("Cloudinary connection error:", err))

// middlewares
app.use(cors({
  origin: [
    'https://doctor-appointment-website-ex4a.vercel.app',
    'https://doctor-appointment-website-6tda.vercel.app'
  ],
  credentials: true
}))
app.use(express.json())

// Add a simple health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

// endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

// Only start the server if not in Vercel serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

// For Vercel serverless functions
export default app

