"use client"
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchInput() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [search, setSearch] = useState(
      searchParams.get("search")?.toString() || ""
    );

    const handleClickSearch = () =>{
      const param = new URLSearchParams(searchParams);
      if (search) {
        param.set("search", search);
        router.push(`/?${param.toString()}`); 
      }
    }

    useEffect(() => {
      if (!searchParams.get("search")) {
        setSearch("");
      }
    }, [searchParams.get("search")]);
  return (
    <div className="relative hidden  lg:flex items-center justify-center gap-3 py-2 pl-10 pr-2 rounded-full border-2">
        <Search className="w-5 h-5 text-accent-foreground absolute left-3" />
        {/* <FiSearch className='w-5 h-5 absolute left-3'/> */}
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          type="text"
          placeholder="Search..."
          className="focus:outline-none w-full dark:text-white bg-transparent text-gray-800 placeholder-gray-400"
      />
      <button 
        />
         <button 
        className="bg-primary hover:bg-primary-foreground text-white p-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center"
        onClick={handleClickSearch}
      >
        ค้นหา
      </button>
      </div>
  )
}