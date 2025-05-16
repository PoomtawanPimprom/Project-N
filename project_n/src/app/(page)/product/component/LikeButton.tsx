"use client";

import { favoriteInterface } from "@/app/interface/favoriteInterface";
import { createFavorite, deleteFavoriteByid, getFavoriteByProductIdAndUserId } from "@/app/service/favorite/service";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface propInterface {
    productId: number;
    userId: number;
}

export default function LikeButtonProductPage(prop: propInterface) {
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const [favoriteData, setFavoriteData] = useState<favoriteInterface | null>(null);
  const {toast} = useToast()
  const router = useRouter()
  const {data:session} = useSession()
  const fetchData = async () => {
    if(!session){
      return
    }
    const dataFavorite = await getFavoriteByProductIdAndUserId(prop.productId, prop.userId);
    setFavoriteData(dataFavorite);
    setIsFavorite(dataFavorite !== null); // อัปเดต isFavorite เมื่อได้ข้อมูล
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnClick = async () => {
    if(!session){
      toast({
        variant:"destructive",
        description:"โปรดลงชื่อผู้ใช้งาน"
      })
      return
    }
    
    if (isFavorite === null) return; 
    
    setIsFavorite(!isFavorite); 
    
    if (isFavorite) {
      await deleteFavoriteByid(favoriteData!.id);
      toast({
        variant:"success",
        description:"ลบออกรายงานโปรดเรียบร้อย"
      })
    } else {
      const data = {
        userId: prop.userId,
        productId: prop.productId,
      };
      await createFavorite(data);
            toast({
        variant:"success",
        description:"เพิ่มเข้ารายงานโปรดเรียบร้อย"
      })
    }
    
    fetchData(); 
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
