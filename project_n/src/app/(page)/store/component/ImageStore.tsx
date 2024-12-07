"use client";
//icon
import { IoSettingsOutline } from "react-icons/io5";

//components
import ButtonChat from "./buttonChat";
import ButtonFollow from "./buttonFollow";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { MdOutlineInventory2 } from "react-icons/md";

interface prop {
  userId: number;
  ownerId: number | undefined;
  storeId: number;
  store: any;
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
      <div className=" relative flex flex-col 2xl:w-[1400px] h-[500px] bg-[url('https://images.unsplash.com/photo-1657161540865-a46753494068?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] p-4 justify-end items-end mb-2 rounded-lg">
        <div className="flex w-full justify-between">
          <div className=" text-7xl text-white font-bold">
            <p>{store?.name}</p>
          </div>
          <div className="flex space-x-3">
            {Owner && (
              <>
                <div className="flex items-end">
                  <button
                    onClick={() => router.push(`/store/inventory/${storeId}`)}
                    className="flex max-h-[60px] items-center p-3 bg-white rounded-xl hover:bg-gray-100 duration-200"
                  >
                    <MdOutlineInventory2  className="mr-1" />
                    inventory
                  </button>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => router.push(`/store/edit/${storeId}`)}
                    className="flex max-h-[60px] items-center p-3 bg-white rounded-xl hover:bg-gray-100 duration-200"
                  >
                    <IoSettingsOutline className="mr-1" />
                    setting
                  </button>
                </div>
              </>
            )}
            <div className="flex items-end">
              <ButtonChat userId={1} storeId={storeId} />
            </div>
            <div className="flex items-end">
              <ButtonFollow userId={1} storeId={storeId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageStore;
