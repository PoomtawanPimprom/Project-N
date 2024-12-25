"use client";
//icon
import { IoSettingsOutline } from "react-icons/io5";

//components
import ButtonChat from "./buttonChat";
import ButtonFollow from "./buttonFollow";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { MdOutlineInventory2 } from "react-icons/md";
import Image from "next/image";

interface prop {
  userId: number;
  ownerId: number | undefined;
  store: any;
  storeId: number;
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
    <div className="flex mx-auto">
      <div className="flex flex-col relative md:w-[747px] lg:w-[1000px] xl:w-[1400px] h-[500px] justify-end items-end md:mt-4 md:rounded-lg">
        <Image
          src={store.imageBackgroundURL}
          width={1400}
          height={500}
          alt={store.name}
          className=" w-full h-full object-cover  md:rounded-lg"
          priority={true}
        />
        <div className="absolute bottom-1 flex w-[1400px] justify-between p-1">
          <div className="text-7xl text-white font-bold">
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
                    <MdOutlineInventory2 className="mr-1" />
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
