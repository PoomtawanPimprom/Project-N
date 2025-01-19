"use client";
import React, { useEffect, useState } from 'react'
import { userInterface } from '@/app/interface/userInterface';
import Image from 'next/image'
import tree from '../../../../public/pngtree.png'
import { useToast } from "@/hooks/use-toast";
import MenuLeft from './menuleft'
import { getUserById, updateUserById } from '@/app/service/profile/service';

// ManageFirebase
import { storage } from "@/lib/firebase/firebase";
import { v4 } from "uuid";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Profile() {

    const { toast } = useToast();
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
        resetToken: "",
        resetTokenExp: new Date(),
    });

    //new image
    const [imageLogo, setImageLogo] = useState<File | null>(null);

    //file name
    const [oldLogoImageFileName, setOldLogoImageFileName] = useState<string | null | undefined>(undefined);
    //old image preview
    const [oldLogo, setOldLogo] = useState<string>("");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<{ [key: string]: { message: string }; } | null>(null);

    // Set file image & Create image url
    const handleLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        // console.log(file);
        if (file) {
            // if (oldLogo) URL.revokeObjectURL(oldLogo);
            setImageLogo(file);
            setOldLogo(URL.createObjectURL(file));

            await handelOnSubmit({
                preventDefault: () => {},
            } as React.FormEvent);
        }

    };

    useEffect(() => {
        console.log("Updated imageLogo state:", imageLogo);
        console.log("Updated oldLogo state:", oldLogo);
    }, [imageLogo, oldLogo]);

    const handelOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newImagelogoFileName = v4();

        try {
            setUploading(true);
            let logoUrl = "";

            if (imageLogo) {
                if (oldLogoImageFileName) {
                    const storageOldLogoRef = ref(storage, `profile/${oldLogoImageFileName}`);

                    await deleteObject(storageOldLogoRef);
                }
                const storageLogoRef = ref( storage, `profile/${newImagelogoFileName}`);


                await uploadBytes(storageLogoRef, imageLogo);

                logoUrl = await getDownloadURL(storageLogoRef);
            }
            const data = {
                imageLogoURL: imageLogo ? logoUrl : "",
                imageLogoFileName: imageLogo ? newImagelogoFileName : "",
            };
            await updateUserById(storeID, data);
            toast({
                description: "บันทึกข้อมูลสำเร็จ",
            });

        } catch (error: any) {
            toast({
                variant: "destructive",
                description: "บันทึกไม่สำเร็จ"
            })
            //delete images on firebase
            const deleteLogoRef = ref(storage, `store/logo/${newImagelogoFileName}`);

            deleteObject(deleteLogoRef)
                .then(() => {
                    console.log("delete logo successful");
                })
                .catch((error: any) => {
                    console.log(error.message);
                });
            if (error.fieldErrors) {
                setError(error.fieldErrors); // ตั้งค่าข้อผิดพลาดโดยตรง
            }
        } finally {
            setUploading(false);
        }
    };


    const fetchUserData = async () => {
        const res = await getUserById(1);
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
                    <form onSubmit={onSubmitUpdate} action="" className="bg-white border-0 shadow-md border-black p-6 rounded-lg space-y-4 sm:border sm:shadow-none">
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

                                value={userData.birthdate ? new Date(userData.birthdate).toISOString().split("T")[0] : ""}
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
                            onChange={handleLogoFileChange}
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

export default Profile