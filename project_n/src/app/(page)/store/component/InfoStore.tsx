import { Package2, Star, Users } from "lucide-react";
import Image from "next/image";
import { FaBoxes } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";

interface prop {
  store: any;
}
const InfoStore = async ({ store }: prop) => {
  return (
    <div className="flex h-full mx-auto">
      <div className=" w-full md:w-[747px] lg:w-[1000px] xl:w-[1400px]  rounded  lg:gap-3 ">
        <div className=" grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-3  sm:gap-2  rounded-xl text-white">
          {/* 1 */}
          <div className="flex items-start w-full p-2 col-span-2 gap-2 mb-2 sm:mb-0 bg-green-main rounded-xl">
            <div className="rounded-xl">
              <Image
                width={120}
                height={120}
                src={store.imageLogoURL}
                alt={`logo ${store?.name} `}
                className=" rounded-xl"
              />
            </div>
            <div>
              <p className="text-4xl sm:text-6xl font-black ">{store?.name}</p>
              <p className="text-xl font-medium ">{store?.description}</p>
            </div>
          </div>
          {/* 2 */}
          <div className="flex flex-col  w-full col-span-1 space-x-1 p-2 text-black rounded-xl border">
            <div className="flex h-full flex-col font-semibold justify-between">
              <div className="flex   items-center">
                <Star  className=" mr-1 " />
                review : {store?.scores}
              </div>
              <div className="flex items-center">
                <Package2  className=" mr-1 "/>
                total product : {store?.productTotal}
              </div>
              <div  className="flex items-center ">
                <Users className=" mr-1 " />
                follower : {store?.follower}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoStore;
