import prisma from "@/lib/prisma/db";
import StoreSideBar from "../../StoreSideBar";
import DataTable from "./Table";
import { productInterface } from "@/app/interface/productInterface";

export default async function manageProductPage(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;
  const storeID = Number(params.id);
  const products = (await prisma.product.findMany({
    where: { storeID: storeID, deletedAt: null },
  })) as productInterface[];
  return (
    <div className="min-h-screen  flex">
      <StoreSideBar storeId={storeID.toString()} />
      <div className="w-full border p-4">
        <div className="flex flex-col w-full border dark:border-none p-6 rounded-lg bg-white h-full  dark:bg-black dark:border-gray-600 dark:border-x gap-2">
          <div className="text-3xl font-bold mb-2">
            <p>จัดการสินค้า</p>
          </div>
          <div className="flex w-full">
            <DataTable products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
