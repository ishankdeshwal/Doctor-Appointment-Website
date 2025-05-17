import express from 'express';
import upload from '../Middlewares/multer.js';  // Check this path
import { addDoctor, adminDashboard, allDoctors, appointmentCancelled, appointmentsAdmin, loginAdmin } from '../Controllers/adminController.js';  // Check this path
import { changeAvailability } from '../Controllers/DoctorController.js';  // Check this path
import AuthAdmin from '../Middlewares/AuthAdmin.js';




const adminRouter=express.Router()

adminRouter.post('/add-doctor',AuthAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',AuthAdmin,allDoctors)
adminRouter.post('/change-availability',AuthAdmin,changeAvailability)
adminRouter.get('/appointments',AuthAdmin,appointmentsAdmin)
adminRouter.post('/appointmentCancelled',AuthAdmin,appointmentCancelled)
adminRouter.get('/dashboard',AuthAdmin,adminDashboard)
export default adminRouter

