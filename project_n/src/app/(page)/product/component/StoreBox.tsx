import { storeInterface } from "@/app/interface/storeInterface";
import Link from "next/link";

interface prop {
  store: storeInterface;
}

const StoreBox =  ({ store }: prop) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full bg-white  lg:flex-row lg:justify-between lg:w-full border p-4 rounded-xl dark:bg-black ">
        <div className="flex items-center">
          <div className="logo flex w-[120px] h-[120px] mr-4 rounded-xl ">
            <img src={store.imageLogoURL?.toString()} alt="" className="w-[120px] h-[120px] rounded-xl dark:border dark:border-zinc-800" />
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
           
          </div>
        </div>
        <div className="flex  flex-row mt-2 justify-end  lg:mt-0 ">
          <Link
            href={`/store/${store?.id}`}
            className="flex py-2 px-4 h-fit  bg-primary    font-bold text-white rounded-xl dark:hover:bg-white dark:hover:text-primary duration-150"
          >
            <p>เข้าชมร้าน</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreBox;
