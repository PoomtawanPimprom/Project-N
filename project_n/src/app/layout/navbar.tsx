"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdMore } from "react-icons/io";
import { CircleUser, Moon, ShoppingCart } from "lucide-react";
import SearchInput from "./navber/SearchInput";
import { signOut, useSession } from "next-auth/react";
import { getUserById } from "../service/profile/service";
import { userInterface } from "../interface/userInterface";
import { useRouter } from "next/navigation";
import SwitchTheme from "./navber/SwitchTheme";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isMenuMore, setIsMenuMore] = useState(false);
  const [user, setUser] = useState<userInterface>();
  const handleToggleDropdown = () => {
    setToggleDropdown(!toggleDropdown);
  };
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
  }
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

  useEffect(() => {
    if (session?.user?.id) 
      fetchdata();
  }, [session]);

  return (
    <>
      {toggleDropdown && (
        <div
          className="fixed inset-0 bg-transparent z-30"
          onClick={() => setToggleDropdown(false)}
        />
      )}

      <div className="relative flex justify-between items-center text-black py-2 px-8 md:px-32 bg-white drop-shadow-md z-30">
        {/* Logo */}
        <Link href="/">
          <p className="text-lg font-bold text-primary hover:scale-105 transition-all">
            MATTER
          </p>
        </Link>

        {/* Search */}
        <SearchInput />

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-10 text-base">
          <li className="text-lg  hover:text-gray-500 hover:cursor-pointer">
            <SwitchTheme/>
          </li>
          <li className="text-lg  hover:text-gray-500 hover:cursor-pointer">
            <Link href="/cart">
              <ShoppingCart className="w-7 h-7" />
            </Link>
          </li>
          <li className="relative  text-lg  hover:text-gray-500 hover:cursor-pointer">
            {session ? (
              <>
                <button 
                className="flex items-center"
                onClick={handleToggleDropdown}>
                  <img className="block w-10 h-10 rounded-full border border-black object-cover" src={user?.profile} alt={user?.name} width={200} height={200}/>
                </button>
              </>
            ) : (
              <>
                <button onClick={handleToggleDropdown} className="flex ">
                  <CircleUser className="w-7 h-7" />
                </button>
              </>
            )}

            {toggleDropdown && (
              <>
                {!session ? (
                  <>
                    <div
                      className="fixed inset-0 z-50"
                      onClick={() => setToggleDropdown(false)}
                    />
                    <div className="absolute flex flex-col bg-white shadow-lg rounded-md mt-2 right-0">
                      <Link
                        href="/login"
                        className="flex px-12 py-4 hover:bg-gray-100 whitespace-nowrap"
                      >
                        Log in
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setToggleDropdown(false)}
                    />
                    <div className="absolute flex flex-col bg-white shadow-lg rounded-md mt-2 right-0">
                      {session.user.roleId === "2" && (
                        <Link
                          href="/admin"
                          className="px-12 py-2 hover:bg-gray-100 whitespace-nowrap"
                        >
                          Admin dashboard
                        </Link>
                      )}
                      {session.user.storeId !== "" && (
                        <Link
                          href={`/store/${session.user.storeId}`}
                          className="px-12 py-2 hover:bg-gray-100 whitespace-nowrap text-center"
                        >
                          ร้านค้าของฉัน
                        </Link>
                      )}
                      <Link
                        href="/profile"
                        className="px-12 py-2 hover:bg-gray-100 text-center"
                      >
                        โปรไฟล์
                      </Link>
                      <Link
                        href="/favorite"
                        className="px-8 py-2 hover:bg-gray-100 text-center"
                      >
                        สินค้าที่ชอบ
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          router.push("/");
                        }}
                        className="px-8 py-2  hover:bg-gray-100 text-center"
                      >
                        Log out
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </li>
        </ul>

        <IoMdMore
          className="w-7 h-7 md:hidden block cursor-pointer"
          onClick={() => setIsMenuMore(!isMenuMore)}
        />

        <div
          className={`z-50 absolute md:hidden top-14 left-0 w-full bg-white flex flex-col items-center gap-6 
        font-semibold text-lg transform transition-transform ${
          isMenuMore ? "block" : "hidden"
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
      </div>
    </>
  );
}
