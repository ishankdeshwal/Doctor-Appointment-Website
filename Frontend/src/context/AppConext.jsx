import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendurl =
   'https://doctor-appointment-website-vf6c.onrender.com' ;
  const [doctors, setDoctors] = useState([]);
  const getStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    // Check if token is valid (not null, undefined, or "null" string)
    if (storedToken && storedToken !== "undefined" && storedToken !== "null") {
      console.log("Valid token found in storage");
      return storedToken;
    }
    console.log("No valid token in storage");
    // Clean up invalid tokens
    localStorage.removeItem('token');
    return false;
  };

  // Use the function to initialize token state
  const [token, setToken] = useState(getStoredToken());

  // Add a token validator function
  const validateToken = (newToken) => {
    console.log("Validating token:", newToken);
    if (newToken && newToken !== "undefined" && newToken !== "null") {
      console.log("Token is valid");
      localStorage.setItem('token', newToken);
      setToken(newToken);
      return true;
    }
    console.log("Token is invalid");
    localStorage.removeItem('token');
    setToken(false);
    return false;
  };

  const [userData, setUserData] = useState(false);
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



  const contextValue = {
    currencySymbol,
    backendurl,
    doctors,
    setDoctors,
    token,
    setToken: validateToken, // Replace direct setter with validator
    userData,
    setUserData,
    getDoctorsData,
    loadUserProfile,
    bookAppointment
  };




  useEffect(() => {
    getDoctorsData();
  }, [getDoctorsData]);



  useEffect(()=>{
if(token){
  loadUserProfile()
}else{
  setUserData()
}
  },[token])


  return (
    <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

