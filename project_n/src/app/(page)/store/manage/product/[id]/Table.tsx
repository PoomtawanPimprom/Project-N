"use client";
import React, { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { productInterface } from "@/app/interface/productInterface";
import Link from "next/link";
import Table from "@/app/component/table/Table";
import TableHeader from "@/app/component/table/TableHeader";
import TableRow from "@/app/component/table/TableRow";
import TableHead from "@/app/component/table/TableHead";
import TableBody from "@/app/component/table/TableBody";
import TableData from "@/app/component/table/Tabledata";

type prop = {
  products: productInterface[];
};

const DataTable = ({ products }: prop) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          {/* Desktop view */}
          <Table className="min-w-full hidden md:table">
            <TableHeader className="text-sm 2xl:text-base  text-gray-800  bg-gray-50 dark:bg-black dark:text-accent-foreground">
              <TableRow className="font-semibold">
                <TableHead className="px-6 py-3 text-left text-sm  ">
                  ID
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm ">
                  ชื่อสินค้า
                </TableHead>
                <TableHead className="px-6 py-3 text-right text-sm ">
                  ราคา
                </TableHead>
                <TableHead className="px-6 py-3 text-right text-sm ">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((item, index) => (
                <TableRow
                  key={index}
                  className="bg-white border-b dark:bg-zinc-900  hover:bg-gray-50 dark:hover:bg-zinc-600"
                >
                  <TableData className="px-6 py-4 whitespace-nowrap text-sm ">
                    {item.id}
                  </TableData>
                  <TableData className="px-6 py-4 whitespace-nowrap text-sm ">
                    {item.name}
                  </TableData>
                  <TableData className="px-6 py-4 whitespace-nowrap text-sm text-right ">
                    {item.price}
                  </TableData>
                  <TableData className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/store/manage//product/edit/${item.id}`}
                        className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-black hover:bg-zinc-800 text-white"
                      >
                        <SquarePen className="mr-2" />
                        Update
                      </Link>
                    </div>
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Mobile view */}
          <div className="md:hidden">
            {products.map((item) => (
              <div key={item.id} className="bg-white p-4 dark:bg-black border-b">
                <div className="flex justify-between items-center mb-2">
                <span className="text-xl text-gray-600 dark:text-white">{item.name}</span>
                  <span className="text-zinc-600">{item.price} บาท</span>
                </div>
                <div className="mb-3">

                </div>
                <div className="flex gap-2 justify-end">
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
