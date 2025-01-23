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
    <div className="flex mx-auto">
      <div className=" w-full border flex flex-col md:w-[747px] lg:w-[1000px] xl:w-[1400px] lg:gap-3 rounded-xl text-white">
        {/* 1 */}
        <div className="flex items-start w-full p-2 col-span-2 gap-2 mb-2 sm:mb-0  rounded-xl">
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
            <p className="text-xl font-medium text-black">{store?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoStore;
