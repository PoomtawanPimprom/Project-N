"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import React from 'react';
import MenuLeft from '../menuleft';
import { Separator } from "@/components/ui/separator"


export default function editAddress() {
    return (
        <section id="profile">
            <div className="container mx-auto flex flex-col lg:flex-row py-6 gap-4 px-4 sm:px-6 lg:px-8">
                <MenuLeft />
                {/* Content right */}
                <div className="flex flex-col lg:w-3/4 gap-4 bg-white border rounded-lg shadow-md p-4 sm:p-6 sm:shadow-none sm:border-black">

                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                        <h1 className='text-lg font-semibold'>My Address</h1>
                        {/* <button className='w-full sm:w-auto px-4 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>
                            + New Address 
                        </button> */}
                        <Dialog>
                            <DialogTrigger asChild className="self-end">
                                <button className='w-full sm:w-auto px-4 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>+ New Address</button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>New Address</DialogTitle>
                                    <DialogDescription>
                                        Create your new address information below.
                                    </DialogDescription>
                                </DialogHeader>
                                <form className="space-y-4">
        
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input type="text" id="fullName" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="First Name & Last Name"/>
                                    </div>

                                    <div>
                                        <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700">House No</label>
                                        <input type="text" id="houseNo" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="House No, Street Name"/>
                                    </div>

                                    <div>
                                        <label htmlFor="subDistrict" className="block text-sm font-medium text-gray-700">Sub-District</label>
                                        <input type="text" id="subDistrict" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Sub-District" />
                                    </div>

                                    <div>
                                        <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                                        <input type="text" id="district" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="District"/>
                                    </div>

                                    <div>
                                        <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province</label>
                                        <input type="text" id="province" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Province"/>
                                    </div>

                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                                        <input type="text" id="postalCode" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Postal Code"/>
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <DialogClose asChild>
                                            <button type="button" className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancel</button>
                                        </DialogClose>
                                        <button type="submit" className="px-4 py-2 text-sm text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Save</button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Separator />


                    <div className='flex flex-col gap-4 p-4 bg-gray-50 rounded-lg'>
                        <div className='space-y-2'>
                            <div className='flex flex-wrap items-center gap-2 text-base'>
                                <h1 className='font-semibold'>First Name & Last Name</h1>
                                <Separator orientation="vertical" className="hidden sm:block" />
                                <p className='text-gray-600'>Number</p>
                            </div>

                            <div className='flex h-4 flex-wrap items-center gap-2 text-sm'>
                                <p>HouseNo</p>
                                <Separator orientation="vertical" className="hidden sm:block" />
                                <p>Moo</p>
                                <Separator orientation="vertical" className="hidden sm:block" />
                                <p>Province</p>
                                <Separator orientation="vertical" className="hidden sm:block" />
                                <p>District</p>
                                <Separator orientation="vertical" className="hidden sm:block" />
                                <p>Sub-District</p>
                                <Separator orientation="vertical" className="hidden sm:block" />
                                <p>Postal Code</p>
                            </div>
                        </div>

                        <Dialog>
                            <DialogTrigger asChild className="self-end">
                                <button className='self-end text-sm px-4 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>Edit</button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Address</DialogTitle>
                                    <DialogDescription>
                                        Update your address information below.
                                    </DialogDescription>
                                </DialogHeader>
                                <form className="space-y-4">
        
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input type="text" id="fullName" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="First Name & Last Name"/>
                                    </div>

                                    <div>
                                        <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700">House No</label>
                                        <input type="text" id="houseNo" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="House No, Street Name"/>
                                    </div>

                                    <div>
                                        <label htmlFor="subDistrict" className="block text-sm font-medium text-gray-700">Sub-District</label>
                                        <input type="text" id="subDistrict" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Sub-District" />
                                    </div>

                                    <div>
                                        <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                                        <input type="text" id="district" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="District"/>
                                    </div>

                                    <div>
                                        <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province</label>
                                        <input type="text" id="province" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Province"/>
                                    </div>

                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                                        <input type="text" id="postalCode" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Postal Code"/>
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <DialogClose asChild>
                                            <button type="button" className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancel</button>
                                        </DialogClose>
                                        <button type="submit" className="px-4 py-2 text-sm text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Save</button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>

                    </div>
                    <Separator />

                    <div className='flex flex-col gap-4 p-4 bg-gray-50 rounded-lg'>
                        <div className='space-y-2'>
                            <div className='flex flex-wrap items-center gap-2 text-base'>
                                <h1 className='font-semibold'>First Name & Last Name</h1>
                                <Separator orientation="vertical" className="hidden sm:block" />
                                <p className='text-gray-600'>Number</p>
                            </div>

                            <div className='flex h-4 flex-wrap items-center gap-2 text-sm'>
                                <p>HouseNo</p>
                                <Separator orientation="vertical" className="hidden sm:block" />
                                <p>Moo</p>
                                <Separator orientation="vertical" className="hidden sm:block" />
                                <p>Province</p>
                                <Separator orientation="vertical" className="hidden sm:block" />
                                <p>District</p>
                                <Separator orientation="vertical" className="hidden sm:block" />
                                <p>Sub-District</p>
                                <Separator orientation="vertical" className="hidden sm:block" />
                                <p>Postal Code</p>
                            </div>
                        </div>

                        <Dialog>
                            <DialogTrigger asChild className="self-end">
                                <button className='self-end text-sm px-4 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>Edit</button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Address</DialogTitle>
                                    <DialogDescription>
                                        Update your address information below.
                                    </DialogDescription>
                                </DialogHeader>
                                <form className="space-y-4">
        
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input type="text" id="fullName" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="First Name & Last Name"/>
                                    </div>

                                    <div>
                                        <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700">House No</label>
                                        <input type="text" id="houseNo" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="House No, Street Name"/>
                                    </div>

                                    <div>
                                        <label htmlFor="subDistrict" className="block text-sm font-medium text-gray-700">Sub-District</label>
                                        <input type="text" id="subDistrict" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Sub-District" />
                                    </div>

                                    <div>
                                        <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                                        <input type="text" id="district" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="District"/>
                                    </div>

                                    <div>
                                        <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province</label>
                                        <input type="text" id="province" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Province"/>
                                    </div>

                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                                        <input type="text" id="postalCode" className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Postal Code"/>
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <DialogClose asChild>
                                            <button type="button" className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancel</button>
                                        </DialogClose>
                                        <button type="submit" className="px-4 py-2 text-sm text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Save</button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>

                    </div>
                    <Separator />

                </div>
            </div>
        </section>
    );
}
