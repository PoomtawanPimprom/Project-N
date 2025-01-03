"use client";
import React, { useEffect, useState } from 'react'
import { userInterface } from '@/app/interface/userInterface';
import Image from 'next/image'
import tree from '../../../../public/pngtree.png'
import MenuLeft from './menuleft'
import { getUserById, updateUserById } from '@/app/service/profile/service';

function profile() {
    const [userData, setUserData] = useState<userInterface>({
        id: 0,
        name: "",
        username: "",
        password: "",
        email: "",
        mobile: 0,
        birthdate: new Date(),
        profile: "",
        saler: false,
        genderId: 0,
        roleId: 0,
        userStatusId: 0,
        userAddressId: 0,
    });


    const fetchUserData = async () => {
        const res = await getUserById(3);
        setUserData(res);
        console.log(res);
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    const onSubmitUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(userData)
            await updateUserById(userData.id, {
                name: userData.name,
                username: userData.username,
                password: userData.password,
                email: userData.email,
                mobile: userData.mobile,
                birthdate: userData.birthdate,
                profile: userData.profile,
                saler: userData.saler,
                genderId: userData.genderId,
                roleId: userData.roleId,
                userStatusId: userData.userStatusId,
                userAddressId: userData.userAddressId,
            });
    
            alert("Profile updated successfully!");
        } catch (error: any) {
            console.error("Failed to update profile:", error.message);
            alert(`Failed to update profile: ${error.message}`);
        }
    };
    





    return (
        <section id="profile">
            <div className="container mx-auto flex flex-col lg:flex-row py-6 gap-4 px-4 sm:px-6 lg:px-8">

                <MenuLeft />

                {/* Content right */}
                <div className="flex flex-col gap-6 lg:w-3/4 z-50">
                    {/* Form Section */}
                    <form  onSubmit={onSubmitUpdate}  action="" className="bg-white border-0 shadow-md border-black p-6 rounded-lg space-y-4 sm:border sm:shadow-none">
                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                อีเมล
                            </label>
                            <input
                                type="email"
                                id="email"
                                defaultValue={userData.email}
                                onChange={(e) => {
                                    setUserData((prevData) => ({
                                        ...prevData,
                                        email: e.target.value,
                                    }));
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:w-1/2"
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                เบอร์โทรศัพท์
                            </label>
                            <input
                                type="text"
                                id="mobile"
                                value={userData.mobile}
                                onChange={(e) => {
                                    setUserData((prevData) => ({
                                        ...prevData,
                                        mobile: Number(e.target.value),
                                    }));
                                }}
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:w-1/3"
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="birthdate"
                                name="birthdate"

                                value={
                                    userData.birthdate instanceof Date
                                        ? userData.birthdate.toISOString().split("T")[0] // แปลง Date เป็น YYYY-MM-DD
                                        : ""
                                }
                                onChange={(e) => {
                                    setUserData((prevData) => ({
                                        ...prevData,
                                        birthdate: new Date(e.target.value), // แปลงค่าใน input กลับเป็น Date
                                    }));
                                }}
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