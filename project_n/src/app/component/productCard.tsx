"use client"
import { FaCartPlus } from "react-icons/fa";
import LikeButton from "./likeButton";

//icon
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { productInterface } from "../interface/productInterface";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface prop {
  product: productInterface | any;
}

const ProductCard = ({ product }: prop) => {
  const { data:session} = useSession();
  const router = useRouter();

  const handleGotoProductPage = () =>{
    if(!session){
      router.push(`/login`)
      return;
    }
    else{
      router.push(`/product/${product.id}`)
    }
  }

  //not complete
  const handleCart = () =>{
    if(!session){
      router.push(`/login`)
      return;
    }
    else{
      router.push(`/product/${product.id}`)
    }
  }
  return (
    <>
      <div className="card flex flex-col w-[275px] border rounded-xl">
        <div
          className="card-image relative flex h-[275px] border-b "
        >
          <Image
            width={275}
            height={275}
            className="rounded-t-xl w-full "
            src={product.image.image1}
            alt={product.name}
          />
          <div className=" absolute right-2 top-2">
            <LikeButton productId={product.id} userId={1} />
          </div>
        </div>
        <div className="card-info flex flex-col p-2">
          <div className="care-name text-xl font-bold">{product.name}</div>
          <div className="care-price my-1 text-lg text-gray-500">฿{product.price}</div>
          <div className="card-naviButton flex justify-end">
            <button 
            onClick={handleCart}
            className="flex rounded-full mr-2 border h-10 w-10 justify-center items-center hover:bg-gray-100">
              {/* icon */}
              <FaCartPlus />
            </button>
            <button
              onClick={handleGotoProductPage}
              className="flex rounded-full mr-2 border h-10 w-10 justify-center items-center hover:bg-gray-100"
            >
              {/* icon */}
              <BsThreeDots />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
