"use client";
import { useEffect, useState } from "react";
import { LuTimer } from "react-icons/lu";
import { MdContentCopy } from "react-icons/md";

const DiscountCard = ({
  title = "ส่วนลดพิเศษ",
  discount = "50%",
  description = "ลดราคาสินค้าทั้งหมด",
  expiryDate = "31 ธ.ค. 2024",
  code = "SAVE50",
}) => {
  const [copying, setCopying] = useState(false);
  const handleCopy = async () => {
    try {
        await navigator.clipboard.writeText(code);
        setCopying(true);
        setTimeout(() => setCopying(false), 1000); 
      } catch (err) {
        console.error('Failed to copy:', err);
      }
  };
  return (
    <div className="border rounded-xl flex flex-col  w-[225px] h-[170px] lg:flex-row lg:w-[450px] lg:h-[100px]">
      <div className="  flex w-[225px] h-[40px] lg:h-[100px]  lg:w-[100px]  bg-red-500 text-white rounded-t-lg lg:rounded-l-xl justify-center items-center font-black text-xl">
        {discount}
      </div>
      <div className="flex w-full  lg:w-[350px] flex-col lg:flex-row justify-between">
        <div className="flex flex-col p-2">
          <p className="text-2xl font-bold">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
          <div className="flex flex-row text-sm text-gray-500 items-center">
            <LuTimer className="mr-1" />
            {expiryDate}
          </div>
        </div>
        <div className="flex flex-row  lg:flex-col p-2 ">
          <div className="flex px-4 py-2 bg-gray-400 rounded-xl font-bold justify-center lg:mb-2">
            {code}
          </div>
          <button 
          onClick={handleCopy}
          className="flex px-4 py-2 rounded-xl space-y-2 font-bold justify-center items-center text-blue-400 hover:bg-blue-400 hover:text-white duration-150 ">
            <MdContentCopy className="mr-1" />
            {copying ? 'คัดลอกแล้ว' : 'คัดลอก'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountCard;
