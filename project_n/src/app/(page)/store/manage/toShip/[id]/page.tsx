import { orderItemInterface } from "@/app/interface/orderItemInterface";
import prisma from "@/lib/prisma/db";
import StoreSideBar from "../../StoreSideBar";
import DataTable from "./Table";
import { userAddressInterface } from "@/app/interface/userAddressInterface";

export default async function toShipPage(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;
  const storeId = Number(params.id);
  const toShipItems = (await prisma.orderItem.findMany({
    where: { storeId: storeId ,orderItemStatusId: 2 },
    orderBy: { orderItemStatusId: "desc" },
    include: { product: true, orderItemStatus: true },
  })) as orderItemInterface[];

  const userAddressIds = [...new Set(toShipItems
    .map(item => item.userAddressId)
    .filter((id): id is number => id !== undefined) // ✅ กรองเฉพาะค่าที่เป็น number
  )];
  const userAddresses = await prisma.userAddress.findMany({
    where: { id: { in: userAddressIds } },
  }) as userAddressInterface[];
  return (
    <div className="min-h-screen flex">
      <StoreSideBar storeId={storeId.toString()} />
      <div className="w-full border p-4">
        <div className="flex flex-col w-full border dark:border-none p-6 rounded-lg bg-white h-full  dark:bg-black dark:border-gray-600 dark:border-x gap-2">
          <div className="text-3xl font-bold">
            <p>

            จัดการสินค้าที่ต้องจัดส่ง
            </p>
            </div>
          <DataTable products={toShipItems} userAddress={userAddresses} />
        </div>
      </div>
    </div>
  );
}
