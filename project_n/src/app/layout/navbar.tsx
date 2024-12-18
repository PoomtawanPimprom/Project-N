"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdMore } from "react-icons/io";
import { CircleUser, Heart, Moon, Search, ShoppingCart } from "lucide-react";
import SearchInput from "./navber/SearchInput";

export default function Navbar() {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isMenuMore, setIsMenuMore] = useState(false);

  const handleToggleDropdown = () => {
    setToggleDropdown(!toggleDropdown);
  };

  return (
    <>
      {toggleDropdown && (
        <div
          className="fixed inset-0 bg-transparent z-30"
          onClick={() => setToggleDropdown(false)}
        />
      )}

      <div className="relative flex justify-between items-center text-black py-4 px-8 md:px-32 bg-white drop-shadow-md z-30">
        {/* Logo */}
        <Link href="/">
          <p className="text-lg font-semibold hover:scale-105 transition-all">
            MATTER
          </p>
        </Link>

        {/* Search */}
        <SearchInput />

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-10 text-base">
          <li className="text-lg  hover:text-gray-500 hover:cursor-pointer">
            <Link href="">
              <Moon className="w-7 h-7" />
            </Link>
          </li>
          <li className="text-lg  hover:text-gray-500 hover:cursor-pointer">
            <Link href="/cart">
              <ShoppingCart className="w-7 h-7" />
            </Link>
          </li>
          <li className="relative  text-lg  hover:text-gray-500 hover:cursor-pointer">
            <button onClick={handleToggleDropdown} className="flex ">
              <CircleUser className="w-7 h-7" />
            </button>

            {toggleDropdown && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setToggleDropdown(false)}
                />
                <div className="absolute flex flex-col bg-white shadow-lg rounded-md mt-2 right-0">
                  <Link
                    href="/profile"
                    className="px-12 py-2 hover:bg-gray-100"
                  >
                    โปรไฟล์
                  </Link>
                  <Link
                    href="/favorite"
                    className="px-8 py-2 hover:bg-gray-100"
                  >
                    สินค้าที่ชอบ
                  </Link>
                  <button className="px-8 py-2  hover:bg-gray-100 text-center">
                    Log out
                  </button>
                </div>
              </>
            )}
          </li>
        </ul>

        <IoMdMore
          className="w-7 h-7 md:hidden block cursor-pointer"
          onClick={() => setIsMenuMore(!isMenuMore)}
        />

        <div
          className={`z-50 absolute md:hidden top-14 left-0 w-full bg-white flex flex-col items-center gap-6 
        font-semibold text-lg transform transition-transform ${
          isMenuMore ? "block" : "hidden"
        }`}
          style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
          <li className="list-none w-full text-center p-4 transition-all cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li className="list-none w-full text-center p-4 transition-all cursor-pointer">
            <Link href="/cart">Cart</Link>
          </li>
          <li className="list-none w-full text-center p-4 transition-all cursor-pointer">
            <Link href="/profile">Account</Link>
          </li>
        </div>
      </div>
    </>
  );
}
