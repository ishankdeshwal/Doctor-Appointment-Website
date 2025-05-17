import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, paymentRazorPay, registerUser, updateProfile, verifyRazorPay } from '../Controllers/UserController.js'
import AuthUser from '../Middlewares/AuthUser.js'
import upload from '../Middlewares/multer.js'

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',AuthUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),AuthUser,updateProfile)
userRouter.post('/book-appointment',AuthUser,bookAppointment)
userRouter.get('/list-appointments',AuthUser,listAppointment)
userRouter.post('/cancel-appointment',AuthUser,cancelAppointment)
userRouter.post('/payment-razorpay',AuthUser,paymentRazorPay)
userRouter.post('/verify-razorpay',AuthUser,verifyRazorPay)
export {userRouter}

