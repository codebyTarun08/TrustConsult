"use client"
import React from 'react'
import Link from 'next/link'
import * as Icons from 'react-icons/vsc';
import { usePathname } from 'next/navigation';
const SidebarLink = ({link,label,icon}) => {
  let Icon = Icons[icon];
  const pathName = usePathname();
  let matchRoute = (route)=>(pathName === route);
  return (
        <Link href={link} className={`relative flex items-center px-2 py-4 my-1 ${matchRoute(link) ? 'bg-blue-500' : ''}`}>
            <span className={`absolute left-0 w-2 h-full ${matchRoute(link) ? 'bg-blue-200' : 'bg-teal-500'}`}/>
            <span className='flex items-center gap-4 ml-5'>
                {Icon &&<Icon className='text-gray-300'/>}
                <span className='text-white'>{label}</span>
            </span>
        </Link>
  )
}

export default SidebarLink