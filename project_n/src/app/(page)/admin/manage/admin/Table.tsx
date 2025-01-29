"use client";
import React, { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { userInterface } from "@/app/interface/userInterface";
import { useSearchParams } from "next/navigation";

type prop = {
  userData: userInterface[];
};

const DataAdminTable = ({ userData }: prop) => {
  const searchParams = useSearchParams();
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  return (
    <>
      <div className="flex justify-between ">
        <div className=""></div>
        <div className=""></div>
      </div>
      <div className="w-full overflow-x-auto rounded-lg border">
        <div className="min-w-full inline-block align-middle  rounded-lg" >
          <div className="overflow-hidden  rounded-lg">
            {/* Desktop view */}
            <table className="min-w-full hidden md:table  rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Provider Name
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end gap-2">
                        <button
                          className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-black hover:bg-gray-800 text-white"
                          onClick={() => setOpenModalUpdate(true)}
                        >
                          <SquarePen className="mr-2" />
                          Update
                        </button>

                        <button
                          className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => setOpenModalDelete(true)}
                        >
                          <Trash2 className="mr-2" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile view */}
            <div className="md:hidden">
              {userData.map((item) => (
                <div key={item.id} className="bg-white p-4 border-b">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">ID: {item.id}</span>
                    <span className="text-gray-600">${item.name}</span>
                  </div>
                  <div className="mb-3">
                    <span className="text-gray-600">{item.email}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-black hover:bg-gray-800 text-white"
                      onClick={() => setOpenModalUpdate(true)}
                    >
                      <SquarePen className="mr-2" />
                      Update
                    </button>
                    {/* <UpdateTransportModal
                      transport={item}
                        onClose={() => setOpenModalUpdate(false)}
                        open={openModalUpdate}
                      /> */}
                    <button
                      className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => setOpenModalDelete(true)}
                    >
                      <Trash2 className="mr-2" />
                      Delete
                    </button>
                    {/* <DeleteTransportModal
                        id={item.id}
                        onClose={() => setOpenModalDelete(false)}
                        open={openModalDelete}
                      /> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataAdminTable;
