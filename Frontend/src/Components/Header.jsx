import React from 'react'
import {assets} from '../Assets/assets'
function Header() {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary
      rounded-lg px-6 lg:px-20      
    '>
      {/* ------Left Side------- */}
      <div className='flex md:w-1/2 flex-col items-start justify-center gap-4 m-auto md:py-[10vw] md:mb-[-30px]  '>
        <p className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white '>Book Appointment <br /> With Trusted Doctors </p>
        <div className='flex items-center justify-center text-white'>
          <img src={assets.group_profiles} alt="" srcset="" />
          <p className='text-sm font-light ml-4'>Simply browse through our extensive list of trusted doctors,<br />schedule your appointment hassle-free.

</p>
        </div>
        <a className='bg-white rounded-full flex p-4 gap-3 hover:scale-105 transition-all text-sm' 
        href='#speciality'>
          Book Appointment <img src={assets.arrow_icon} />
        </a>
      </div>
      
        {/* Right Side----------- */}
        <div className='md:w-1/2  relative '>
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg ' src={assets.header_img} alt="" srcset="" />
      </div>

    </div>
  )
}

export default Header