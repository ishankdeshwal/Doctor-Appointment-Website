import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendurl = 'https://doctor-appointment-website-vf6c.onrender.com';
  const [doctors, setDoctors] = useState([]);
  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
  const [userData,setUserData]=useState(false);
  const navigate = useNavigate();
  
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const loadUserProfile=async()=>{
    if (!token) {
      setUserData(false);
      return;
    }
    try {
      const {data}=await axios.get(backendurl+'/api/user/get-profile',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if(data.success){
        setUserData(data.userData)
      }else{
        if (data.message !== 'Invalid Token') {
        toast.error(data.message)
        }
        setUserData(false)
      }
    } catch (error) {
      if (error.response?.data?.message !== 'Invalid Token') {
      toast.error(error.message)
    }
      setUserData(false)
    }
  }

const bookAppointment=async()=>{
  if(!token){
    toast.warn('Login To book Appointment')
    return navigate('/login')
  }
}



  const value = {
    doctors,getDoctorsData,
    currencySymbol,
    token,setToken
    ,backendurl
    ,userData,setUserData,loadUserProfile
  };




  useEffect(() => {
    getDoctorsData();
  }, []);



  useEffect(()=>{
if(token){
  loadUserProfile()
}else{
  setUserData()
}
  },[token])


  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

