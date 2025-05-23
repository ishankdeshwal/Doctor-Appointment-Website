import React from 'react'
import { assets } from '../Assets/assets'
import { useNavigate } from 'react-router-dom'

function Banner() {
    const navigate=useNavigate()
  return (
    
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-10'>
        {/* Left */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 ' >
        <div className='font-semibold'>
        <p className='text-white sm:text-xl md:text-3xl lg:text-5xl '>Book Appointment</p>
        <p className='text-white mt-4 sm:text-xl md:text-3xl lg:text-5xl '> With 100+ Trusted Doctors</p>
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Create Account clicked in Banner");
            // Use setTimeout to ensure the event completes before navigation
            setTimeout(() => {
              navigate('/login');
              window.scrollTo(0, 0);
            }, 100);
          }} 
          className='mt-6 bg-white hover:scale-105 transition-all rounded-full p-3 text-sm sm:text-base text-gray-600'
        >
          Create Account
        </button>
        </div>
        {/* Right */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md ' src={assets.appointment_img} alt="" srcset="" />
        </div>
    </div>
  )
}

export default Banner
