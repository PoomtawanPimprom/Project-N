"use client";
import { useState } from "react";
import Link from "next/link";
import { IoMdMore } from "react-icons/io";
import { CircleUser, ShoppingCart } from "lucide-react";
import SearchInput from "./SearchInput";
import { signOut, useSession } from "next-auth/react";
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
import { useUser } from "../context/userContext";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {user} = useUser()
  const {  item, itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false); // state สำหรับ hover
  const [isMenuMore, setIsMenuMore] = useState(false);

  if (status === "loading") return null;

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
        <ul className="hidden md:flex items-center text-accent-foreground gap-x-8 text-base whitespace-nowrap flex-nowrap">
          <li className=" hover:text-gray-500 hover:cursor-pointer">
            <SwitchTheme />
          </li>

          {/* Cart Dropdown */}
          <li className="relative flex items-center justify-center hover:text-gray-500 hover:cursor-pointer "
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
          >
            <DropdownMenu open={isCartOpen}>
              <DropdownMenuTrigger asChild>
                <Link href="/cart" className="relative" onClick={(e) => e.stopPropagation()}>
                  <ShoppingCart className="w-7 h-7 cursor-pointer" />
                  <div className="rounded-full bg-red-600 flex justify-center items-center text-white w-5 h-5 absolute bottom-0 right-0" style={{ transform: 'translate(50%, 50%)' }}>
                    {itemCount}
                  </div>
                </Link>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="center" className="w-64 bg-white dark:bg-black shadow-md">
                {item.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">ไม่มีสินค้าในตะกร้า</div>
                ) : (
                  <>
                    <DropdownMenuLabel className="text-center font-semibold">
                      สินค้าในตะกร้า ({item.length} รายการ)
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {item.map((cart) => (
                      <DropdownMenuItem key={cart.id} className="flex items-center gap-2 p-2">
                        <img src={cart.product?.image!.image1} alt={cart.product?.name} className="w-12 h-12 rounded-md object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{cart.product?.name}</p>
                          <p className="text-xs text-gray-500">฿{cart.product?.price} x {cart.quantity}</p>
                        </div>
                      </DropdownMenuItem>
                    ))}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      <Link href="/cart" className="w-full text-center text-primary font-bold">
                        ไปที่ตะกร้าสินค้า
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>

          <li className=" hover:text-gray-500 hover:cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {user !== null ? (
                  <div className="flex items-center cursor-pointer">
                    <img className="dark:border-white w-10 h-10 rounded-full border border-black object-cover" src={user?.profile} alt={user?.name} />
                  </div>
                ) : (
                  <span className="flex cursor-pointer">
                    <CircleUser className="w-7 h-7" />
                  </span>
                )}
              </DropdownMenuTrigger>

              <DropdownMenuContent align="center" className="w-48">
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

        {/* Mobile Menu */}
        <div
          className={`z-50 absolute md:hidden top-14 left-0 w-full flex flex-col items-center gap-6 
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
