"use client";

import { categoryInterface } from "@/app/interface/categoryInterface";
import { inventoryInterface } from "@/app/interface/inventoryInterface";
import { productInterface } from "@/app/interface/productInterface";
import { getAllCategory } from "@/app/service/category/service";
import { deleteInventoryByInventoryId, getInventoriesByProductId } from "@/app/service/inventory/service";
import { getProductsByStoreId } from "@/app/service/product/service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inventoryByStoreIdPage = ({ params }: { params: { id: number } }) => {
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
    const data = await getProductsByStoreId(storeId,query);
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
    console.log(category, search, sortDate);
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
      // ส่ง API เพื่อลบแต่ละ id ใน selectedIds
      await Promise.all(
        selectedIds.map(async (id) => {
          await deleteInventoryByInventoryId(id); // ลบทีละ id
        })
      );
      
      // หลังจากลบเสร็จ ให้รีเฟรชข้อมูล
      fetchData();
      
      // ล้าง selectedIds
      setSelectedIds([]);
    } catch (error) {
      console.error("Error deleting selected inventories:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-4/5 h-lvh bg-red-100 p-4">
          <div className="header flex my-2 text-4xl font-bold">
            <p>Edit your Inventory</p>
          </div>
          <div className="flex my-2">
            <div className="flex space-x-2">
              <div>
                <input
                  className="p-2 rounded-lg"
                  type="text"
                  placeholder="search..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex">
                <select
                  value={category || 0}
                  className="p-2 rounded-lg"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={0} disabled>
                    เลือกหมวดหมู่
                  </option>
                  <option value="">-</option>
                  {categoryData.map((item, index) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex">
                <select
                  value={sortDate || 0}
                  className="p-2 rounded-lg"
                  onChange={(e) => setSortDate(e.target.value)}
                >
                  <option value={0} disabled>
                    เรียงจาก
                  </option>
                  <option value="desc">เก่าสุด</option>
                  <option value="asc">ล่าสุด</option>
                </select>
              </div>
              <div className="flex">
                <button 
                  className="py-2 px-4 rounded-lg bg-green text-white"
                  type="submit" 
                  onClick={handleFliterChange}>
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
                    selectedIds.length === 0 ? "bg-gray-300" : "bg-red-500"
                  }`}
                >
                  {selectedIds.length}{" "}สินค้าที่ต้องการลบ
                </button>
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-2 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Color
                  </th>
                  <th scope="col" className="px-6 py-3">
                    size
                  </th>
                  <th scope="col" className="px-6 py-3">
                    inventory
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Edit
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
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.product?.name}
                    </th>
                    <td className="px-6 py-4">{item.color}</td>
                    <td className="px-6 py-4">{item.size}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">{item.product?.price}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={()=>router.push(`/product/edit/${item.product?.id}`)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default inventoryByStoreIdPage;