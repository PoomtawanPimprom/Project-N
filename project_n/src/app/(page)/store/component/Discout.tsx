import DiscountCard from "@/app/component/discountCard";
import { IoPricetagOutline } from "react-icons/io5";

const Discout = () => {
  return (
    <div className="flex p-3 mx-auto">
      <div className="flex flex-col 2xl:w-[1400px] bg-white border  rounded-xl">
        <div className="header flex w-full p-2 text-3xl font-bold space-x-2 items-center">
          <IoPricetagOutline />
          <p>discount</p>
        </div>
        <div className="flex h-full p-2 items-center"><DiscountCard/></div>
      </div>
    </div>
  );
};

export default Discout;
