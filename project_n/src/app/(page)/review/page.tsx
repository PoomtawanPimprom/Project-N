import prisma from "@/lib/prisma/db";
import CreateReview from "./CreateReview";
import { reivewInterface } from "@/app/interface/reviewInterface";
import ShowComment from "./ShowComment";
import { productInterface } from "@/app/interface/productInterface";

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const query = await searchParams
  const productId = Number(query.pId);
  const allReviewsByProductId = (await prisma.review.findMany({
    where: { productId },
    include: {
      user: true,
    },
  })) as reivewInterface[];

  const product = (await prisma.product.findFirst({
    where:{id :productId},
    include:{ store:true}
  })) as productInterface

  return (
    <div className="flex flex-col p-4 gap-2">
      <CreateReview product={product}/>
      <ShowComment reviewByProductId={allReviewsByProductId}  />
    </div>
  );
}
