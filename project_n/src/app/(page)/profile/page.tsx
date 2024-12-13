"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import tree from '../../../../public/pngtree.png'
import { BsPersonVcard } from 'react-icons/bs'
import { MdPayment } from 'react-icons/md'
import { IoIosGift } from 'react-icons/io'
import { FaRegHeart } from 'react-icons/fa'
import MenuLeft from './menuleft'

function profile() {

    return (
        <section id="profile">
            <div className="container mx-auto flex flex-col lg:flex-row py-6 gap-4 px-4 sm:px-6 lg:px-8">

                <MenuLeft />

                {/* Content right */}
                <div className="flex flex-col gap-6 lg:w-3/4 z-50">
                    {/* Form Section */}
                    <form action="" className="bg-white border-0 shadow-md border-black p-6 rounded-lg space-y-4 sm:border sm:shadow-none">
                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                อีเมล
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:w-1/2"
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                เบอร์โทรศัพท์
                            </label>
                            <input
                                type="text"
                                id="phone"
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:w-1/3"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        className="h-4 w-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                                    />
                                    <span>Male</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        className="h-4 w-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                                    />
                                    <span>Female</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="other"
                                        className="h-4 w-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                                    />
                                    <span>Other</span>
                                </label>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dob"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:w-1/3"
                            />
                        </div>
                        <div className="text-right">
                            <button
                                type="submit"
                                className="inline-block px-6 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                    {/* File Upload Section */}
                    <div className="bg-white border-0 shadow-md border-black p-6 rounded-lg  space-y-4 sm:border sm:shadow-none">
                        <Image src={tree} alt="Tree" className="w-24 mx-auto" />
                        <input
                            type="file"
                            className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold
                                file:bg-gray-600 file:text-white
                                hover:file:bg-gray-700"
                        />
                    </div>
                </div>
            </div>
        </section>

    )
}

export default profile