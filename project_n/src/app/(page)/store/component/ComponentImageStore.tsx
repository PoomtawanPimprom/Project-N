"use client";
//icon
import { IoSettingsOutline } from "react-icons/io5";

//components
import ButtonChat from "./buttonChat";
import ButtonFollow from "./buttonFollow";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { storeInterface } from "@/app/interface/storeInterface";

interface prop {
  userId: number;
  ownerId: number | undefined;
  storeId: number;
  store: storeInterface | undefined;
}

const ImageStore = ({ userId, ownerId, storeId, store }: prop) => {
  const router = useRouter();
  const [Owner, setOwner] = useState(false);
  const checkOwner = () => {
    if (userId != ownerId) {
      setOwner(false);
    }
    setOwner(true);
  };
  useEffect(() => {
    checkOwner();
  }, []);
  return (
    <div className="flex p-3 mx-auto">
      <div className="flex flex-col w-[1400px] h-[500px] bg-[url('https://images.unsplash.com/photo-1657161540865-a46753494068?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] p-4 justify-end items-end mb-2 rounded-lg">
        <div className="flex w-full justify-between">
          <div className="text-6xl text-white font-bold">
            <p>{store?.name}</p>
          </div>
          <div className="flex space-x-3">
            {Owner && (
              <div className="flex">
                <button
                  onClick={() => router.push(`/store/edit/${storeId}`)}
                  className="flex items-center px-4 py-2 bg-white rounded-xl"
                >
                  <IoSettingsOutline className="mr-1" />
                  setting
                </button>
              </div>
            )}
            <div className="flex ">
              <ButtonChat userId={1} storeId={storeId} />
            </div>
            <div className="flex ">
              <ButtonFollow userId={1} storeId={storeId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageStore;
