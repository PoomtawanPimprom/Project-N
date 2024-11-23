"use client";

import ProductCard from "@/app/component/productCard";
import { productInterface } from "@/app/interface/productInterface";
import { getProductsByStoreId } from "@/app/service/product/service";
import { useEffect, useState } from "react";

//icon
import { FiBox } from "react-icons/fi";

interface prop {
  storeId: number;
}

const ShowProduct = ({ storeId }: prop) => {
  const [products, setProducts] = useState<productInterface[]>([]);

  const fetchData = async () => {
    const data = await getProductsByStoreId(storeId);
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex  p-3 mx-auto">
      <div className="flex flex-col w-full xl:w-[1400px] h-full bg-white border rounded-xl">
        <div className="header flex w-full p-2 text-3xl font-bold space-x-2 items-center">
          <FiBox />
          <p>รายการสินค้า</p>
        </div>
        <div className="header flex flex-col h-full w-full p-2">
          <div className="grid h-full grid-cols-2 md:grid-cols-3  xl:grid-cols-5 gap-2 grid-flow-row auto-rows-auto items-center justify-center">
            {products.map((item, index) => (
              <div className="flex mx-auto" key={index}>
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
