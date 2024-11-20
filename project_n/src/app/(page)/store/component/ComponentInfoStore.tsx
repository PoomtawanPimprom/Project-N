import Image from "next/image";
import { FaBoxes } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";

interface prop {
  store: any;
}
const InfoStore = async ({ store }: prop) => {
  return (
    <div className="flex  h-full p-3 mx-auto">
      <div className=" grid w-[1400px] grid-cols-1 lg:grid-cols-5  rounded  lg:gap-3 ">
        <div className=" col-span-2 border h-[455px] rounded-xl p-3 bg-green text-white space-y-2 ">
          <div className="flex items-center space-x-2 h-[120px]">
            <div className="rounded-xl">
              <img
                src={store.imageLogo}
                alt={`logo ${store?.name} `}
                className=" rounded-xl w-[120px] h-[120px]"
              />
            </div>
            <div>
              <h1 className="text-6xl font-black mb-2">{store?.name}</h1>
            </div>
          </div>
          <div className="flex flex-col space-y-2 ">
            <div>
              <p className="text-xl ">{store?.description}</p>
            </div>
            <div className="flex flex-col font-semibold ">
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
        <div className=" col-span-3  border  rounded-xl mb-1 ">
          <img
            className="h-[455px] w-[1400px] rounded-xl "
            src="https://images.unsplash.com/photo-1699004817375-907e7f5887de?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default InfoStore;
