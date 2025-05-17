import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppConext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Login() {
  const {backendurl,token,setToken}=useContext(AppContext)
  const navigate=useNavigate();
  const [state,setState]=useState('Sign Up');
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')
  const onSubmitHandler=async (e) => {
    e.preventDefault();
    try {
      if(state=='Sign Up'){
        const {data}=await axios.post(backendurl+'/api/user/register',{name,password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }else{
        const {data}=await axios.post(backendurl+'/api/user/login',{password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
  if(token){
    navigate('/')
  }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex item-center'>
        <div className='flex p-12 flex-col gap-3 m-auto item-start min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>{state==='Sign Up'?"Create Account":"Login"}</p>
          <p>Please {state==='Sign Up'?"Sign Up":"Log in "} to book appointment</p>
          {
            state==='Sign Up' && <div className='w-full ' >
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value) } value={name} required />
          </div>
          }
          <div  className='w-full ' >
            <p>E Mail</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value) } value={email} required/>
          </div>
          <div  className='w-full ' >
            <p>Password</p>
            <input  className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value) } value={password} required />
          </div>
          <button type='submit' className='bg-primary w-full px-2  font-medium py-4 rounded-md text-white '>{state==='Sign Up'?"Create Account":"Login"}</button>
          {
            state==="Sign Up"
            ? <p>Already have an account? <span onClick={()=>setState('Login')} className='text-primary cursor-pointer underline'>Login here</span> </p>
            :<p>Create a new Account? <span onClick={()=>setState('Sign Up')} className='text-primary cursor-pointer underline'>Click here</span></p>
          }
        </div>
    </form>
  )
}

export default Login