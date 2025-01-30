import DiscountCard from "@/app/component/discountCard";
import { Tag } from "lucide-react";

const Discout = () => {
  return (
    <div className="flex  mx-auto">
      <div className="flex flex-col text-accent-foreground md:w-[747px] lg:w-[1000px] xl:w-[1400px] dark:bg-zinc-950 border  rounded-xl">
        <div className="header flex w-full p-2 text-3xl font-bold space-x-2 items-center">
        <Tag />
          <p>discount</p>
        </div>
        <div className="flex h-full p-2 items-center"><DiscountCard/></div>
      </div>
    </div>
  );
};

export default Discout;
