"use client";

import { favoriteInterface } from "@/app/interface/favoriteInterface";
import { createFavorite, deleteFavoriteByid, getFavoriteByProductIdAndUserId } from "@/app/service/favorite/service";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface propInterface {
    productId: number;
    userId: number;
  }

export default function LikeButtonProductPage(prop:propInterface) {
  //favorite system
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const [favoriteData, setFavoriteData] = useState<favoriteInterface[]>([]);

  const fetchData = async () => {
    const dataFavorite = await getFavoriteByProductIdAndUserId(
      prop.productId,
      prop.userId
    );
    setFavoriteData(dataFavorite);
  };

  const hasValue = () => {
    if (Array.isArray(favoriteData) && favoriteData.length > 0) {
      return true; // มีข้อมูลใน array
    }
    return false;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const status = hasValue();
    console.log(status);
    setIsFavorite(status);
  }, [favoriteData]);

  const handleOnClick = async () => {
    if (isFavorite == true) {
      await deleteFavoriteByid(favoriteData[0].id);
    } else {
      const data = {
        userId: prop.userId,
        productId: prop.productId,
      };
      await createFavorite(data);
    }
    fetchData();
  };

  return (
    <button 
    onClick={handleOnClick}
    className="px-2 py-2 w-full h-full rounded-md border border-gray-300 hover:border-gray-600 text-2xl duration-50">
      {isFavorite === true ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart className=" hover:text-red-500 " />
      )}
    </button>
  );
}
