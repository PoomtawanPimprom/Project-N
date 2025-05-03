import prisma from "@/lib/prisma/db";
import { userInterface } from "@/app/interface/userInterface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { userAddressInterface } from "@/app/interface/userAddressInterface";
//component
import SelectAddress from "../selectAddress/SelectAddress";
import ProductCart from "../productcart/ProductCart";
import Payment from "../payment/Payment";

import { orderDetailInterface } from "@/app/interface/orderDetailInterface";
import { orderItemInterface } from "@/app/interface/orderItemInterface";

export default async function PaymentPage(props: {params: Promise<{ id: number }>;}) {
  const session = await getServerSession(authOptions);
  const params = await props.params;
  const orderDatailId = Number(params.id);


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

  const orderDetailData = await prisma.orderDetail.findFirst({
    where: {id:orderDatailId, userId: userId, orderStatusId: 1 },
    include: { transport: true, discount: true },
  }) as orderDetailInterface 
  
  if (!orderDetailData) {
    redirect('/')
  }



  const orderItemsData = (await prisma.orderItem.findMany({
    where: { orderDetailId: orderDetailData.id },
    include: { product: true },
  })) as orderItemInterface[];



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
              discount={orderDetailData.discount}
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
                  orderItemsData.reduce(
                    (sum, item) => sum + item.quantity * item.product!.price,
                    0
                  ) +
                  orderDetailData.transport?.transportPrice! -
                  (orderDetailData.discount?.discountAmount || 0)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
