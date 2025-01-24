"use client";
import React, { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { productInterface } from "@/app/interface/productInterface";
import Link from "next/link";

type prop = {
  products: productInterface[];
};

const DataTable = ({ products }: prop) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          {/* Desktop view */}
          <table className="min-w-full hidden md:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  ชื่อสินค้า
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  ราคา
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/store/manage//product/edit/${item.id}?storeId=${item.storeID}`}
                        className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-black hover:bg-gray-800 text-white"
                      >
                        <SquarePen className="mr-2" />
                        Update
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile view */}
          <div className="md:hidden">
            {products.map((item) => (
              <div key={item.id} className="bg-white p-4 border-b">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">ID: {item.id}</span>
                  <span className="text-gray-600">${item.name}</span>
                </div>
                <div className="mb-3">
                  <span className="text-gray-600">{item.price}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-black hover:bg-gray-800 text-white">
                    <SquarePen className="mr-2" />
                    Update
                  </button>

                  <button className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-red-600 hover:bg-red-700 text-white">
                    <Trash2 className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
