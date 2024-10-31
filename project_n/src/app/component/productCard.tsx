import { FaCartPlus } from "react-icons/fa";
import LikeButton from "./likeButton";

//icon
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { productInterface } from "../interface/productInterface";

interface prop {
  product: productInterface
}

const ProductCard = (prop:prop) => {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push(`/product/${prop.product.id}`)}
        className="card flex flex-col h-[300px] w-[220px] border rounded-xl"
      >
        <div className="card-image relative flex h-3/5 border-b ">
          <img
            className="rounded-t-xl"
            src={prop.product.image}
            alt={prop.product.name}
          />
          <div className=" absolute right-2 top-2">
            <LikeButton productId={prop.product.id} userId={1} />
          </div>
        </div>
        <div className="card-info flex flex-col p-2">
          <div className="care-name">Name</div>
          <div className="care-price my-2">price</div>
          <div className="card-naviButton flex justify-end">
            <button className="flex rounded-full mr-2 border h-10 w-10 justify-center items-center">
              {/* icon */}
              <FaCartPlus />
            </button>
            <button className="flex rounded-full mr-2 border h-10 w-10 justify-center items-center">
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
