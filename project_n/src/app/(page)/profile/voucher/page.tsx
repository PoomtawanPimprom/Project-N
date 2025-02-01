"use client";
import { useEffect, useState } from "react";
import MenuLeft from "../menuleft";
import { userInterface } from "@/app/interface/userInterface";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { getUserById } from "@/app/service/profile/service";
import CouponCard from "../voucher/components/CouponCard"; // Import คูปองที่เราสร้าง

export default function Voucher() {
  const { data: session } = useSession();
  const { toast } = useToast();
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

  const fetchUserData = async () => {
    const res = await getUserById(1);
    setUserData(res);
  };

  useEffect(() => {
    fetchUserData();
  }, [session]);

  return (
    <section id="profile">
      <div className="container mx-auto flex flex-col lg:flex-row py-6 gap-4 px-4 sm:px-6 lg:px-8">
        {/* เมนูซ้าย */}
        <MenuLeft checkCreatedStore={session?.user.storeId} profile={userData} />

        {/* ส่วนของคูปอง */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">คูปองของคุณ</h2>

          {/* Grid คูปอง */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <CouponCard title="CAKES R US" discount="$5 off"  />
            <CouponCard title="COFFEE SHOP" discount="10% off" />
            <CouponCard title="BURGER KING" discount="Buy 1 Get 1" />
          </div>
        </div>
      </div>
    </section>
  );
}
