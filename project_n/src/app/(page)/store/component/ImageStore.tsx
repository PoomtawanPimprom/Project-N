"use client";
//icon
import { IoSettingsOutline } from "react-icons/io5";

//components

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface prop {
  ownerId: number | undefined;
  store: any;
  storeId: number;
}

const ImageStore = ({ ownerId, storeId, store }: prop) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [Owner, setOwner] = useState(false);

  const checkOwner = () => {
    if (Number(session?.user.id) != ownerId) {
      setOwner(false);
      return;
    }
    setOwner(true);
  };

  useEffect(() => {
    checkOwner();
  }, []);

  return (
    <div className="flex w-full justify-center px-4 sm:px-6">
      <div className="relative w-full max-w-[1400px] h-[300px] sm:h-[400px] md:h-[500px] md:mt-4 md:rounded-lg overflow-hidden">
        <Image
          src={store.imageBackgroundURL}
          alt={store.name}
          fill
          className="object-cover md:rounded-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 747px, (max-width: 1024px) 1000px, 1400px"
          priority={true}
        />

        <div className="absolute bottom-0 left-0 right-0 flex flex-col sm:flex-row justify-between items-start sm:items-end p-4 z-50 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex justify-between  w-full ">
            <div className="text-3xl sm:text-4xl md:text-7xl  text-white font-bold mb-4 sm:mb-0">
              <p className="text-nowrap ">{store?.name}</p>
            </div>

            <div className="flex w-full sm:w-auto justify-end items-end">
              {Owner && (
                <button
                  onClick={() => router.push(`/store/manage/${storeId}`)}
                  className="flex items-center h-fit px-4 py-2 sm:py-3 text-accent-foreground font-semibold bg-white dark:bg-zinc-800 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors duration-200"
                >
                  <IoSettingsOutline className="mr-2 h-5 w-5" />
                  <span>Manage</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageStore;
