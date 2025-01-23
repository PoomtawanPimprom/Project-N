import ProductCard from "@/app/component/productCard";
import { productInterface } from "@/app/interface/productInterface";
import { Box } from "lucide-react";

type prop = {
  otherProducts: productInterface[];
  currentProductId: number;
};

export default function OtherProductFromSameStore({
  otherProducts,
  currentProductId,
}: prop) {
    const filteredProducts = otherProducts.filter((item)=> item.id !== currentProductId) 
    if (filteredProducts.length === 0) {
        return <></>;
      }
  return (
    <div className="flex flex-col max-w-5xl  space-y-2  border rounded-xl p-4">
      <div className="flex mb-2 text-2xl font-bold text-black dark:text-white">
        <Box className="mr-2" />
        <p>สินค้าจากร้านเดียวกัน</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6">
        {filteredProducts.map((product, index) => (
          <>
            {product.id !== currentProductId ? (
              <ProductCard product={product} key={product.id} />
            ) : (
              <></>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
