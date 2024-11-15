"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { MdDarkMode, MdOutlineShoppingBag } from 'react-icons/md'
import { RxAvatar } from 'react-icons/rx'
import { FiSearch } from 'react-icons/fi'
import { IoMdMore } from 'react-icons/io'

function navbar() {

  const [isMenuMore, setIsMenuMore] = useState(false);
  return (
    <div className='flex justify-between items-center text-black py-4 px-8 md:px-32 bg-white drop-shadow-md'>
      <Link href='/'>
        <p className='text-lg font-semibold hover:scale-105 transition-all'>MATTER</p>
      </Link>

      <div className='relative hidden lg:flex items-center justify-center gap-3'>
        <FiSearch className='w-5 h-5 absolute left-3'/>
        <input type="text" placeholder='Search...' className='py-2 pl-10 pr-6 rounded-full border-2'/>
      </div>

      <ul className='hidden md:flex items-center gap-10 text-base'>
        <li className='text-lg  hover:text-gray-500 hover:cursor-pointer'>
          <Link href=''><MdDarkMode className='w-7 h-7' /></Link>
        </li>
        <li className='text-lg  hover:text-gray-500 hover:cursor-pointer'>
          <Link href=''><MdOutlineShoppingBag className='w-7 h-7' /></Link>
        </li>
        <li className='text-lg  hover:text-gray-500 hover:cursor-pointer'>
          <Link href=''><RxAvatar className='w-7 h-7' /></Link>
        </li>
      </ul>

      <IoMdMore className='w-7 h-7 md:hidden block cursor-pointer' onClick={() => setIsMenuMore(!isMenuMore)} />

      <div className={`absolute md:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 
        font-semibold text-lg transform transition-transform ${isMenuMore ? "opacity-100" : "opacity-0"}`} 
        style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>
        <li className='list-none w-full text-center p-4 transition-all cursor-pointer'>Home</li>
        <li className='list-none w-full text-center p-4 transition-all cursor-pointer'>Cart</li>
        <li className='list-none w-full text-center p-4 transition-all cursor-pointer'>Account</li>
      </div>
    </div>
  )
}

export default navbar