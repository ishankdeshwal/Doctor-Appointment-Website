import React from 'react'
import { specialityData } from '../Assets/assets'
import { Link } from 'react-router-dom'
function SpecialityMenu() {
  return (
    <div className='flex flex-col item-center text-center justify-center py-16 gap-4 text-gray-800' id='speciality'>
        <h1 className='font-medium text-3xl  ' >Find By Speciality</h1>
        <p className=' sm:text-1/3 text-sm  text-center'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <div className='flex gap-4 p-4 sm:justify-center w-full overflow-scroll  '>
        {specialityData.map((item,index)=>(
            <Link onClick={()=>window.scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
            <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" srcset="" />
            <p> {item.speciality}</p>
            </Link>
        ))}
    </div>
    </div>
  )
}

export default SpecialityMenu