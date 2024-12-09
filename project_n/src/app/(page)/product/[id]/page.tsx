import Desription from "../component/Desription";
import StoreInfo from "../component/StoreBox";
import ProductImage from "../component/ProductImage";
import SelectToCart from "../component/SelectToCart";
import prisma from "@/lib/prisma/db";

const ProductByIdPage = async ({params}: { params: { id: number } }) => {
  const productId = Number(params.id);
  const product = await prisma.product.findUnique({
    where:{id:productId},
    include : {store : true}
  }) 

  const inventories = await prisma.inventory.findMany({
    where:{productID: productId},
  })

  return (
    <>
      <div className="flex flex-col items-center dark:bg-black">
        <div className="flex flex-col border-x  p-4  dark:bg-black dark:border-gray-400  ">
          <div className="grid grid-cols-1 grid-flow-row auto-rows-auto  gap-2 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-2 mx-auto ">
              <ProductImage product={product}/>
              <SelectToCart product={product} inventory={inventories} productId={productId}/>
            </div>
            <Desription product={product} />
            <StoreInfo store={product?.store} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductByIdPage;
