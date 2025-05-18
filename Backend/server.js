import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import connectDB from './Config/Mongodb.js'
import connectCloudinary from './Config/Cloudinary.js'
import adminRouter from './Routes/adminRoutes.js'
import doctorRouter from './Routes/doctorRoutes.js'
import { userRouter } from './Routes/userRoutes.js'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
    'https://doctor-appointment-website-admin-02z3.onrender.com',
    'http://localhost:3000' // For local development
  ],
  credentials: true
}))
app.use(express.json())

// health checks
app.get('/', (req, res) => res.send('Server is running!'))
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// Serve React build files
app.use(express.static(path.join(__dirname, '../Frontend/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/build', 'index.html'))
})

// Test DB connection
app.get('/api/test-db', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray()

    const TestModel = mongoose.model('TestModel', new mongoose.Schema({
      name: String,
      timestamp: { type: Date, default: Date.now }
    }))

    await TestModel.create({ name: 'test-' + Date.now() })
    const count = await TestModel.countDocuments()

    res.json({
      success: true,
      message: 'Database connection successful',
      collections: collections.map(c => c.name),
      testDocuments: count
    })
  } catch (error) {
    console.error('Database test error:', error)
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    })
  }
})

// API routes
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// Optional export for serverless environments
export default app
