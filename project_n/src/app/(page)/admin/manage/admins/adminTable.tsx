"use client";
import React, { useState } from "react";
import { Search, SquarePen, Trash2 } from "lucide-react";
import { userInterface } from "@/app/interface/userInterface";
import { useSearchParams } from "next/navigation";
import Table from "@/app/component/table/Table";
import TableHeader from "@/app/component/table/TableHeader";
import TableRow from "@/app/component/table/TableRow";
import TableHead from "@/app/component/table/TableHead";
import TableBody from "@/app/component/table/TableBody";
import TableData from "@/app/component/table/Tabledata";
import Input from "@/app/component/Input";
import Link from "next/link";

type prop = {
  userData: userInterface[];
};

const DataAdminTable = ({ userData }: prop) => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleOnChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <>
      {/* search */}
      <div className="flex justify-between ">
        <div  className="flex gap-2">
            <Input placeholder=""
            value={search}
            onChange={handleOnChange}
            name="search"
            type="" />
            <Link
            className="flex text-lg font-semibold px-6 py-2 bg-primary rounded-lg text-center items-center" 
            href={`/admin/manage/admins?search=${search}`}
            >ค้นหา</Link>
            <Link
            className="flex text-lg font-semibold px-6 py-2 bg-secondary text-white rounded-lg text-center items-center text-nowrap" 
            href={`/admin/manage/admins`}
            >รีเซ๊ท</Link>
        </div>
        <div className="flex"></div>
      </div>

      {/* table */}
      <div className="w-full overflow-x-auto rounded-lg border">
        <div className="min-w-full inline-block align-middle  rounded-lg">
          <div className="overflow-hidden  rounded-lg">
            {/* Desktop view */}
            <Table className="w-full text-sm text-left rtl:text-right text-accent-foreground hidden md:table">
              <TableHeader className="text-sm 2xl:text-base  text-gray-800  bg-gray-50 dark:bg-black dark:text-accent-foreground">
                <TableRow className="font-semibold">
                  <TableHead className="px-6 py-3 text-left text-sm">
                    User ID
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm">
                    Name
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm">
                    Email
                  </TableHead>
                  <TableHead className="px-6 py-3 text-right text-sm">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.map((item, index) => (
                  <TableRow
                    key={index}
                    className="bg-white border-b dark:bg-zinc-900  hover:bg-gray-50 dark:hover:bg-zinc-600"
                  >
                    <TableData
                      text-sm
                      font-medium
                      text-gray-900
                      className="px-6 py-4 "
                    >
                      {item.id}
                    </TableData>
                    <TableData className="px-6 py-4 ">{item.name}</TableData>
                    <TableData className="px-6 py-4  ">{item.email}</TableData>
                    <TableData className="px-6 py-4 ">
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
                    </TableData>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

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
