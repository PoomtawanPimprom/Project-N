import { productInterface } from "@/app/interface/productInterface";

interface prop {
  product:productInterface;
}

const Description =  ({ product }: prop) => {
  return (
    <div className="flex justify-center  ">
      <div className="flex flex-col  border p-4 w-[450px] h-56 overflow-y-hidden   lg:w-full bg-white rounded-xl  dark:bg-bg-dark dark:text-white dark:border-none">
        <div className="flex mb-2 text-2xl font-bold text-black dark:text-white">
          <p>รายละเอียดสินค้า</p>
        </div>
        <div className="flex text-gray-500 dark:text-gray-400">{product?.description}</div>
      </div>
    </div>
  );
};

export default Description;
