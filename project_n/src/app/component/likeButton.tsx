"use client";
import { favoriteInterface } from "@/app/interface/favoriteInterface";
import {
  createFavorite,
  deleteFavoriteByid,
  getFavoriteByProductIdAndUserId,
} from "@/app/service/favorite/service";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

interface propInterface {
  productId: number;
  userId: number;
}

const LikeButton = (prop: propInterface) => {
  const [isFavoritedStatus, setIsFavoritedStatus] = useState<boolean>();
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
    setIsFavoritedStatus(status);
  }, [favoriteData]);

  const handleOnClick = async () => {
    if (isFavoritedStatus == true) {
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
    <>
      <button
        onClick={handleOnClick}
        className="flex bg-white border h-10 w-10 rounded-full justify-center items-center hover:bg-gray-100"
      >
        {isFavoritedStatus === true ? <FaHeart /> : <Heart />}
      </button>
    </>
  );
};

export default LikeButton;
