import React from "react";

interface CouponProps {
  title: string;
  discount: string;
}

const CouponCard: React.FC<CouponProps> = ({ title, discount }) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg w-full">

      {/* <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-white rounded-r-full"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-white rounded-l-full"></div> */}


      <h2 className="text-sm font-bold uppercase">{title}</h2>
      <p className="text-3xl font-extrabold">{discount}</p>
    </div>
  );
};

export default CouponCard;
