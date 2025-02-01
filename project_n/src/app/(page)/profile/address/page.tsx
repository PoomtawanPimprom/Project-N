"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog"

import React, { useEffect, useState } from 'react';
import MenuLeft from '../menuleft';
import { Separator } from "@/app/components/ui/separator"
import { createAddress, deleteAddress, getUserAddress, updateUserAddress } from "@/app/service/address/service";
import { userAddressInterface } from "@/app/interface/userAddressInterface";
import { useSession } from "next-auth/react";
import { userInterface } from "@/app/interface/userInterface";
import { getUserById } from "@/app/service/profile/service";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { CreateAddressDialog } from "./CreateAddressDialog";
import { EditAddressDialog } from "./EditAddressDialog";

type Province = {
    id: number;
    name_th: string;
    name_en: string;
};
type District = {
    id: number;
    province_id: number;
    name_th: string;
    name_en: string;
};
type subDistrict = {
    id: number,
    zip_code: number,
    name_th: string,
    name_en: string,
    amphure_id: number,
}
type DropdownProps<T> = {
    label: string;
    options: T[];
    value: string | number | undefined;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    optionLabel: (item: T) => string;
    optionValue: (item: T) => string | number;
};

const Dropdown = <T,>({
    label,
    options,
    value,
    onChange,
    optionLabel,
    optionValue,
}: DropdownProps<T>) => {
    return (
        <div>
            <label htmlFor={label} className="block text-sm font-medium text-gray-700">{label}</label>
            <select
                id={label}
                value={value ?? ""}
                onChange={onChange}
                className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
            >
                <option value="">เลือก...</option>
                {options.map((item, index) => (
                    <option key={index} value={optionValue(item)}>
                        {optionLabel(item)}
                    </option>
                ))}

            </select>
        </div>
    );
};

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
            <div className="container mx-auto flex flex-col lg:flex-row py-6 gap-4 px-4 sm:px-6 lg:px-8">
                <MenuLeft checkCreatedStore={session?.user.storeId} profile={userData} />
                {/* Content right */}
                <div className="flex flex-col lg:w-3/4 gap-4 bg-white border rounded-lg shadow-md p-4 sm:p-6 sm:shadow-none sm:border-black">

                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                        <h1 className='text-lg font-semibold'>ที่อยู่ของฉัน</h1>

                        {/* Create Addresses */}
                        <CreateAddressDialog onAddressCreated={fetchAddressData} userId={Number(session?.user.id)}/>
                    </div>

                    <Separator />

                    {/* Fetch list data */}
                    {addresses.map((address) => (
                        <div key={address.id} className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">

                            <div className="p-4 bg-white rounded-xl shadow-md space-y-4">
                                {/* ชื่อและเบอร์โทร */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-lg font-semibold text-gray-900">
                                        {address.fullName || "No Name"}
                                    </h1>
                                    <span className="text-gray-600 text-sm">|</span>
                                    <p className="text-gray-600 text-sm">{address.mobile || "No Number"}</p>
                                    {/* Show Tag Default */}
                                    {address.addressStatusId === 2 && (
                                        <span className="ml-2 px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-lg">
                                            Default
                                        </span>
                                    )}
                                </div>

                                {/* ข้อมูลที่อยู่ */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
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