"use client";
import { followInterface } from "@/app/interface/followInterface";
import {
  checkFollowed,
  createFollow,
  deleteFollowByid,
} from "@/app/service/follow/service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

interface prop {
  userId: number;
  storeId: number;
}

const ButtonFollow =  ({ userId, storeId }: prop) => {
  const [isFollowed, setIsFollowed] = useState<followInterface>();
  const router = useRouter();

  const handleFollowBotton = async () => {
    //case unAuthenticated
    if (!userId) {
      router.replace("/login");
      return;
    }

    //case not followed
    if (isFollowed == null) {
      const data = {
        userId,
        storeId,
      };
      await createFollow(data);
    } else {
      await deleteFollowByid(isFollowed!.id);
    }
  };

  const fetchData = async () => {
    if (!userId) return null;
    const isFollowed = await checkFollowed(storeId, userId);
    console.log(isFollowed);
    setIsFollowed(isFollowed);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <button
        onClick={handleFollowBotton}
        className="flex max-h-[60px] bg-white rounded-xl p-3 justify-center items-center text-center hover:bg-gray-100 duration-200"
      >
        <CiCirclePlus className="mx-1" />
        Follow
      </button>
    </>
  );
};

export default ButtonFollow;
