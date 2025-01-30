"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { IoMdMore } from "react-icons/io";
import { CircleUser, ShoppingCart } from "lucide-react";
import SearchInput from "./SearchInput";
import { signOut, useSession } from "next-auth/react";
import { getUserById } from "../service/profile/service";
import { userInterface } from "../interface/userInterface";
import { useRouter } from "next/navigation";
import SwitchTheme from "./SwitchTheme";
import { useCart } from "@/app/context/cartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import SkeletonNavbarUI from "./skeletonNavbarUI";


export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { amountItem } = useCart();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isMenuMore, setIsMenuMore] = useState(false);
  const [user, setUser] = useState<userInterface>();
  // const handleToggleDropdown = () => {
  //   setToggleDropdown(!toggleDropdown);
  // };
  const fetchdata = async () => {
    if (!session?.user?.id) {
      console.error("User ID is missing.");
      return;
    }
    try {
      const data = await getUserById(Number(session.user.id));
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (status === "loading") {
    return null;
  }

  useEffect(() => {
    if (session?.user?.id)
      fetchdata();
  }, [session]);

  return (
    <>
      <div className="h-18 md:h-20 relative bg-white dark:bg-black dark:border-b  flex justify-between items-center text-black py-2 px-8 md:px-32  drop-shadow-md z-30">
        {/* Logo */}
        <Link href="/" className="flex text-xl w-[176px] hover:scale-105 transition-all">
          <span className="text-black dark:text-white font-extrabold">SHOP</span>
          <span className="text-primary font-black">KUB</span>
        </Link>


        {/* Search */}
        <SearchInput />

        {/* Menu */}
        <ul className="hidden md:flex items-center text-accent-foreground gap-10 text-base">
          <li className="text-lg  hover:text-gray-500 hover:cursor-pointer">
            <SwitchTheme />
          </li>
          <li className="text-lg  hover:text-gray-500 hover:cursor-pointer relative">
            <Link href="/cart">
              <ShoppingCart className="w-7 h-7" />
            </Link>
            <div className="rounded-full bg-red-600 flex justify-center items-center text-white w-6 h-6 absolute bottom-0 right-0" style={{ transform: 'translate(50%, 50%)' }}>
              {amountItem}
            </div>

          </li>

          <li className="text-lg  hover:text-gray-500 hover:cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  {session ? (
                    <div className="flex items-center cursor-pointer">
                      <img className="w-10 h-10 rounded-full border border-black object-cover" src={user?.profile} alt={user?.name} />
                    </div>
                  ) : (
                    <span className="flex cursor-pointer">
                      <CircleUser className="w-7 h-7" />
                    </span>
                  )}
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                  {!session ? (
                    <DropdownMenuItem>
                      <Link href="/login" className="w-full">เข้าสู่ระบบ</Link>
                    </DropdownMenuItem>
                  ) : (
                    <>
                      {session.user.roleId !== "1" && (
                        <DropdownMenuItem>
                          <Link href="/admin" className="w-full">แดชบอร์ดผู้ดูแลระบบ</Link>
                        </DropdownMenuItem>
                      )}
                      {Boolean(session?.user?.storeId) && (
                        <DropdownMenuItem>
                          <Link href={`/store/${session.user.storeId}`} className="w-full">ร้านค้าของฉัน</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Link href="/profile" className="w-full">โปรไฟล์</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/favorite" className="w-full">สินค้าที่ชอบ</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => { signOut(); router.push("/"); }}>
                        ออกจากระบบ
                      </DropdownMenuItem>
                    </>
                  )}
                {/* </Suspense> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>

        <IoMdMore
          className="w-7 h-7 md:hidden block cursor-pointer"
          onClick={() => setIsMenuMore(!isMenuMore)}
        />

        <div
          className={`z-50 absolute md:hidden top-14 left-0 w-full bg-white flex flex-col items-center gap-6 
        font-semibold text-lg transform transition-transform ${isMenuMore ? "block" : "hidden"
            }`}
          style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
          <li className="list-none w-full text-center p-4 transition-all cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li className="list-none w-full text-center p-4 transition-all cursor-pointer">
            <Link href="/cart">Cart</Link>
          </li>
          <li className="list-none w-full text-center p-4 transition-all cursor-pointer">
            <Link href="/profile">Account</Link>
          </li>
        </div>
      </div >
    </>
  );
}
