import express from 'express'
import { appointmentDoctor, cancelAppointment, completeAppointment, doctorDashboard, doctorList, doctorLogin, doctorProfile, updateDoctorProfile } from '../Controllers/DoctorController.js'
import authDoctor from '../Middlewares/authDoctor.js'


const doctorRouter=express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',doctorLogin)
doctorRouter.get('/appointments',authDoctor,appointmentDoctor)
doctorRouter.post('/complete-appointment',authDoctor,completeAppointment)
doctorRouter.post('/cancel-appointment',authDoctor,cancelAppointment)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)
export default doctorRouter