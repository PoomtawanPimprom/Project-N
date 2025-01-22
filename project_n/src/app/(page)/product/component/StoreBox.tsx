import { storeInterface } from "@/app/interface/storeInterface";
import Link from "next/link";

import { FaBoxes } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";

interface prop {
  store: storeInterface;
}

const StoreBox = async ({ store }: prop) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[450px] bg-white lg:flex-row lg:justify-between lg:w-full border p-4 rounded-xl dark:bg-bg-dark dark:border-none">
        <div className="flex items-center">
          <div className="logo flex w-[120px] h-[120px] mr-4 rounded-xl bg-gray-400">
            <img src={store.imageLogoURL?.toString()} alt="" className="w-[120px] h-[120px] rounded-xl" />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col w-full">
              <div className="text-2xl sm:text-3xl font-bold dark:text-white">
                {store?.name}
              </div>
              <div className="text-base sm:text-lg text-gray-400 lg:w-[675px]">
                {store?.description}
              </div>
            </div>
            <div className="flex flex-col text-sm sm:text-base lg:flex-row font-semibold text-gray-400 lg:space-x-3">
              <div className="flex items-center">
                <FaStar className="text-black mr-1 dark:text-white " />
                review : {store?.scores}
              </div>
              <div className="hidden lg:flex items-center">
                <FaBoxes className="  text-black mr-1 dark:text-white" />
                total product : {store?.productTotal}
              </div>
              <div className="flex items-center ">
                <MdPeopleAlt className="text-black mr-1 dark:text-white" />
                follower : {store?.follower}
              </div>
            </div>
          </div>
        </div>
        <div className="flex  flex-row mt-2 justify-end  lg:mt-0 ">
          <Link
            href={`/store/${store?.id}`}
            className="flex py-2 px-4 h-fit  bg-green-main   dark:bg-black font-bold text-white rounded-xl dark:hover:bg-white dark:hover:text-black duration-150"
          >
            <p>เข้าชมร้าน</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreBox;
