import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppConext';

function Doctors() {
  const {speciality}=useParams()
  const [filterDoc,setFilterDoc]=useState([]);
  const [showFilter,setShowFilter]=useState(false)
  const{doctors} =useContext(AppContext);
  const navigate=useNavigate();

  const applyFilter=()=>{

    if(speciality){
      setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
    }else{
      setFilterDoc(doctors);
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors,speciality])
  
  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 '>
      <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}
          onClick={() => setShowFilter(prev =>!prev)}
        >
          Filters
        </button>

        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'block' : 'hidden'} sm:flex`}>
          <p onClick={()=>navigate(speciality==='General physician'? '/doctors' :'/doctors/General physician' )} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-gray-300 border-2 rounded transition-all cursor-pointer ${speciality==="General physician" ? 'bg-indigo-100 text-black' :'' }`} >General Physician</p>
          <p onClick={()=>navigate(speciality==='Gynecologist'? '/doctors' :'/doctors/Gynecologist' )} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-gray-300 border-2 rounded transition-all cursor-pointer ${speciality==="Gynecologist" ? 'bg-indigo-100 text-black' :'' }`} >Gynecologist</p>
          <p onClick={()=>navigate(speciality==='Dermatologist'? '/doctors' :'/doctors/Dermatologist' )} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-gray-300 border-2 rounded transition-all cursor-pointer ${speciality==="Dermatologist" ? 'bg-indigo-100 text-black' :'' }`} >Dermatologist</p>
          <p onClick={()=>navigate(speciality==='Pediatricians'? '/doctors' :'/doctors/Pediatricians' )} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-gray-300 border-2 rounded transition-all cursor-pointer ${speciality==="Pediatricians" ? 'bg-indigo-100 text-black' :'' }`} >Pediatricians</p>
          <p onClick={()=>navigate(speciality==='Neurologist'? '/doctors' :'/doctors/Neurologist' )} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-gray-300 border-2 rounded transition-all cursor-pointer ${speciality==="Neurologist" ? 'bg-indigo-100 text-black' :'' }`} >Neurologist</p>
          <p onClick={()=>navigate(speciality==='Gastroenterologist'? '/doctors' :'/doctors/Gastroenterologist' )} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-gray-300 border-2 rounded transition-all cursor-pointer ${speciality==="Gastroenterologist" ? 'bg-indigo-100 text-black' :'' }`} >Gastroenterologist</p>
        </div>
      
       <div className='w-full grid grid-cols-auto gap-4 '>
           {
         filterDoc.map((item) => (
          <div 
            key={item._id} 
            onClick={() => navigate(`/appointment/${item._id}`)} 
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500'
          >
            <img className='bg-blue-50' src={item.image} alt="" srcSet="" />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-500'> 
                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                <p>Available</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
         ))
      }
       </div>
       </div>  
    </div>
  )
}

export default Doctors
