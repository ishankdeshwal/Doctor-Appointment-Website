import React from 'react'
import { assets } from '../Assets/assets'
const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center text-gray-500 mt-10 font-medium'>
        <p>CONTACT <span className='text-black'>US</span></p>
      </div>
      <div className='flex flex-col md:flex-row my-10 justify-center md:flex-row gap-10 mb-28 text-sm' >
      <img className='mt-5  w-full max-w-[360px] ' src={assets.contact_image} alt="" />
      <div className='flex flex-col  gap-6'>
        <p className='text-xl  text-gray-800 mt-10 font-medium'>OUR OFFICE</p>
        <p className='text-sm  text-gray-500 '>00000 Willms Station <br />Suite 000, Washington, USA</p>
        <p className='text-sm  text-gray-500 '>Tel: (000) 000-0000 <br />Email: greatstackdev@gmail.com</p>
        <p className='text-xl text-gray-800 '>CAREERS AT PRESCRIPTO</p>
        <p className='text-sm  text-gray-500 '>Learn more about our teams and job openings.</p>
       <button className='self-start border-black border px-8 py-4 text-sm hover:bg-black hover:text-white' >Explore Jobs</button>
      </div>
      </div>
    </div>
  )
}

export default Contact