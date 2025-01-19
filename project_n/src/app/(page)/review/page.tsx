import prisma from "@/lib/prisma/db";
import CreateReview from "./CreateReview";
import { reivewInterface } from "@/app/interface/reviewInterface";
import ShowComment from "./ShowComment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ReviewPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/login")
  }
  const userId = Number(session.user?.id)
  const productId = 2;
  const allReviewsByProductId = (await prisma.review.findMany({
    where: { productId },
    include: {
      user: true,
    },
  })) as reivewInterface[];
  return (
    <div className="flex flex-col p-4 gap-2">
      <CreateReview productId={productId} userId={userId}/>
      <ShowComment reviewByProductId={allReviewsByProductId} userId={userId}/>
    </div>
  );
}
