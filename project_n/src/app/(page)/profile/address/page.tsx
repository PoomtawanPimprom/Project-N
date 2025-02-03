"use client";

import React, { useEffect, useState } from 'react';
import MenuLeft from '../menuleft';
import { Separator } from "@/app/components/ui/separator"
import { deleteAddress, getUserAddress } from "@/app/service/address/service";
import { userAddressInterface } from "@/app/interface/userAddressInterface";
import { useSession } from "next-auth/react";
import { userInterface } from "@/app/interface/userInterface";
import { getUserById } from "@/app/service/profile/service";
import { FaRegTrashAlt } from "react-icons/fa";
import { CreateAddressDialog } from "./CreateAddressDialog";
import { EditAddressDialog } from "./EditAddressDialog";


export default function editAddress() {
    const { data: session } = useSession();
    const [addresses, setAddresses] = useState<userAddressInterface[]>([]);
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
            <div className="dark:bg-background container mx-auto flex flex-col lg:flex-row py-6 gap-4 px-4 sm:px-6 lg:px-8">
                <MenuLeft checkCreatedStore={session?.user.storeId} profile={userData} />
                {/* Content right */}
                <div className="dark:bg-zinc-800 flex flex-col lg:w-3/4 gap-4 border rounded-lg shadow-md p-4 sm:p-6 sm:shadow-none sm:border-black">

                    <div className='dark:text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                        <h1 className='text-2xl font-bold'>ที่อยู่ของฉัน</h1>

                        {/* Create Addresses */}
                        <CreateAddressDialog onAddressCreated={fetchAddressData} userId={Number(session?.user.id)}/>
                    </div>

                    <Separator className='dark:bg-white' />

                    {/* Fetch list data */}
                    {addresses.map((address) => (
                        <div key={address.id} className="flex flex-col gap-2 p-4  rounded-lg">

                            <div className="dark:bg-zinc-700 p-4 rounded-xl shadow-md space-y-4">
                                {/* ชื่อและเบอร์โทร */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="dark:text-white text-lg font-semibold text-gray-900">
                                        {address.fullName || "No Name"}
                                    </h1>
                                    <span className="dark:text-white text-gray-600 text-sm">|</span>
                                    <p className="dark:text-white text-gray-600 text-sm">{address.mobile || "No Number"}</p>
                                    {/* Show Tag Default */}
                                    {address.addressStatusId === 2 && (
                                        <span className="ml-2 px-2 py-1 text-xs font-semibold  bg-green-500 rounded-lg">
                                            Default
                                        </span>
                                    )}
                                </div>

                                {/* ข้อมูลที่อยู่ */}
                                <div className="dark:text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                                    <p>
                                        <span className="font-medium">บ้านเลขที่: </span>
                                        {address.houseNo || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-medium">หมู่: </span>
                                        {address.moo || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-medium">จังหวัด: </span>
                                        {address.province || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-medium">อำเภอ: </span>
                                        {address.district || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-medium">ตำบล: </span>
                                        {address.subDistrict || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-medium">รหัสไปรษณีย์: </span>
                                        {address.postalCode || "N/A"}
                                    </p>
                                </div>

                                {/* ปุ่มสำหรับการจัดการ */}
                                <div className="flex justify-end">
                                    <EditAddressDialog address={address} onAddressUpdated={fetchAddressData}/>
                                   
                                    <button onClick={() => deleteDataAddress(address.id)} className="ml-1 self-end text-sm px-4 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            </div>

                            {/* Dialog for editing the address */}

                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}