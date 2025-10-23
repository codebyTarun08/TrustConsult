"use client"
import React from 'react'
import { SidebarLinks } from '@/utils/SidebarLinks'
import SidebarLink from './SidebarLink'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/app/redux/slices/authSlice'
const Sidebar = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>(state.profile));
  return (
    <div className='w-64 bg-prime-5'>
        <div className='py-10'>
          {
              SidebarLinks.map((link,index) => {
                    if (link.role && user?.role !== link.role) {
                        return null;
                    }
                  return(
                    <div key={index}>
                        <SidebarLink link={link.href} label={link.label} icon={link.icon} />
                    </div>
                  )
              })}
        </div>
        <div className='h-[1px] bg-gray-500 w-3/4 mx-auto'/>
        <button
        className='cursor-pointer mx-auto text-white px-8 py-2 rounded-md bg-blue-200 mt-5 hover:bg-red-500 block transition-all duration-200'
        onClick={()=>dispatch(logout())} 
        >
          Logout
        </button>
        <div className='text-gray-400 text-sm text-center mt-5'>&copy; 2024 TrustConsult</div>
    </div>
  )
}

export default Sidebar