import { FaCartPlus } from "react-icons/fa";
import LikeButton from "./likeButton";

//icon
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { productInterface } from "../interface/productInterface";

interface prop {
  product: productInterface;
}

const ProductCard = ({ product }: prop) => {
  const router = useRouter();
  return (
    <>
      <div className="card flex flex-col w-[275px] border rounded-xl">
        <div
          className="card-image relative flex h-[275px] border-b "
        >
          <img
            className="rounded-t-xl w-full "
            src={product.image}
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
            className="flex rounded-full mr-2 border h-10 w-10 justify-center items-center hover:bg-gray-100">
              {/* icon */}
              <FaCartPlus />
            </button>
            <button
              onClick={() => router.push(`/product/${product.id}`)}
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
