"use client";
import React, { useState } from "react";
import { transportInterface } from "@/app/interface/transportInterface";
import DeleteTransportModal from "./DeleteTransport-Modal";
import UpdateTransportModal from "./UpdateTransport-Modal";

type prop = {
  transports: transportInterface[];
};

const DataTable = ({ transports }: prop) => {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleUpdate = (id: number) => {
    console.log("Update item:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete item:", id);
  };

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
              {transports.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.providerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {item.transportPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <button
                        className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-black hover:bg-gray-800 text-white"
                        onClick={() => setOpenModalUpdate(true)}
                      >
                        Update
                      </button>
                      <UpdateTransportModal
                      transport={item}
                        onClose={() => setOpenModalUpdate(false)}
                        open={openModalUpdate}
                      />
                      <button
                        className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => setOpenModalDelete(true)}
                      >
                        Delete
                      </button>
                      <DeleteTransportModal
                        id={item.id}
                        onClose={() => setOpenModalDelete(false)}
                        open={openModalDelete}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
                    className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-black hover:bg-gray-800 text-white"
                    onClick={() => handleUpdate(item.id)}
                  >
                    Update
                  </button>

                  <button
                    className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleDelete(item.id)}
                  >
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
