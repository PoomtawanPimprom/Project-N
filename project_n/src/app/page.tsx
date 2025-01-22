import prisma from "@/lib/prisma/db";
import ShowBanner from "./component/ShowBanner";
import ProductCard from "./component/productCard";
import Navbar from "./layout/navbar";
import { Box } from "lucide-react";

const banners = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Up to 50% off on summer essentials",
    imageUrl: "/api/placeholder/1200/400",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out our latest products",
    imageUrl: "/api/placeholder/1200/400",
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "Special Offer",
    description: "Free shipping on orders over $50",
    imageUrl: "/api/placeholder/1200/400",
    color: "bg-green-500",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string | "" };
}) {
  const searchProduct = searchParams.search;
  const products = await prisma.product.findMany({
    where: { name: searchProduct },
  });
  console.log(searchProduct)
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {!(searchProduct?.length > 0) ? (
          <>
            <ShowBanner banners={banners} />

            {/* Products Section */}
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex w-full text-3xl font-bold space-x-2 items-center mb-2">
                <Box />
                <p>สินค้า</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
          <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex w-full text-3xl font-bold space-x-2 items-center mb-2">
                <Box />
                <p>สินค้า</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))}
              </div>
            </div>
          </>
        )}
        {/* Banner Carousel */}
      </div>
    </>
  );
}
