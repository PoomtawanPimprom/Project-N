import Desription from "../component/Desription";
import StoreBox from "../component/StoreBox";
import ProductImage from "../component/ProductImage";
import SelectToCart from "../component/SelectToCart";
import prisma from "@/lib/prisma/db";
import ReviewBox from "../component/ReviewBox";
import { reivewInterface } from "@/app/interface/reviewInterface";
import { productInterface } from "@/app/interface/productInterface";
import { inventoryInterface } from "@/app/interface/inventoryInterface";
import OtherProductFromSameStore from "../component/OtherProductFomSameStore";

const ProductByIdPage = async ({params}: { params: { productId: number } }) => {
  const productId = Number(params.productId);
  const product = (await prisma.product.findUnique({
    where:{id:productId},
    include : {store : true}
  }) ) as productInterface

  const inventories = (await prisma.inventory.findMany({
    where:{productID: productId}
  })) as inventoryInterface[]

  const reviews = (await prisma.review.findMany({
    where:{productId:productId},
    include:{ user:true}
  }))as reivewInterface[]

  const otherProduct = (await prisma.product.findMany({
    where:{storeID:product.id}
  })) as productInterface[]
  return (
    <>
      <div className="flex flex-col items-center dark:bg-black">
        <div className="flex flex-col border-x  p-4  dark:bg-black dark:border-gray-400  ">
          <div className="grid grid-cols-1 grid-flow-row auto-rows-auto  gap-2 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-2 mx-auto ">
              <ProductImage product={product}/>
              <SelectToCart product={product} inventory={inventories} productId={productId}/>
            </div>
            
            <StoreBox store={product?.store!} />
            <ReviewBox reviews={reviews}/>
            <OtherProductFromSameStore otherProducts={otherProduct} currentProductId={productId}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductByIdPage;
