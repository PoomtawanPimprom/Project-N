import prisma from "@/lib/prisma/db";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { actionDelete } from "./action";
import ProductInfoCard from "./ProductInfoCard";

const favoriteByUserIdPage = async ({ params }: { params: { id: number } }) => {
  const userId = Number(params.id);
  const favoriteData = await prisma.favorite.findMany({
    where: { userId: userId },
    include: {
      product: {
        select: {
          name: true,
          image: true,
          price: true,
          store: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  

  return (
    <>
      <div className="flex w-full">
        <div className="flex  flex-col mx-auto">
          <div className="p-2 flex  my-2 text-4xl font-bold">
            <p>รายการที่ฉันชอบ</p>
          </div>
          <div className="flex flex-col space-y-2 px-4">
            {favoriteData.map((item, index) => (
              <ProductInfoCard key={index} userId={userId} data={item}/>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default favoriteByUserIdPage;
