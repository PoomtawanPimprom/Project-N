import prisma from "@/lib/prisma/db";
import { userInterface } from "@/app/interface/userInterface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { userAddressInterface } from "@/app/interface/userAddressInterface";
//component
import SelectAddress from "./selectAddress/SelectAddress";
import ProductCart from "./productcart/ProductCart";
import { productInterface } from "@/app/interface/productInterface";
import Payment from "./payment/Payment";

export default async function PaymentPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect("/login");
  }
  const userId = Number(session?.user.id);
  const user = (await prisma.user.findUnique({
    where: { id: userId },
  })) as userInterface;

  const userAddressDefault = (await prisma.userAddress.findFirst({
    where: {
      userId: userId,
      addressStatusId: 1,
    },
  })) as userAddressInterface;

  const AllUserAddress = (await prisma.userAddress.findMany({
    where: { userId },
  })) as userAddressInterface[];

  const productsFromUser =
    (await prisma.product.findMany()) as productInterface[];

      
  const amount = 4999;
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 p-4 mx-auto max-w-6xl gap-2 ">
        <div className="col-span-3 ">
          <div className="flex flex-col gap-2">
            <SelectAddress
              user={user}
              AllUserAddress={AllUserAddress}
              default_address={userAddressDefault}
            />
          <ProductCart products={productsFromUser} />
          </div>


        </div>
        <div className="col-span-2 ">
          <div className="flex flex-col gap-2">
            <div>
              <Payment amount={500} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
