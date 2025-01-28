import { orderItemInterface } from "@/app/interface/orderItemInterface";
import prisma from "@/lib/prisma/db"
import StoreSideBar from "../../StoreSideBar";
import DataTable from "./Table";
import { userAddressInterface } from "@/app/interface/userAddressInterface";


export default async function toShipPage(props: {params: Promise<{ id: number }>;}) {
  const params = await props.params;
  const storeId = Number(params.id)
  const toShipItems = (await prisma.orderItem.findMany({
      where:{storeId:storeId},
      orderBy:{ orderItemStatusId:"desc"},
      include:{product:true,orderItemStatus:true}
  })) as orderItemInterface[]

  const userAddress = (await prisma.userAddress.findUnique({
      where:{id:toShipItems[0].userAddressId}
  })) as userAddressInterface
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <StoreSideBar storeId={storeId.toString()} />
      <div className="w-full border p-4">
        <div className="flex flex-col w-full border p-4 rounded-lg bg-white h-full  dark:bg-black dark:border-gray-600 dark:border-x gap-2">
          <div className="text-3xl font-bold">
          จัดการสินค้าที่ต้องจัดส่ง
          </div>
          <div className="flex w-full">
            <DataTable products={toShipItems} userAddress={userAddress}/>
          </div>
        </div>
      </div>
    </div>
  )
}