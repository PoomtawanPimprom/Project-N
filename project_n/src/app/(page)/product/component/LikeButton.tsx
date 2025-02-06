"use client";

import { favoriteInterface } from "@/app/interface/favoriteInterface";
import { createFavorite, deleteFavoriteByid, getFavoriteByProductIdAndUserId } from "@/app/service/favorite/service";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface propInterface {
    productId: number;
    userId: number;
}

export default function LikeButtonProductPage(prop: propInterface) {
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const [favoriteData, setFavoriteData] = useState<favoriteInterface | null>(null);

  const fetchData = async () => {
    const dataFavorite = await getFavoriteByProductIdAndUserId(prop.productId, prop.userId);
    setFavoriteData(dataFavorite);
    setIsFavorite(dataFavorite !== null); // อัปเดต isFavorite เมื่อได้ข้อมูล
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnClick = async () => {
    if (isFavorite === null) return; // ป้องกันกรณีค่า null
    
    setIsFavorite(!isFavorite); // อัปเดต UI ทันที
    
    if (isFavorite) {
      await deleteFavoriteByid(favoriteData!.id);
    } else {
      const data = {
        userId: prop.userId,
        productId: prop.productId,
      };
      await createFavorite(data);
    }
    
    fetchData(); // รีเฟรชข้อมูลจากเซิร์ฟเวอร์
  };

  return (
    <button 
      onClick={handleOnClick}
      className="px-2 py-2 w-full h-full rounded-md border border-gray-300 hover:border-gray-600 text-2xl duration-50"
    >
      {isFavorite ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart className="hover:text-red-500" />
      )}
    </button>
  );
}
