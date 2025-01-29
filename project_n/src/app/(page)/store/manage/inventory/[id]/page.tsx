"use client";

import { categoryInterface } from "@/app/interface/categoryInterface";
import { inventoryInterface } from "@/app/interface/inventoryInterface";
import { productInterface } from "@/app/interface/productInterface";

import { getAllCategory } from "@/app/service/category/service";
import {
  deleteInventoryByInventoryId,
  getInventoriesByProductId,
} from "@/app/service/inventory/service";
import { getProductsByStoreId } from "@/app/service/product/service";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import StoreSideBar from "../../StoreSideBar";

const inventoryByStoreIdPage = (props: { params: Promise<{ id: number }> }) => {
  const params = use(props.params);
  const router = useRouter();
  const storeId = Number(params.id);
  const [products, setProducts] = useState<productInterface[]>([]);
  const [inventories, setInventories] = useState<inventoryInterface[]>([]);
  const [categoryData, setCategoryData] = useState<categoryInterface[]>([]);

  //filter
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortDate, setSortDate] = useState("desc");

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const fetchData = async () => {
    const query = new URLSearchParams({
      category,
      search,
      sortDate,
    }).toString();
    const data = await getProductsByStoreId(storeId, query);
    setProducts(data);
    const categoryData = await getAllCategory();
    setCategoryData(categoryData);
  };

  const fetchInventoriesByProductId = async (productId: number) => {
    const query = new URLSearchParams({
      category,
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
    <div className="min-h-screen bg-gray-100 flex">
      <StoreSideBar  storeId={storeId.toString()}/>
      <div className="flex w-full dark:bg-black p-4">
        <div className="flex flex-col w-full border p-4 rounded-lg bg-white  dark:bg-black dark:border-gray-600 dark:border-x">
          <div className="header flex my-2 text-3xl font-bold dark:text-white ">
            <p>จัดการสินค้าในสต็อก</p>
          </div>
          <div className="flex my-2 ">
            <div className="flex space-x-2">
              <div>
                <input
                  className="p-2 rounded-lg border border-gray-400 dark:bg-zinc-800 dark:border-none dark:text-white focus:border-none "
                  type="text"
                  placeholder="search..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex">
                <select
                  value={category || 0}
                  className="p-2 rounded-lg border border-gray-400"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={0} disabled>
                    เลือกหมวดหมู่
                  </option>
                  <option value={""}>-</option>
                  {categoryData.map((item, index) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex">
                <select
                  value={sortDate || 0}
                  className="p-2 rounded-lg border border-gray-400  "
                  onChange={(e) => setSortDate(e.target.value)}
                >
                  <option value={0} disabled>
                    เรียงจาก
                  </option>

                  <option value="asc">เก่าสุด</option>
                  <option value="desc">ล่าสุด</option>
                </select>
              </div>
              <div className="flex">
                <button
                  className="py-2 px-4 rounded-lg bg-primary text-white"
                  type="submit"
                  onClick={handleFliterChange}
                >
                  กรอง
                </button>
              </div>
            </div>
            <div className="flex w-full justify-end items-end">
              <div className="flex">
                <button
                  disabled={selectedIds.length === 0}
                  onClick={handleDeleteSelected}
                  className={`py-2 px-4 rounded-lg  ${
                    selectedIds.length === 0
                      ? "bg-gray-200 text-gray-700 dark:bg-bg-dark dark:text-white"
                      : "bg-red-500 text-white dark:text-white"
                  }`}
                >
                  {selectedIds.length} สินค้าที่ต้องการลบ
                </button>
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto sm:rounded-lg border dark:border-gray-600">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-2 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    ชื่อสินค้า
                  </th>
                  <th scope="col" className="px-6 py-3">
                    สี
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ไซส์
                  </th>
                  <th scope="col" className="px-6 py-3">
                    สินค้าในคลัง
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ราคา
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    แก้ไข
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventories.map((item, index) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="flex justify-center items-center px-2 py-4">
                      <input
                        className="flex"
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={(e) =>
                          handleCheckboxChange(item.id, e.target.checked)
                        }
                      />
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap overflow-hidden dark:text-white"
                    >
                      {item.product?.name}
                    </th>
                    <td className="px-6 py-4">{item.color}</td>
                    <td className="px-6 py-4">{item.size}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">{item.product?.price}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          router.push(`/product/edit/${item.product?.id}`)
                        }
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        แก้ไข
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default inventoryByStoreIdPage;
