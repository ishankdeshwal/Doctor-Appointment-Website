import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const AdminContext = createContext()
const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors,setDoctors]=useState([])
    const [appointment,setAppointment]=useState([])
    const [dashData,setDashData]=useState(false)
    const backendurl = 'https://doctor-appointment-website-vf6c.onrender.com';
    
    const getAllDoctors=async()=>{
        try {

            const {data}=await axios.post(backendurl+'/api/admin/all-doctors',{},{headers:{aToken}} )
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const changeAvailability=async(docId)=>{

        try {
            const{data}=await axios.post(backendurl+'/api/admin/change-availability',{docId},{headers:{aToken}})
            if(data.success){
               
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getAllAppointments=async()=>{
        try {
            const {data}=await axios.get(backendurl+'/api/admin/appointments',{headers:{aToken}})
            if(data.success){
                setAppointment(data.appointments)
                console.log(appointment);
            }else{
                console.log(data.message);
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const cancelAppointment=async(appointmentId)=>{
        try {
         const{data}=await axios.post(backendurl+'/api/admin/appointmentCancelled',{appointmentId},{headers:{aToken}})
         if(data.success){
            toast.success(data.message)
            dashboardData()
            getAllAppointments()
         }else{
            toast.error(data.message)
         }
        } catch (error) {
             console.log(error);
            toast.error(error.message)
        }
    }
    const dashboardData=async()=>{
        try {
            const {data}=await axios.get(backendurl+'/api/admin/dashboard',{headers:{aToken}})
            if(data.success){
                setDashData(data.dashData)

                console.log(data.dashData);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const value = {
        aToken,
        setAToken,
        backendurl,
        doctors,getAllDoctors,changeAvailability,
        appointment,getAllAppointments,setAppointment,
        cancelAppointment,dashboardData,dashData,setDashData
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
} 
export default AdminContextProvider