"use client";
import React, { useState } from "react";
import { Clipboard, Check } from "lucide-react";

interface CouponProps {
  title: string;
  code: string;
  discount: number;
}

const CouponCard: React.FC<CouponProps> = ({ title, code, discount }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000); 
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 sm:p-6 rounded-xl shadow-md w-full">
      <h2 className="text-xs sm:text-sm font-bold uppercase">{title}</h2>
      <p className="text-2xl sm:text-3xl font-extrabold mt-3">${discount} ส่วนลด</p>

      <div className="flex items-center justify-between bg-white text-black px-3 py-2 rounded-md mt-2 text-xs sm:text-sm">
        <span className="font-semibold">{code}</span>
        <button  onClick={handleCopy}  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition w-full sm:w-auto">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Clipboard className="w-4 h-4" />}
          <span>{copied ? "คัดลอกแล้ว!" : "คัดลอก"}</span>
        </button>
      </div>

    </div>
  );
};

export default CouponCard;
