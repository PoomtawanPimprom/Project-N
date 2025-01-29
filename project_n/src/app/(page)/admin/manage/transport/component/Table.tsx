"use client";
import React, { useState } from "react";
import { transportInterface } from "@/app/interface/transportInterface";
import DeleteTransportModal from "./DeleteTransport-Modal";
import UpdateTransportModal from "./UpdateTransport-Modal";
import { SquarePen, Trash2 } from "lucide-react";
import Table from "@/app/component/table/Table";
import TableHeader from "@/app/component/table/TableHeader";
import TableRow from "@/app/component/table/TableRow";
import TableHead from "@/app/component/table/TableHead";
import TableBody from "@/app/component/table/TableBody";
import TableData from "@/app/component/table/Tabledata";

type prop = {
  transports: transportInterface[];
};

const DataTable = ({ transports }: prop) => {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          {/* Desktop view */}
          <Table className="w-full text-sm text-left rtl:text-right">
            <TableHeader className="text-sm 2xl:text-base  text-gray-800  bg-gray-50 dark:bg-black dark:text-accent-foreground">
              <TableRow className="font-semibold">
                <TableHead className="px-6 py-3 text-left text-sm  ">
                  ID
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm ">
                  Provider Name
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm  ">
                  Price
                </TableHead>
                <TableHead className="px-6 py-3 text-right text-sm ">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transports.map((item,index) => (
                <TableRow key={index} className="bg-white border-b dark:bg-zinc-900  hover:bg-gray-50 dark:hover:bg-zinc-600">
                  <TableData className="px-6 py-4 ">
                    {item.id}
                  </TableData>
                  <TableData className="px-6 py-4 ">
                    {item.providerName}
                  </TableData>
                  <TableData className="px-6 py-4 ">
                    {item.transportPrice}
                  </TableData>
                  <TableData className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <button
                        className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-black hover:bg-gray-800 text-white"
                        onClick={() => setOpenModalUpdate(true)}
                      >
                        <SquarePen className="mr-2" />
                        Update
                      </button>
                      <UpdateTransportModal
                      transport={item}
                        onClose={() => setOpenModalUpdate(false)}
                        open={openModalUpdate}
                      />
                      <button
                        className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => setOpenModalDelete(true)}
                      >
                        <Trash2 className="mr-2"/>
                        Delete
                      </button>
                      <DeleteTransportModal
                        id={item.id}
                        onClose={() => setOpenModalDelete(false)}
                        open={openModalDelete}
                      />
                    </div>
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Mobile view */}
          <div className="md:hidden">
            {transports.map((item) => (
              <div key={item.id} className="bg-white p-4 border-b">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">ID: {item.id}</span>
                  <span className="text-gray-600">${item.transportPrice}</span>
                </div>
                <div className="mb-3">
                  <span className="text-gray-600">{item.providerName}</span>
                </div>
                <div className="flex gap-2">
                <button
                        className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-black hover:bg-gray-800 text-white"
                        onClick={() => setOpenModalUpdate(true)}
                      >
                        <SquarePen className="mr-2" />
                        Update
                      </button>
                      <UpdateTransportModal
                      transport={item}
                        onClose={() => setOpenModalUpdate(false)}
                        open={openModalUpdate}
                      />
                      <button
                        className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => setOpenModalDelete(true)}
                      >
                        <Trash2 className="mr-2"/>
                        Delete
                      </button>
                      <DeleteTransportModal
                        id={item.id}
                        onClose={() => setOpenModalDelete(false)}
                        open={openModalDelete}
                      />
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
