"use client"
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"


const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null)
  const {data:session} = useSession()


  useEffect(() => {
    if (!session?.user?.email) return;
  const fetchinfo = async () => {
    const fetchdata = await fetch('http://localhost:3000/api/userinfo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: session.user.email })
    });
    const data = await fetchdata.json();
    if (data?.username) setUser(data.username);
  };  
  fetchinfo();
  }, [session])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="relative inline-flex h-9 overflow-hidden rounded-full p-[1px] focus:outline-none hover:cursor-pointer"
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl">
          Features
        </span>
      </button>

      <div className={`z-10 ${isOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-900 absolute right-1 top-14`}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</Link>
          </li>
          <li>
            <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
          </li>
          <li>
            <Link href={`/${user}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
          </li>
          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full text-left block px-4 py-2 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Dropdown
