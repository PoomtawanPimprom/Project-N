"use client";
import { useEffect, useState } from "react";
import MenuLeft from "../menuleft";
import { userInterface } from "@/app/interface/userInterface";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { getUserById } from "@/app/service/profile/service";
import CouponCard from "./components/CouponCard"; // Import คูปองที่เราสร้าง
import { discountInterface } from "@/app/interface/discountInterface";
import { getUsedDiscount } from "@/app/service/usedDiscount/service";
import { Separator } from "@/app/components/ui/separator";

export default function Voucher() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [ coupon , setCoupon ] = useState<discountInterface[]>([]);
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

  const fetchUsedCoupon = async () => {
    const res = await getUsedDiscount();
    setCoupon(res);
    console.log(res)
  }

  const fetchUserData = async () => {
    const res = await getUserById(Number(session?.user.id));
    setUserData(res);
  };

  useEffect(() => {
    fetchUsedCoupon();
    fetchUserData();
  }, [session]);

  return (

    <section id="profile">
      <div className="dark:bg-background container mx-auto flex flex-col lg:flex-row py-6 gap-4 px-4 sm:px-6 lg:px-8">
        {/* เมนูซ้าย */}
        <MenuLeft checkCreatedStore={session?.user.storeId} profile={userData} />
        <div className="dark:bg-zinc-800 flex flex-col lg:w-3/4 gap-4 border rounded-lg shadow-md p-4 sm:p-6 sm:shadow-none sm:border-black">
 
          {/* ส่วนของคูปอง */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">คูปองของคุณ</h2>
            <Separator className='dark:bg-white mb-6' />
            {/* Grid คูปอง */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {coupon.map((item) => (
                <CouponCard key={item.id} title={item.name} code={item.code} discount={item.discountAmount}  />
              ))}

          
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
