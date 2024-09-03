"use client";
import Link from "next/link";
//icon
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

import { useState } from "react";
const Navbar = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const handleOnClick = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };
  return (
    <>
      <div className="flex w-full h-16 justify-between border-2 border-black dark:bg-black ">
        <div className="flex w-1/3 items-center m-4 ">
          <Link
            href="/"
            className="flex flex-row w-1/4 h-10 p-2 border-2 border-black rounded-3xl justify-center items-center space-x-2 dark:border-white "
          >
            <div className="text-base dark:text-white">
              <FaRegCircle />
            </div>
            <div className="flex text-green font-extrabold dark:text-white">
              MATTER
            </div>
          </Link>
        </div>
        <div className="flex w-1/3  items-center m-4 justify-center">
          <div className="flex  h-10 border-2 border-black rounded-3xl p-1 justify-center dark:border-white">
            <div className="flex items-center justify-center ">
              <input
                type="text"
                className="h-8 rounded-3xl  p-2 focus:outline-none dark:bg-black dark:text-white"
                placeholder="Search..."
              />
            </div>
            <div className="flex items-center justify-center ">
              <button className="flex w-8 h-8 bg-green justify-center items-center rounded-full border-2 border-black p-1 dark:border-white dark:text-white dark:bg-black">
                <IoSearch />
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-1/3 items-center m-4 justify-end">
          <div className="flex">
            <div>
              <div className="flex w-10 h-10 rounded-full border-2 border-black justify-center items-center mx-1 bg-green dark:bg-white">
                <button onClick={handleOnClick}>
                  <MdDarkMode />
                </button>
              </div>
            </div>
            <div>
              <Link
                href="/cart"
                className="flex w-10 h-10 rounded-full border-2 border-black justify-center items-center mx-1 bg-green dark:bg-white"
              >
                <MdOutlineShoppingBag className="h-6 w-6 rounded-full " />
              </Link>
            </div>
            <div>
              <Link
                href="/profile"
                className="flex w-10 h-10 bg-green  rounded-full border-2 border-black justify-center items-center mx-1 dark:bg-white"
              >
                <RxAvatar className="h-8 w-8 rounded-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
