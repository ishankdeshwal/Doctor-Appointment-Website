import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import connectDB from './Config/Mongodb.js'
import connectCloudinary from './Config/Cloudinary.js'
import adminRouter from './Routes/adminRoutes.js'
import doctorRouter from './Routes/doctorRoutes.js'
import { userRouter } from './Routes/userRoutes.js'

// app config
const app = express()
const port = process.env.PORT || 10000

// Connect to services
connectDB().catch(err => console.error("DB connection error:", err))
connectCloudinary().catch(err => console.error("Cloudinary connection error:", err))

// middlewares
app.use(cors({
  origin: [
    'https://doctor-appointment-website-1-gnjq.onrender.com',
    'https://doctor-appointment-website-admin-02z3.onrender.com'
  ],
  credentials: true
}))
app.use(express.json())

// health checks
app.get('/', (req, res) => res.send('Server is running!'))
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// routes
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

// ✅ Always start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// Optional export (not needed unless using serverless functions)
export default app

