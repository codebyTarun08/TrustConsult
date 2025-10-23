"use client"
import React, {useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import DropDownMenu from './DropDownMenu'
const Navbar = () => {
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const [show,setShow] = useState(false);
  return (
    <div className='flex justify-center bg-prime-5 text-gray-400 font-inter font-light items-center border-b-[1px] border-richblack-100/50 sticky top-0 z-50 backdrop-blur-3xl'>
      <nav className='flex justify-between w-11/12 max-w-maxContent py-3'>
        <Link href='/'>
          <Image height={40} width={230} src="/logo-white.png" alt="Logo" className=''/>
        </Link>
        <ul className='flex justify-between items-center w-1/3'>
            <Link href='/'>
             <li>Home</li>
            </Link>
            
            <Link href='about'>
             <li>About</li>
            </Link>
            <Link href='contact'>
             <li>Contact Us</li>
            </Link>
            <Link href='book'>
             <li className='text-xl text-cyan-300 font-inter font-semibold rounded-md py-1 px-2 bg-richblack-800 border-b-[1px] border-b-richblack-400/60 shadow-md shadow-cyan-100/40 hover:scale-95 transition-all duration-200'>Book Now</li>
            </Link>
        </ul>
        <div className='flex items-center gap-x-4 '>
            {!token && (
              <>
                <Link href='/auth/login'>
                  <button className='px-4 py-2 bg-cyan-400/40 rounded-md text-white font-bold border-b-[1px] border-b-slate-700 active:scale-95 transition-all duration-200 cursor-pointer'>
                    Login
                  </button>
                </Link>
            
            
              <Link href='/auth/signup'>
                 <button className='px-4 py-2 bg-cyan-400/40 rounded-md text-white font-bold border-b-[1px] border-b-slate-700 active:scale-95 transition-all duration-200 cursor-pointer'>
                  Signup
                </button>
              </Link>
              </>
            )}
            {
              token &&  (
                <div className='flex items-center gap-x-4'>
                  {user?.role!=="Admin" &&
                  <Link href='/bookings'>
                    <button className='px-4 py-2 bg-cyan-400/40 rounded-md text-white font-bold border-b-[1px] border-b-slate-700 active:scale-95 transition-all duration-200 cursor-pointer'>
                      {user?.role === "Client" ? "My Requests" : "My Bookings"}
                    </button>
                  </Link>
                  }
                  <div className=''>
                    <span onClick={() => setShow(!show)} >
                      <img src={user?.image} alt="User Avatar" className='w-10 h-10 object-cover rounded-full border-4 border-green-100/20 shadow-lg object-center' />
                    </span>
                    {
                      show && (
                        <DropDownMenu setShow={setShow} />
                      )
                    }
                  </div>
                </div>
              )
            }
        </div>
      </nav>
    </div>
    
  )
}

export default Navbar