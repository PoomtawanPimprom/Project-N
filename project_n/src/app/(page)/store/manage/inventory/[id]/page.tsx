"use client";

import { inventoryInterface } from "@/app/interface/inventoryInterface";
import { productInterface } from "@/app/interface/productInterface";

import {
  deleteInventoryByInventoryId,
  getInventoriesByProductId,
} from "@/app/service/inventory/service";
import { getProductsByStoreId } from "@/app/service/product/service";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import StoreSideBar from "../../StoreSideBar";
import Table from "@/app/component/table/Table";
import TableHeader from "@/app/component/table/TableHeader";
import TableRow from "@/app/component/table/TableRow";
import TableHead from "@/app/component/table/TableHead";
import TableBody from "@/app/component/table/TableBody";
import TableData from "@/app/component/table/Tabledata";

const inventoryByStoreIdPage = (props: { params: Promise<{ id: number }> }) => {
  const params = use(props.params);
  const router = useRouter();
  const storeId = Number(params.id);
  const [products, setProducts] = useState<productInterface[]>([]);
  const [inventories, setInventories] = useState<inventoryInterface[]>([]);

  //filter
  const [search, setSearch] = useState("");
  const [sortDate, setSortDate] = useState("desc");

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const fetchData = async () => {
    const query = new URLSearchParams({
      search,
      sortDate,
    }).toString();
    const data = await getProductsByStoreId(storeId, query);
    setProducts(data);
  };

  const fetchInventoriesByProductId = async (productId: number) => {
    const query = new URLSearchParams({
      search,
      sortDate,
    }).toString();
    const data = await getInventoriesByProductId(productId, query);
    return data;
  };
  useEffect(() => {
    if (products.length > 0) {
      const fetchAllInventories = async () => {
        const allInventories = await Promise.all(
          products.map(async (product: productInterface) => {
            const inventoriesForProduct = await fetchInventoriesByProductId(
              Number(product.id)
            );
            return inventoriesForProduct;
          })
        );
        setInventories(allInventories.flat());
      };
      fetchAllInventories();
    }
  }, [products]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleFliterChange = () => {
    fetchData();
  };

  const handleCheckboxChange = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedIds.map(async (id) => {
          await deleteInventoryByInventoryId(id); // ลบทีละ id
        })
      );
      fetchData();
      setSelectedIds([]);
    } catch (error) {
      console.error("Error deleting selected inventories:", error);
    }
  };
  return (
    <div className="min-h-screen flex relative">
  <StoreSideBar storeId={storeId.toString()} />
  <div className="w-full border p-2 md:p-4">
    <div className="flex flex-col w-full border dark:border-none p-4 md:p-6 rounded-lg bg-white h-full dark:bg-black dark:border-gray-600 dark:border-x gap-2">
      <div className="text-2xl md:text-3xl font-bold">
        <p>คลังสินค้า</p>
      </div>
      
      {/* Search และ Filter */}
      <div className="flex flex-col md:flex-row my-2 space-y-2 md:space-y-0 md:space-x-2">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full">
          <input
            className="w-full md:w-auto p-2 rounded-lg border border-gray-400 dark:bg-zinc-800 dark:border-none dark:text-white focus:border-none"
            type="text"
            placeholder="search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          
          <select
            value={sortDate || 0}
            className="w-full md:w-auto p-2 rounded-lg border border-gray-400"
            onChange={(e) => setSortDate(e.target.value)}
          >
            <option value={0} disabled>เรียงจาก</option>
            <option value="asc">เก่าสุด</option>
            <option value="desc">ล่าสุด</option>
          </select>
          
          <button
            className="w-full md:w-auto py-2 px-4 rounded-lg bg-primary text-white"
            type="submit"
            onClick={handleFliterChange}
          >
            กรอง
          </button>
          <button
            className="w-full md:w-auto py-2 px-4 rounded-lg bg-primary text-white"
            type="submit"
            onClick={handleFliterChange}
          >
            โหลดใหม่
          </button>
        </div>
        
        <div className="flex w-full justify-end items-end">
          <button
            onClick={fetchData}
            className={`w-full md:w-auto py-2 px-4 rounded-lg ${
              selectedIds.length === 0
                ? "bg-gray-200 text-gray-700 dark:bg-bg-dark dark:text-white"
                : "bg-red-500 text-white dark:text-white"
            }`}
          >
            {selectedIds.length} สินค้าที่ต้องการลบ
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border">
        <Table className="min-w-full">
          <TableHeader className="text-sm 2xl:text-base text-gray-800 bg-gray-50 dark:bg-black dark:text-accent-foreground">
            <TableRow className="font-semibold">
              <TableHead className="px-2 py-3 ">เลือก</TableHead>
              <TableHead className="px-4 py-3">ชื่อสินค้า</TableHead>
              <TableHead className="px-4 py-3 hidden md:table-cell">สี</TableHead>
              <TableHead className="px-4 py-3 hidden md:table-cell">ไซส์</TableHead>
              <TableHead className="px-4 py-3">สินค้าในคลัง</TableHead>
              <TableHead className="px-4 py-3 hidden md:table-cell">ราคา</TableHead>
              <TableHead className="px-4 py-3 text-right">แก้ไข</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventories.map((item, index) => (
              <TableRow
                key={index}
                className="bg-white border-b dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-600"
              >
                <TableData className=" px-2 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                  />
                </TableData>
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap overflow-hidden dark:text-white"
                >
                  {item.product?.name}
                </th>
                <TableData className="hidden md:table-cell px-4 py-4 text-center">{item.color}</TableData>
                <TableData className="hidden md:table-cell px-4 py-4 text-center">{item.size}</TableData>
                <TableData className="px-4 py-4 text-center">{item.quantity}</TableData>
                <TableData className="hidden md:table-cell px-4 py-4 text-center">{item.product?.price}</TableData>
                <TableData className="px-4 py-4 text-right">
                  <button
                    onClick={() => router.push(`/store/manage/product/${storeId}/edit/${item.product?.id}`)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    แก้ไข
                  </button>
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</div>
  );
};

export default inventoryByStoreIdPage;
