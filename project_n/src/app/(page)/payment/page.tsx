import prisma from "@/lib/prisma/db";
import SelectAddress from "./selectAddress/SelectAddress";
import { userInterface } from "@/app/interface/userInterface";
import ProductCart from "./productcart/ProductCart";
import PaymentType from "./PaymentType/PaymentType";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { userAddressInterface } from "@/app/interface/userAddressInterface";

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

  console.log(user);
  // const paymentType = (await prisma.pa)
  return (
    <>
      <div className="flex flex-col p-4 mx-auto  sm:w-[600px] space-y-2">
        <SelectAddress
          user={user}
          AllUserAddress={AllUserAddress}
          default_address={userAddressDefault}
        />
        <ProductCart />
        <PaymentType />
      </div>
    </>
  );
}
