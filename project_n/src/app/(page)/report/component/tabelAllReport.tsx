"use client";
import { reportInterface } from "@/app/interface/reportInterface";
import {  useState } from "react";
import ModalInfoReport from "./modalInfoReport";
import TaskStatus from "./TaskStatus";

interface prop {
  userId: number;
  reportDataByUserID: reportInterface[];
}

const TabelAllReport = ({ userId,reportDataByUserID }: prop) => {
  const [openModal, setOpenModal] = useState(false);
  const [report, setReport] = useState<reportInterface|null>(null);
  const handleOpenReport = (data:reportInterface) =>{
    setOpenModal(true)
    setReport(data)
  }
  return (
    <div className="flex flex-col w-full h-full px-4 mx-auto ">
      <div className=" mt-4 relative w-full h-full overflow-x-auto border  rounded-lg">
        <table className=" w-full text-sm text-left rtl:text-right  rounded-lg text-gray-500 dark:text-gray-400">
          <thead className="text-baserp text-gray-700 uppercase border-b bg-gray-50 dark:bg-black dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                ข้อความ
              </th>
              <th scope="col" className="px-6 py-3 ">
              รายงานเมื่อ
              </th>
              <th scope="col" className="px-6 py-3">
                ชื่อสินค้า
              </th>
              <th scope="col" className=" px-6 py-3 flex justify-center">
                สถานะการรายงาน
              </th>
              <th scope="col" className="px-6 py-3">
                หัวข้อรายงาน
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                อ่านข้อความที่รายงาน
              </th>
            </tr>
          </thead>
          <tbody className="">
            {reportDataByUserID.map((item, index) => (
              <tr
              key={index}
              className="bg-white border-b dark:text-zinc-200 dark:bg-zinc-800  hover:bg-gray-50 dark:hover:bg-zinc-600">
                <td className="px-6 py-2">{item.comment}</td>
                <td className="px-6 py-2">
                  {new Date(item.createdAt).toLocaleDateString("th-TH")}
                </td>
                <td className="px-6 py-2">{item.product?.name}</td>
                <td className="px-6 py-2 "><TaskStatus status={item.reportStatus!.name}/></td>
                <td className="px-6 py-2">{item.reportCategory?.name}</td>
                <td className=" px-6 py-2 flex justify-center">
                  <button
                    onClick={()=>handleOpenReport(item)}
                    className=" rounded-xl text-white px-6 py-2 bg-primary"
                  >
                    ดู
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            <ModalInfoReport
              reportData={report}
              open={openModal}
              OnClose={() => setOpenModal(false)}
            />
      </div>
    </div>
  );
};

export default TabelAllReport;
