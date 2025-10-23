import React from 'react'
import Image from 'next/image'
import { consultingData } from '@/utils/fields'
import HighLightText from '../HighLightText'
const Consult = () => {
  return (
    <section className='flex flex-row w-11/12 my-20'>
            <div className='w-1/2 flex justify-center'>
              <Image src="/HomeImages/consult-home.png" alt="" width={400} height={100}/>
            </div>
            <div className='flex flex-col w-1/2 gap-y-3'>
               <h2 className='font- mt-5 text-3xl font-crimson'>
                  <HighLightText text={"Grow More By Consulting More"} />
               </h2>
               {consultingData.map((item,index)=>(
                  <div key={index} className="flex flex-col gap-2 rounded-lg shadow-inner border border-gray-700 hover:bg-opacity-70 transition-all duration-300 hover:scale-95 p-5">
                     <h3 className='font-semibold text-lg'>{item.title}</h3>
                     <p className='text-gray-300'>{item.description}</p>
                  </div>
               ))}
            </div>
    </section>
  )
}

export default Consult
        // <section className='flex flex-row w-11/12 my-20'>

        //     <div className='tab2 flex flex-col w-1/2 gap-y-3'>
        //      <h2 className='font- mt-5 text-3xl font-crimson'>
        //       <HighLightText text={"Grow More By Consulting More"} />
        //     </h2>
        //      <p className='font-semibold text-lg'>Unlock Expertise, Accelerate Progress</p>
        //      <p>Stop guessing and start growing—get personalized advice from verified consultants in business, tech, health, and more.</p>
        //      <p className='font-semibold text-lg'>Smarter Decisions, Faster Results</p>
        //      <p>Whether you're launching a startup or shaping your career, the right guidance makes all the difference.</p>
        //      <p className='font-semibold text-lg'>Every Session, A Step Forward</p>
        //      <p>Book sessions with top consultants, gain clarity, and turn your goals into results—one conversation at a time.</p>
        //   </div>
        // </section>