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
    <div className="flex w-full justify-center px-4 sm:px-6">
      <div className="w-full max-w-[1400px] border dark:bg-zinc-950 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <div className="flex-shrink-0 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] relative">
            <Image
              src={store.imageLogoURL}
              alt={`${store?.name} logo`}
              fill
              className="rounded-xl object-cover"
              sizes="(max-width: 640px) 100px, 120px"
            />
          </div>
          
          <div className="flex-grow">
            <p className="text-base sm:text-lg md:text-xl font-medium text-accent-foreground line-clamp-4 sm:line-clamp-none">
              {store?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoStore;
