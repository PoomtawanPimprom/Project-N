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
import { useSession } from "next-auth/react";
import { userInterface } from "@/app/interface/userInterface";
import { getUserById } from "@/app/service/profile/service";


export default function editAddress() {
    const { data: session } = useSession();
    const [addresses, setAddresses] = useState<userAddressInterface[]>([]);
    const [addressData, setAddressData] = useState<userAddressInterface>({
        id: 0,
        fullName: '',
        houseNo: '',
        moo: '',
        province: '',
        district: '',
        subDistrict: '',
        postalCode: '',
        mobile: '',
        userId: 0,
        addressStatusId: 1,
    })
    const [userData, setUserData] = useState<userInterface>({
        id: 0,
        name: "",
        username: "",
        password: "",
        email: "",
        mobile: "",
        birthdate: new Date(),
        profile: "",
        saler: false,
        genderId: 0,
        roleId: 0,
        userStatusId: 0,
        resetToken: "",
        resetTokenExp: new Date(),
    });


    const onSubmitUpdateAddress = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            // Update the selected address
            await updateUserAddress(addressData.id, {
                fullName: addressData.fullName,
                houseNo: addressData.houseNo,
                moo: addressData.moo,
                province: addressData.province,
                district: addressData.district,
                subDistrict: addressData.subDistrict,
                postalCode: addressData.postalCode,
                mobile: addressData.mobile,
                addressStatusId: Number(addressData.addressStatusId),
            });

            fetchAddressData(); // Refresh addresses

        } catch (error: any) {
            console.error("Failed to update address:", error.message);
            alert(`Failed to update address: ${error.message}`);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setAddressData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addDataAddress = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            // Add the new address
            const data = {
                fullName: addressData.fullName,
                houseNo: addressData.houseNo,
                moo: addressData.moo,
                province: addressData.province,
                district: addressData.district,
                subDistrict: addressData.subDistrict,
                postalCode: addressData.postalCode,
                mobile: addressData.mobile,
                userId: Number(session?.user.id),
                addressStatusId: Number(addressData.addressStatusId),
            };
            await createAddress(data);
            fetchAddressData(); // Refresh addresses

        } catch (error: any) {
            console.error("Failed to add address:", error.message);
            alert(`Failed to add address: ${error.message}`);
        }
    };


    const deleteDataAddress = async (id: Number) => {
        await deleteAddress(id);
        fetchAddressData();
    }


    const fetchAddressData = async () => {
        const userAddress = await getUserAddress(Number(session?.user.id));
        setAddresses(userAddress)
    }

    const fetchUserData = async () => {
        const res = await getUserById(Number(session?.user.id));
        setUserData(res);
    }


    useEffect(() => {
        fetchAddressData();
        fetchUserData();
    }, [session]);



    return (
        <section id="profile">
            <div className="container mx-auto flex flex-col lg:flex-row py-6 gap-4 px-4 sm:px-6 lg:px-8">
                <MenuLeft checkCreatedStore={session?.user.storeId} profile={userData} />
                {/* Content right */}
                <div className="flex flex-col lg:w-3/4 gap-4 bg-white border rounded-lg shadow-md p-4 sm:p-6 sm:shadow-none sm:border-black">

                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                        <h1 className='text-lg font-semibold'>My Address</h1>

                        {/* Create Addresses */}
                        <Dialog>
                            <DialogTrigger asChild className="self-end">
                                <button className='w-full sm:w-auto px-4 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>+ New Address</button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>เพิ่มที่อยู่</DialogTitle>
                                    <DialogDescription>
                                        สร้างข้อมูลที่อยู่ใหม่ของคุณด้านล่าง
                                    </DialogDescription>
                                </DialogHeader>
                                <form className="space-y-4" onSubmit={addDataAddress}>

                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
                                        <input type="text" id="fullName" name="fullName" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="First Name" />
                                    </div>

                                    <div>
                                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">เบอร์มือถือ</label>
                                        <input type="text" id="mobile" name="mobile" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Mobile" />
                                    </div>

                                    <div>
                                        <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700">บ้านเลขที่</label>
                                        <input type="text" id="houseNo" name="houseNo" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="House No, Street Name" />
                                    </div>

                                    <div>
                                        <label htmlFor="moo" className="block text-sm font-medium text-gray-700">หมู่</label>
                                        <input type="text" id="moo" name="moo" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Moo" />
                                    </div>

                                    <div>
                                        <label htmlFor="subDistrict" className="block text-sm font-medium text-gray-700">ตำบล</label>
                                        <input type="text" id="subDistrict" name="subDistrict" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Sub-District" />
                                    </div>

                                    <div>
                                        <label htmlFor="district" className="block text-sm font-medium text-gray-700">อำเภอ</label>
                                        <input type="text" id="district" name="district" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="District" />
                                    </div>

                                    <div>
                                        <label htmlFor="province" className="block text-sm font-medium text-gray-700">จังหวัด</label>
                                        <input type="text" id="province" name="province" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Province" />
                                    </div>

                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">รหัสไปรษณีย์</label>
                                        <input type="text" id="postalCode" name="postalCode" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Postal Code" />
                                    </div>

                                    <div>
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" value={1} name="addressStatusId" onChange={handleInput} />
                                            <span>Set as Default</span>
                                            <input type="radio" value={3} name="addressStatusId" onChange={handleInput} />
                                            <span>Set none</span>
                                        </label>
                                    </div>


                                    <div className="flex justify-end gap-2">
                                        <DialogClose asChild>
                                            <button type="button" className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancel</button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <button type="submit" className="px-4 py-2 text-sm text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Save</button>
                                        </DialogClose>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Separator />

                    {/* Fetch list data */}
                    {addresses.map((address) => (
                        <div key={address.id} className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="space-y-2">

                                <div className="flex flex-wrap items-center gap-2 text-base">
                                    <h1 className="font-semibold">
                                        {address.fullName}
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
                                    setAddressData(address);
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
                                    <form className="space-y-4" onSubmit={onSubmitUpdateAddress} >
                                        <div>
                                            <label htmlFor='firstName' className="block text-sm font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={addressData.fullName}
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
                                                value={addressData.houseNo}
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
                                                value={addressData.subDistrict}
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
                                                value={addressData.district}
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
                                                value={addressData.province}
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
                                        <div>
                                            <label className="flex items-center space-x-2">
                                                <input type="radio" value={1} name="addressStatusId" onChange={handleInput} />
                                                <span>Set as Default</span>
                                                <input type="radio" value={3} name="addressStatusId" onChange={handleInput} />
                                                <span>Set none</span>
                                            </label>
                                        </div>

                                        <div className="flex justify-end gap-2">
                                            <DialogClose asChild>
                                                <button type="button" className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                                    Cancel
                                                </button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <button type="submit" className="px-4 py-2 text-sm text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                                    Save
                                                </button>
                                            </DialogClose>
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
