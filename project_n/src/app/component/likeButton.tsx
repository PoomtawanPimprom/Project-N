"use client";
import { favoriteInterface } from "@/app/interface/favoriteInterface";
import {
  createFavorite,
  deleteFavoriteByid,
  getFavoriteByProductIdAndUserId,
} from "@/app/service/favorite/service";
import { Heart } from "lucide-react";
import { useUser } from "../context/userContext";
import { FaHeart } from "react-icons/fa";
import React, { useState } from "react";

interface propInterface {
  productId: number;
}

const LikeButton = (prop: propInterface) => {
  const { user } = useUser();
  const [isFavoritedStatus, setIsFavoritedStatus] = useState<boolean | undefined>(undefined);
  const [favoriteData, setFavoriteData] = useState<favoriteInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    if (!user) return;
    const dataFavorite = await getFavoriteByProductIdAndUserId(
      prop.productId,
      user.id
    );
    setFavoriteData(dataFavorite);
    setIsFavoritedStatus(dataFavorite.length > 0); // อัปเดตสถานะทันที
  };

  const handleOnClick = async () => {
    if (!user || isLoading) return;

    setIsLoading(true);

    // ถ้ายังไม่เคย fetch ข้อมูลเลย ให้ดึงมาก่อน
    if (isFavoritedStatus === undefined) {
      await fetchData();
    }

    // ตรวจสอบสถานะอัปเดตล่าสุด
    if (isFavoritedStatus) {
      if (favoriteData.length > 0) {
        await deleteFavoriteByid(favoriteData[0].id);
        
      }
    } else {
      await createFavorite({
        userId: Number(user.id),
        productId: prop.productId,
      });
    }

    await fetchData(); // ดึงข้อมูลใหม่หลังจากเพิ่ม/ลบ Favorite
    setIsLoading(false);
  };

  return (
    <button
      onClick={async (e) => {
        e.stopPropagation();
        await handleOnClick();
      }}
      className={`flex z-50 border h-10 w-10 rounded-full justify-center items-center 
        ${isLoading ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="animate-spin border-2 border-gray-400 border-t-transparent rounded-full w-5 h-5"></div>
      ) : isFavoritedStatus ? (
        <FaHeart className="w-5 h-5 text-red-500" />
      ) : (
        <Heart className="w-5 h-5" />
      )}
    </button>
  );
};

export default LikeButton;
