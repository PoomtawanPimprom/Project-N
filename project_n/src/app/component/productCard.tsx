"use client";
import LikeButton from "./likeButton";

//icon
import { useRouter } from "next/navigation";
import { productInterface } from "../interface/productInterface";
import { useSession } from "next-auth/react";
import { ShoppingCart } from "lucide-react";

interface prop {
  product: productInterface;
}

const ProductCard = ({ product }: prop) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGotoProductPage = () => {
    if (!session) {
      router.push(`/login`);
      return;
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  //not complete
  const handleCart = () => {
    if (!session) {
      router.push(`/login`);
      return;
    } else {
      router.push(`/product/${product.id}`);
    }
  };
  return (
    <>
      <div
        onClick={handleGotoProductPage}
        key={product.id}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="relative h-64">
          <img
            src={product.image.image1}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{product.category?.name}</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            <div className="gap-2 flex">
              <LikeButton productId={product.id} userId={Number(session?.user!.id)} />
              {/* add to cart */}
              <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
