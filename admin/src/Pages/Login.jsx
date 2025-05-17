import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../Contexts/AdminContext";
import axios from 'axios';
import { toast } from "react-toastify";
import { DoctorContext } from "../Contexts/DoctorContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { aToken, setAToken, backendurl } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  
  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendurl + '/api/admin/login', { email, password });
        console.log("Admin login response:", data);
        
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success("Admin login successful");
          navigate('/admin-dashboard');
        } else {
          toast.error(data.message || "Login failed");
        }
      } else {
        const { data } = await axios.post(backendurl + '/api/doctor/login', { email, password });
        console.log("Doctor login response:", data);
        
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
          toast.success("Doctor login successful");
          navigate('/doctor-dashboard');
        } else {
          toast.error(data.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || error.message || "Login failed");
    }
  };
  
  // Check if already logged in
  useEffect(() => {
    if (aToken) {
      navigate('/admin-dashboard');
    } else if (dToken) {
      navigate('/doctor-dashboard');
    }
  }, [aToken, dToken, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-center p-8 md:min-w-[420px] min-w-[350px] border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto w-full text-center">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className="border w-full border-[#DADADA] rounded w-full p-2 mt-1" 
            type="email" 
            required 
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className="border w-full border-[#DADADA] rounded w-full p-2 mt-1" 
            type="password" 
            required
          />
        </div>
        <button 
          type="submit"
          className="bg-primary rounded-md text-base text-white w-full py-2 px-4"
        >
          Login
        </button>
        {
          state === 'Admin' ?
          <p>Doctor Login? <span className="text-primary underline cursor-pointer" onClick={() => setState('Doctor')}>Click Here</span></p>
          :
          <p>Admin Login? <span className="text-primary underline cursor-pointer" onClick={() => setState('Admin')}>Click Here</span></p>
        }
      </div>
    </form>
  );
}

export default Login;

