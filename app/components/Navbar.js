"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import Dropdown from './Dropdown'
import Image from 'next/image'


const Navbar = () => {
    
    const { data: session } = useSession()
    const img = session?.user?.image || "https://www.w3schools.com/howto/img_avatar.png";
    return (
        <nav className='flex justify-between items-center px-4 bg-gray-900 w-full h-[8vh]'>
            <Link href={"/"} className='flex justify-center items-center'>
                <div className='text-white text-2xl font-semibold'>
                    getmeachai
                </div>
                <Image className='w-11 h-11 md:w-14 md:h-14' src="/tea.gif" alt="" srcSet="" />
            </Link>
            {session?(
           <div className='text-white flex justify-center items-center gap-2'>
           <Dropdown />
           <Image className='w-8 h-8 rounded-full' src={img} alt="accountImage" />
       </div>
       ):(
            <div className='text-white'>
                <Link href={"/login"}>
                <div className='flex justify-center items-center gap-2'>
                    <button
                        className="relative inline-flex h-9 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-150"
                        onClick={(e) => e.currentTarget.blur()}
                    >
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl">
                            Login
                        </span>
                    </button>
                    <Image className='w-8 h-8 rounded-full' src={img} alt="accountimg" />
                </div>

                </Link>
            </div>)}
        </nav>
    )
}

export default Navbar
