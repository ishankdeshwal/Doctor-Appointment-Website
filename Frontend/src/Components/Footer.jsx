import React from 'react'
import { assets } from '../Assets/assets'

function Footer() {
  return (
    <div>
        <div className='flex sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-14 mt-40 text-sm'>
            {/* left */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" srcSet="" />
                <p className='w-full sm:4/5 md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
            {/* Center */}
            <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
            </div>
            {/* Right */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+0-000-000-000</li>
                    <li>abc@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            {/* CopyRights */}
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024 @ Greatstack.dev - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
