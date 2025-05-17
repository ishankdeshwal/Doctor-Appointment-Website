import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import connectDB from './Config/Mongodb.js'
import connectCloudinary from './Config/Cloudinary.js'
import adminRouter from './Routes/adminRoutes.js'
import doctorRouter from './Routes/doctorRoutes.js'
import  {userRouter}  from './Routes/userRoutes.js'

// app config

const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()
// middlewares

app.use(cors())
app.use(express.json())

// endpoints

app.use('/api/admin',adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user',userRouter)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})


