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

import React, { useEffect, useState } from 'react';
import MenuLeft from '../menuleft';
import { Separator } from "@/components/ui/separator"
import { createAddress, deleteAddress, getUserAddress, updateUserAddress } from "@/app/service/address/service";
import { userAddressInterface } from "@/app/interface/userAddressInterface";


export default function editAddress() {
    const [addresses, setAddresses] = useState<userAddressInterface[]>([]);
    const [updateAddressData, setUpdateAddressData] = useState<userAddressInterface>({
        id: 0,
        fullName: '',
        houseNo: '',
        moo: '',
        province: '',
        district: '',
        subDistrict: '',
        postalCode: '',
        mobile: '',
        userId: 1,
    })

    const fetchAddressData = async () => {
        const userAddress = await getUserAddress(1);
        console.log(userAddress);
        setAddresses(userAddress);
    }

    useEffect(() => {
        fetchAddressData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log(updateAddressData)
            await updateUserAddress(updateAddressData.id, {
                fullName: updateAddressData.fullName,
                houseNo: updateAddressData.houseNo,
                moo: updateAddressData.moo,
                province: updateAddressData.province,
                district: updateAddressData.district,
                subDistrict: updateAddressData.subDistrict,
                postalCode: updateAddressData.postalCode,
                mobile: updateAddressData.mobile,
            });
            fetchAddressData();

        } catch (error: any) {
            console.error("Failed to update address:", error.message);
            alert(`Failed to update address: ${error.message}`);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        setUpdateAddressData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addDataAddress = async (e: React.FormEvent) => {
        // console.log(updateAddressData)
        createAddress(updateAddressData);
        fetchAddressData();
    }

    const deleteDataAddress = async (id: Number) => {
        // console.log(id);
        await deleteAddress(id);
        fetchAddressData();
    }
    


    return (
        <section id="profile">
            <div className="container mx-auto flex flex-col lg:flex-row py-6 gap-4 px-4 sm:px-6 lg:px-8">
                <MenuLeft />
                {/* Content right */}
                <div className="flex flex-col lg:w-3/4 gap-4 bg-white border rounded-lg shadow-md p-4 sm:p-6 sm:shadow-none sm:border-black">

                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                        <h1 className='text-lg font-semibold'>My Address</h1>

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
                                <form className="space-y-4" onSubmit={addDataAddress}>

                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input type="text" id="fullName" name="fullName" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="First Name" />
                                    </div>

                                    <div>
                                        <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700">House No</label>
                                        <input type="text" id="houseNo" name="houseNo" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="House No, Street Name" />
                                    </div>

                                    <div>
                                        <label htmlFor="moo" className="block text-sm font-medium text-gray-700">Moo</label>
                                        <input type="text" id="moo" name="moo" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Moo" />
                                    </div>

                                    <div>
                                        <label htmlFor="subDistrict" className="block text-sm font-medium text-gray-700">Sub-District</label>
                                        <input type="text" id="subDistrict" name="subDistrict" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Sub-District" />
                                    </div>

                                    <div>
                                        <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                                        <input type="text" id="district" name="district" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="District" />
                                    </div>

                                    <div>
                                        <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province</label>
                                        <input type="text" id="province" name="province" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Province" />
                                    </div>

                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                                        <input type="text" id="postalCode" name="postalCode" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Postal Code" />
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

                    {addresses.map((address) => (
                        <div key={address.id} className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="space-y-2">

                                <div className="flex flex-wrap items-center gap-2 text-base">
                                    <h1 className="font-semibold">
                                        {address.fullName} {address.fullName}
                                    </h1>
                                    <Separator orientation="vertical" className="hidden sm:block" />
                                    <p className="text-gray-600">{address.mobile || "No Number"}</p>
                                </div>

                                <div className="flex h-4 flex-wrap items-center gap-2 text-sm">
                                    {/* Display each address field dynamically */}
                                    <p>{address.houseNo || "N/A"}</p>
                                    <Separator orientation="vertical" className="hidden sm:block" />
                                    <p>{address.moo || "N/A"}</p>
                                    <Separator orientation="vertical" className="hidden sm:block" />
                                    <p>{address.province || "N/A"}</p>
                                    <Separator orientation="vertical" className="hidden sm:block" />
                                    <p>{address.district || "N/A"}</p>
                                    <Separator orientation="vertical" className="hidden sm:block" />
                                    <p>{address.subDistrict || "N/A"}</p>
                                    <Separator orientation="vertical" className="hidden sm:block" />
                                    <p>{address.postalCode || "N/A"}</p>
                                </div>

                            </div>

                            <button onClick={(e) => deleteDataAddress(address.id)} className="self-end text-sm px-4 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                Delete
                            </button>

                            {/* Dialog for editing the address */}
                            <Dialog>
                                <DialogTrigger asChild onClick={() => {
                                    setUpdateAddressData(address);
                                }}>
                                    <button className="self-end text-sm px-4 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                        Edit
                                    </button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Address</DialogTitle>
                                        <DialogDescription>
                                            Update your address information below.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form className="space-y-4" onSubmit={handleSubmit} >
                                        <div>
                                            <label htmlFor='firstName' className="block text-sm font-medium text-gray-700">
                                                fullName
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={updateAddressData.fullName}
                                                onChange={handleInput}
                                                className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                                placeholder="First Name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor='houseNo' className="block text-sm font-medium text-gray-700">
                                                House No
                                            </label>
                                            <input
                                                type="text"
                                                id='houseNo'
                                                name="houseNo"
                                                value={updateAddressData.houseNo}
                                                onChange={handleInput}
                                                className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                                placeholder="House No, Street Name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor='subDistrict' className="block text-sm font-medium text-gray-700">
                                                Sub-District
                                            </label>
                                            <input
                                                type="text"
                                                id='subDistrict'
                                                name="subDistrict"
                                                value={updateAddressData.subDistrict}
                                                onChange={handleInput}
                                                className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                                placeholder="Sub-District"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor='district' className="block text-sm font-medium text-gray-700">
                                                District
                                            </label>
                                            <input
                                                type="text"
                                                id='district'
                                                name="district"
                                                value={updateAddressData.district}
                                                onChange={handleInput}
                                                className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                                placeholder="District"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor='province' className="block text-sm font-medium text-gray-700">
                                                Province
                                            </label>
                                            <input
                                                type="text"
                                                id='province'
                                                name="province"
                                                value={updateAddressData.province}
                                                onChange={handleInput}
                                                className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                                placeholder="Province"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor='postalCode' className="block text-sm font-medium text-gray-700">
                                                Postal Code
                                            </label>
                                            <input
                                                type="text"
                                                id='postalCode'
                                                name="postalCode"
                                                value={address.postalCode}
                                                onChange={handleInput}
                                                className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                                                placeholder="Postal Code"
                                            />
                                        </div>

                                        <div className="flex justify-end gap-2">
                                            <DialogClose asChild>
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                                >
                                                    Cancel
                                                </button>
                                            </DialogClose>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 text-sm text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    ))}


                </div>
            </div>
        </section>
    );
}
