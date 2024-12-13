"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState } from 'react'
import Link from 'next/link'
import { IoMdMore } from 'react-icons/io'
import { CircleUser, Heart, Moon, Search, ShoppingCart } from 'lucide-react'

function Navbar() {

  const [isMenuMore, setIsMenuMore] = useState(false);
  return (
    <div className='relative flex justify-between items-center text-black py-4 px-8 md:px-32 bg-white drop-shadow-md z-30'>

      {/* Logo */}
      <Link href='/'>
        <p className='text-lg font-semibold hover:scale-105 transition-all'>MATTER</p>
      </Link>
      
      {/* Search */}
      <div className='relative hidden lg:flex items-center justify-center gap-3'>
        <Search className='w-5 h-5 absolute left-3' />
        {/* <FiSearch className='w-5 h-5 absolute left-3'/> */}
        <input type="text" placeholder='Search...' className='py-2 pl-10 pr-6 rounded-full border-2'/>
      </div>

      {/* Menu */}
      <ul className='hidden md:flex items-center gap-10 text-base'>
        <li className='text-lg  hover:text-gray-500 hover:cursor-pointer'>
          <Link href=''><Moon className='w-7 h-7' /></Link>
        </li>
        <li className='text-lg  hover:text-gray-500 hover:cursor-pointer'>
          <Link href='cart'><ShoppingCart className='w-7 h-7' /></Link>
        </li>
        <li className='text-lg  hover:text-gray-500 hover:cursor-pointer'>
          <Link href='/profile'><CircleUser className='w-7 h-7' /></Link>
        </li>
      </ul>

      <IoMdMore className='w-7 h-7 md:hidden block cursor-pointer' onClick={() => setIsMenuMore(!isMenuMore)} />

      <div className={`z-50 absolute md:hidden top-14 left-0 w-full bg-white flex flex-col items-center gap-6 
        font-semibold text-lg transform transition-transform ${isMenuMore ? "block" : "hidden"}`} 
        style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>
        <li className='list-none w-full text-center p-4 transition-all cursor-pointer'><Link href='/'>Home</Link></li>
        <li className='list-none w-full text-center p-4 transition-all cursor-pointer'><Link href='/cart'>Cart</Link></li>
        <li className='list-none w-full text-center p-4 transition-all cursor-pointer'><Link href='/profile'>Account</Link></li>
      </div>
    </div>
  )
}

export default Navbar