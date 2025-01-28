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
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [subDistricts, setSubDistricts] = useState<subDistrict[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string | number>(); //id
    const [selectedDistrict, setSelectedDistrict] = useState<string | number>(); //id
    const [selectedSubDistrict, setSelectedSubDistrict] = useState<string | number>(); //id
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
        // const userAddress = await getUserAddress(Number(session?.user.id));
        const userAddress = await getUserAddress(1);
        setAddresses(userAddress)
    }

    const fetchUserData = async () => {
        // const res = await getUserById(Number(session?.user.id));
        const res = await getUserById(1);
        setUserData(res);
    }

    // Fetch provinces
    const fetchData = async () => {
        try {
            const res = await fetch(
                "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
            );
            const json = await res.json();
            setProvinces(json);
        } catch (err: any) {
            console.error("Error fetching data:", err.message);
        }
    };

    // Handle province change
    const onChangeProvince = async (event: React.ChangeEvent<HTMLSelectElement>) => {

        const index = event.target.selectedIndex;
        const label = event.target.options[index].text;
        const provinceId = event.target.value;
        try {
            setSelectedProvince(provinceId);
            setSelectedDistrict(undefined); // Reset districts and sub-districts
            setSelectedSubDistrict(undefined);
            setDistricts([]);
            setSubDistricts([]);
            setAddressData(prevState => ({
                ...prevState,
                province: label,
                postalCode: "",
            }));
            const res = await fetch(
                "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"
            );
            const json = await res.json();
            const filteredDistricts = json.filter(
                (item: any) => item.province_id === Number(provinceId)
            );
            setDistricts(filteredDistricts);
        } catch (err: any) {
            console.error("Error fetching districts:", err.message);
        }
    };
    // Handle district change
    const onChangeAmphure = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const index = event.target.selectedIndex;
        const label = event.target.options[index].text;
        const amphureId = event.target.value;
        try {
            setSelectedDistrict(amphureId);
            setSelectedSubDistrict(undefined); // Reset sub-districts
            setSubDistricts([]);
            setAddressData(prevState => ({
                ...prevState,
                district: label,
                postalCode: "",
            }));

            const res = await fetch(
                "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json"
            );
            const json = await res.json();
            const filteredSubDistrict = json.filter(
                (item: any) => item.amphure_id === Number(amphureId)
            );
            setSubDistricts(filteredSubDistrict);
        } catch (err: any) {
            console.error("Error fetching sub-districts:", err.message);
        }
    };
    const onChangeSubDistrict = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const index = event.target.selectedIndex;
        const label = event.target.options[index].text;
        const subDistrictId = Number(event.target.value);

        // Find the selected sub-district data
        const selectedSubDistrictData = subDistricts.find((item) => item.id === subDistrictId);
        setAddressData(prevState => ({
            ...prevState,
            subDistrict: label,
            postalCode: String(selectedSubDistrictData?.zip_code), // Update postalCode
        }));
        setSelectedSubDistrict(event.target.value);
    };

    useEffect(() => {
        fetchAddressData();
        fetchUserData();
        fetchData();
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
                        <Dialog>
                            <DialogTrigger asChild className="self-end">
                                <button onClick={() => {
                                    setAddressData(prevState => ({
                                        ...prevState,
                                        fullName: '',
                                        houseNo: '',
                                        moo: '',
                                        province: '',
                                        district: '',
                                        subDistrict: '',
                                        postalCode: '',
                                        mobile: '',
                                    }))
                                }} className='w-full sm:w-auto px-4 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>+ เพิ่มที่อยู่</button>
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
                                        <input type="text" id="fullName" name="fullName" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="ชื่อ-นามสกุล" />
                                    </div>
                                    <div>
                                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">เบอร์มือถือ</label>
                                        <input type="text" id="mobile" name="mobile" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="เบอร์มือถือ" />
                                    </div>
                                    <div>
                                        <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700">บ้านเลขที่</label>
                                        <input type="text" id="houseNo" name="houseNo" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="บ้านเลขที่" />
                                    </div>
                                    <div>
                                        <label htmlFor="moo" className="block text-sm font-medium text-gray-700">หมู่</label>
                                        <input type="text" id="moo" name="moo" onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="หมู่" />
                                    </div>
                                    <div>
                                        {/* Province Dropdown */}
                                        <Dropdown
                                            label="จังหวัด"
                                            options={provinces}
                                            value={selectedProvince}
                                            onChange={onChangeProvince}
                                            optionLabel={(item) => `${item.name_th}`}
                                            optionValue={(item) => item.id}
                                        />
                                    </div>

                                    <div>
                                        {/* District Dropdown */}
                                        <Dropdown
                                            label="อำเภอ"
                                            options={districts}
                                            value={selectedDistrict}
                                            onChange={onChangeAmphure} // Pass event directly
                                            optionLabel={(item) => `${item.name_th}`}
                                            optionValue={(item) => item.id}
                                        />
                                    </div>

                                    <div>
                                        {/* Sub-District Dropdown */}
                                        <Dropdown
                                            label="ตำบล"
                                            options={subDistricts}
                                            value={selectedSubDistrict}
                                            onChange={onChangeSubDistrict}
                                            optionLabel={(item) => `${item.name_th}`}
                                            optionValue={(item) => item.id}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">รหัสไปรษณีย์</label>
                                        <input type="text" id="postalCode" name="postalCode" value={addressData.postalCode} onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="Postal Code" />
                                    </div>

                                    <div>
                                        <label className="flex items-center space-x-2">
                                            <input type="radio" value={2} name="addressStatusId" onChange={handleInput} />
                                            <span>Set as Default</span>
                                            <input type="radio" value={1} name="addressStatusId" onChange={handleInput} />
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

                                    <Dialog>
                                        <DialogTrigger asChild onClick={() => {
                                            setAddressData(address);
                                            // อัปเดตค่าใน state ให้ตรงกับ address ที่เลือก
                                            // const provinceId = provinces.find((item) => item.name_th === address.province)
                                            // const selectedProvinceId = provinces.find((item) => item.name_th === address.province)?.id;
                                            // const selectedDistrictId = districts.find((item) => item.name_th === address.district)?.id;
                                            // const selectedSubDistrictId = subDistricts.find((item) => item.name_th === address.subDistrict)?.id;

                                            // setSelectedProvince(selectedProvinceId);
                                            // setSelectedDistrict(selectedDistrictId);
                                            // setSelectedSubDistrict(selectedSubDistrictId);
                                        }}>
                                            <button className="ml-1 self-end text-sm px-4 py-2 text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                                <MdEdit />
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
                                                        placeholder="บ้านเลขที่"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="moo" className="block text-sm font-medium text-gray-700">หมู่</label>
                                                    <input type="text" id="moo" name="moo" value={addressData.houseNo} onChange={handleInput} className="focus:outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm" placeholder="หมู่" />
                                                </div>
                                                <div>
                                                    <Dropdown
                                                        label="จังหวัด"
                                                        options={provinces}
                                                        value={selectedProvince}
                                                        onChange={onChangeProvince}
                                                        optionLabel={(item) => `${item.name_th}`}
                                                        optionValue={(item) => item.id}
                                                    />
                                                </div>
                                                <div>
                                                    {/* District Dropdown */}
                                                    <Dropdown
                                                        label="District"
                                                        options={districts}
                                                        value={selectedDistrict}
                                                        onChange={onChangeAmphure} // Pass event directly
                                                        optionLabel={(item) => `${item.name_th}`}
                                                        optionValue={(item) => item.id}
                                                    />
                                                </div>
                                                <div>
                                                    {/* Sub-District Dropdown */}
                                                    <Dropdown
                                                        label="Sub-district"
                                                        options={subDistricts}
                                                        value={selectedSubDistrict}
                                                        onChange={onChangeSubDistrict}
                                                        optionLabel={(item) => `${item.name_th}`}
                                                        optionValue={(item) => item.id}
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
                                                        <input type="radio" value={2} name="addressStatusId" onChange={handleInput} />
                                                        <span>Set as Default</span>
                                                        <input type="radio" value={1} name="addressStatusId" onChange={handleInput} />
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