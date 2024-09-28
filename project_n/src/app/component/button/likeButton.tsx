import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
interface prop {
  productId: number;
  userId: string;
}

const LikeButton = () => {
  return (
    <>
      <button className="flex bg-white border h-10 w-10 rounded-full justify-center items-center">
        <FaHeart/>
      </button>
    </>
  );
};

export default LikeButton;
