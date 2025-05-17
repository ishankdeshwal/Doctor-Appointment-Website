import express from 'express';
import upload from '../Middlewares/multer.js';
import { addDoctor, adminDashboard, allDoctors, appointmentCancelled, appointmentsAdmin, loginAdmin } from '../Controllers/adminController.js';
import authAdmin from '../Middlewares/authAdmin.js';
import { changeAvailability } from '../Controllers/DoctorController.js';



const adminRouter=express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/appointmentCancelled',authAdmin,appointmentCancelled)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
export default adminRouter