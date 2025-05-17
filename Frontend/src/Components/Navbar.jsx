import React, { useContext, useState } from 'react'
import {assets} from '../Assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppConext';
function Navbar() {
    const navigate=useNavigate()
    const [showmenu,setShowMenu]=useState(false);
    const {token,setToken,userData}=useContext(AppContext)
    const logout=()=>{
        setToken(false)
        localStorage.removeItem('token')
        navigate('/')
    }
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b-2 border-gray-400 '>
       <NavLink to='/'> <img className='w-44 cursor-pointer' src={assets.logo} />
       </NavLink>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1'>All Doctors</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1'>About</li>
                <hr  className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>Contact</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <button className='border rounded-full px-3 py-0.5'
  onClick={() =>
    window.open("https://doctor-appointment-website-admin-02z3.onrender.com", "_blank")
  }
>
 Admin
</button>

        </ul> 
        <div className='flex item-center gap-4'>
            {
                token && userData ?
                <div className='flex gap-2 cursor-pointer items-center group relative'>
                    <img className='w-8 rounded-full' src={userData.image} alt="" srcSet="" />
                    <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                    <div className='absolute  top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block '>
                        <div className='bg-stone-100 rounded-md flex flex-col gap-4 p-3 min-w-48 '>
                            <p onClick={()=>navigate('Myprofile')} className='cursor-pointer hover:text-black'>My Profile</p>
                            <p onClick={()=>navigate('MyAppointments')} className='cursor-pointer hover:text-black'>My Appointment</p>
                            <p onClick={()=>logout()} className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                </div>
                :<button onClick={()=> navigate('/login') } className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block '>Create Account</button>
            }
            <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
            {/* Mobile menu */}
            <div className={`${showmenu?'fixed w-full ':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white trasition-all`}> 
                <div className='flex items-center justify-between px-5 py-6'>
                    <img className='w-36' src={assets.logo} alt="" />
                    <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
                </div>
                <ul className='flex flex-col items-center justify-center gap-2 mt-5 p-0 text-lg font-medium'>
                    <NavLink onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                    <NavLink onClick={()=>setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
                    <NavLink onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
                    <NavLink onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar

