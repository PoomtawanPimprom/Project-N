import prisma from "@/lib/prisma/db";
import { userInterface } from "@/app/interface/userInterface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { userAddressInterface } from "@/app/interface/userAddressInterface";
//component
import SelectAddress from "./selectAddress/SelectAddress";
import ProductCart from "./productcart/ProductCart";
import Payment from "./payment/Payment";

import { orderDetailInterface } from "@/app/interface/orderDetailInterface";
import { orderItemInterface } from "@/app/interface/orderItemInterface";
import { promotionInterface } from "@/app/interface/promotionInterface";

export default async function PaymentPage() {
  const session = await getServerSession(authOptions);
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
      addressStatusId: 2,
    },
  })) as userAddressInterface;

  const AllUserAddress = (await prisma.userAddress.findMany({
    where: { userId },
  })) as userAddressInterface[];

  const orderDetailData = (await prisma.orderDetail.findFirst({
    where: { userId: user.id, orderStatusId: 1 },
    include: { transport: true },
  })) as orderDetailInterface;

  const orderItemsData = (await prisma.orderItem.findMany({
    where: { orderDetailId: orderDetailData.id },
    include: { product: true },
  })) as orderItemInterface[];

  const discount = (await prisma.discount.findUnique({
    where: { id: orderDetailData.discountId },
  })) as promotionInterface;

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
            <ProductCart
              discount={discount}
              orderItems={orderItemsData}
              orderDetail={orderDetailData}
            />
          </div>
        </div>
        <div className="col-span-2 ">
          <div className="flex flex-col gap-2">
            <div>
              <Payment
              userId={userId}
              orderDetailId={orderDetailData.id}
                amount={
                  orderDetailData.total +
                  orderDetailData.transport?.transportPrice! -
                  (discount?.discountAmount || 0)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
