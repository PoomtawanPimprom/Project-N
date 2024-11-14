
import { storeInterface } from "@/app/interface/storeInterface";
import { useRouter } from "next/navigation";
import { FaBoxes } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";

interface prop {
  store: storeInterface | undefined;
}

const StoreInfo = ({ store }: prop) => {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[450px] bg-white lg:flex-row lg:justify-between lg:w-full border p-4 rounded-xl dark:bg-bg-dark dark:border-none">
        <div className="flex justify-center items-center">
          <div className="logo flex w-[120px] h-[120px] mr-4 rounded-xl bg-gray-400">
            <img src="" alt="" className="w-[120px] h-[120px] rounded-xl" />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col w-full">
              <div className="text-3xl font-bold dark:text-white">
                {store?.name}
              </div>
              <div className="text-lg text-gray-400 lg:w-[675px]">
                {store?.description}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row font-semibold text-gray-400 lg:space-x-3">
              <div className="flex   items-center">
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
        <div className="flex flex-row mt-2 justify-end  lg:mt-0 ">
          <button
            onClick={() => router.push(`/store/${store?.id}`)}
            className="flex py-2 px-4 h-[40px] bg-green   dark:bg-black font-bold text-white rounded-xl"
          >
            เข้าชมร้าน
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
