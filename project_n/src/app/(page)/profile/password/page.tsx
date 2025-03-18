"use client";
import { useEffect, useState } from "react";
import MenuLeft from "../menuleft";
import { Eye, EyeClosed } from "lucide-react";
import { userInterface } from "@/app/interface/userInterface";
import { getUserById, updateUserById } from "@/app/service/profile/service";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { updatePassword } from "@/app/service/password/service";
import { Separator } from "@/app/components/ui/separator";

export default function Password() {
    const { toast } = useToast();
    const { data: session } = useSession();
    const router = useRouter();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurPass, setShowCurPass] = useState(false);
    const [showNewPass, setNewPass] = useState(false);
    const [showConfirmPass, setConfirmPass] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast({
                title: "Error",
                description: "รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน",
                variant: "destructive",
            });
            return;
        }

        try {
            await updatePassword(Number(session?.user.id), {
                passwordCurrent: currentPassword,
                passwordNew: newPassword,
            });

            toast({
                title: "Success",
                description: "เปลี่ยนรหัสผ่านสำเร็จ",
                variant: "default",
            });

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            console.error("Error changing password:", error);
            toast({
                title: "Error",
                description: error.message || "เกิดข้อผิดพลาดขณะเปลี่ยนรหัสผ่าน",
                variant: "destructive",
            });
        }
    };

    const fetchUserData = async () => {
        const res = await getUserById(Number(session?.user.id));
        setUserData(res);
        console.log(res);
    }

    useEffect(() => {
        fetchUserData();
    }, [session]);

    return (
        <section id="profile">
            <div className="dark:bg-background  container mx-auto flex flex-col lg:flex-row py-6 gap-4 px-4 sm:px-6 lg:px-8">
                <MenuLeft checkCreatedStore={session?.user.storeId} profile={userData} />
                <div className="dark:bg-zinc-800 flex flex-col lg:w-3/4 gap-4 border rounded-lg shadow-md p-4 sm:p-6 sm:shadow-none sm:border-black">
                    <h2 className="text-2xl font-bold ">เปลี่ยนรหัสผ่าน</h2>
                    <Separator className='dark:bg-white' />
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="dark:text-white block text-sm font-medium text-gray-700">รหัสผ่านปัจจุบัน</label>
                            <div className="relative w-1/2">
                                <input
                                    type={showCurPass ? "text" : "password"}
                                    className="w-full border rounded-md p-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                                <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
                                    onClick={() => setShowCurPass(!showCurPass)}>
                                    {showCurPass ? <Eye /> : <EyeClosed />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="dark:text-white block text-sm font-medium text-gray-700">รหัสผ่านใหม่</label>
                            <div className="relative w-1/2">
                                <input
                                    type={showNewPass ? "text" : "password"}
                                    className="w-full border rounded-md p-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
                                    onClick={() => setNewPass(!showNewPass)}
                                >
                                    {showNewPass ? <Eye /> : <EyeClosed />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="dark:text-white block text-sm font-medium text-gray-700">ยืนยันรหัสผ่าน</label>
                            <div className="relative w-1/2">
                                <input
                                    type={showConfirmPass ? "text" : "password"}
                                    className="w-full border rounded-md p-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
                                    onClick={() => setConfirmPass(!showConfirmPass)}
                                >
                                    {showConfirmPass ? <Eye /> : <EyeClosed />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-1/2 bg-gray-500 text-white font-medium py-2 rounded-md hover:bg-gray-600 transition"
                        >
                            บันทึกการเปลี่ยนแปลง
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}