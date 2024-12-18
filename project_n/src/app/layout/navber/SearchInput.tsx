"use client"
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchInput() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [search, setSearch] = useState(
      searchParams.get("search")?.toString || ""
    );
  
    const handleSearch = (value: string) => {
      const param = new URLSearchParams(searchParams);
      if (value) {
        param.set("search", value);
      } else {
        param.delete("search");
      }
      replace(`/?${param.toString()}`);
    };
  
    useEffect(() => {
      if (!searchParams.get("search")) {
        setSearch("");
      }
    }, [searchParams.get("search")]);
  return (
    <div className="relative hidden lg:flex items-center justify-center gap-3">
        <Search className="w-5 h-5 absolute left-3" />
        {/* <FiSearch className='w-5 h-5 absolute left-3'/> */}
        <input
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          value={search}
          type="text"
          placeholder="Search..."
          className="py-2 pl-10 pr-6 rounded-full border-2"
        />
      </div>
  )
}