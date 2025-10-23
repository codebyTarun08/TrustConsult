import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Image from 'next/image'
const Template = ({title,desc1,formType}) => {
  return (
    <div className='flex justify-center items-center bg-gray-900 text-gray-200 min-h-[calc(100vh-3.5rem)]'>
        <div className='w-11/12 max-w-maxContent flex lg:flex-row flex-col justify-between items-center gap-x-60'>
          <div className='relative my-20 w-1/2'>
            <Image
            src={`${formType === "login" ? "/HomeImages/cute-freelance.avif" : "/HomeImages/pretty-girl.jpg"}`}
            alt='' 
            className='absolute w-[500px] -top-2 z-5 -left-5'
            width={500}
            height={350}
            />
            <Image
            src="/HomeImages/minimal.avif"
            alt='' 
            className='w-[500px] h-[350px]'
            width={500}
            height={350}
            />
          </div>

          <div className='py-20 w-1/2'>
            <h2 className='text-4xl font-bold font-sans'>{title}</h2>
            <p className='text-gray-400 w-4/5 italic font-edu-sa'>{desc1}</p>
              {
                formType === "login" ? (<LoginForm/>) : (<SignupForm/>)
              }
          </div>
        </div>
    </div>
  )
}

export default Template