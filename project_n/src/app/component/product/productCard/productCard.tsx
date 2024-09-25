import { FaCartPlus } from "react-icons/fa";
import LikeButton from "../../button/likeButton";

//icon
import { BsThreeDots } from "react-icons/bs";

interface prop {
  name: string;
  image: string;
}

const ProductCard = () => {
  return (
    <>
      <div className="card flex flex-col h-[300px] w-[220px] border rounded-xl">
        <div className="card-image relative flex h-3/5 border-b">
          <div className=" absolute right-2 top-2">
            <LikeButton />
          </div>
        </div>
        <div className="card-info flex flex-col p-2">
          <div className="care-name">Name</div>
          <div className="care-price my-2">price</div>
          <div className="card-naviButton flex justify-end">
            <button className="flex rounded-full mr-2 border h-10 w-10 justify-center items-center">
              <FaCartPlus />
            </button>
            <button className="flex rounded-full mr-2 border h-10 w-10 justify-center items-center">
              <BsThreeDots />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
