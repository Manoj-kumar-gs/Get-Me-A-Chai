"use client"
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-gray-900 h-[8vh] text-white flex flex-col justify-center items-center text-[12px]'>
        <p>© Get Me A Chai - All rights reserved</p>
        <p className='flex justify-center items-center w-full gap-1.5'>
            Follow me on 
            <Link href="https://www.linkedin.com/in/manoj-kumar-gs-9333b22b8/" target="_blank" rel="noopener noreferrer">
              <img className='w-4 h-4' src="/linkedin.webp" alt="" />
            </Link> 
            <span className='font-bold flex justify-center items-start'>.</span> 
            <Link href="https://github.com/Manoj-kumar-gs" target="_blank" rel="noopener noreferrer">
              <img className='w-5 h-5 rounded-full' src="/github.webp" alt="" />
            </Link>
        </p>
    </footer>
  )
}

export default Footer
