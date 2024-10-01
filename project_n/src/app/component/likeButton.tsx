"use client";
import { favoriteInterface } from "@/app/interface/favoriteInterface";
import {
  createFavorite,
  deleteFavorite,
  getFavoriteByProductIdAndUserId,
} from "@/app/service/favorite/service";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

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
      await deleteFavorite(favoriteData[0].id);
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
        className="flex bg-white border h-10 w-10 rounded-full justify-center items-center"
      >
        {isFavoritedStatus === true ? <FaHeart /> : <FaRegHeart />}
      </button>
    </>
  );
};

export default LikeButton;
