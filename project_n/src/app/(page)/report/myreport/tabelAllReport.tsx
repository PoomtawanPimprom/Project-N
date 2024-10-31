"use client";
import { reportInterface } from "@/app/interface/reportInterface";
import { getAllReportByUserId } from "@/app/service/report/service";
import { useEffect, useState } from "react";
import ModalInfoReport from "./modalInfoReport";

interface prop {
  userId: number;
}

const TabelAllReport = ({ userId }: prop) => {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [reports, setReports] = useState<reportInterface[]>([]);

  const convertFormatDate = (dataString: string) => {
    if (dataString === "") {
      return "Invalid Date";
    }
    const date = new Date(dataString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const fetchData = async () => {
    const data = await getAllReportByUserId(1);
    setReports(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col w-full h-full p-4 ">
      <div className="mt-2 text-3xl">
        <p>รายงานของฉัน</p>
      </div>
      <div className=" mt-4 relative w-full h-full overflow-x-auto rounded-lg">
        <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-baserp text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ข้อความ
              </th>
              <th scope="col" className="px-6 py-3">
                เมื่อ
              </th>
              <th scope="col" className="px-6 py-3">
                ชื่อสินค้า
              </th>
              <th scope="col" className="px-6 py-3">
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
            {reports.map((item, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{item.comment}</td>
                <td className="px-6 py-4">
                  {convertFormatDate(item.createdAt)}
                </td>
                <td className="px-6 py-4">{item.product?.name}</td>
                <td className="px-6 py-4 ">{item.reportStatus.name}</td>
                <td className="px-6 py-4">{item.reportCategory?.name}</td>
                <td className="flex px-6 py-4 justify-center">
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setMessage(item.comment);
                    }}
                    className=" rounded-xl text-white px-6 py-2 bg-green"
                  >
                    ดู
                  </button>
                </td>
                <ModalInfoReport
                  message={message}
                  open={openModal}
                  OnClose={() => setOpenModal(false)}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelAllReport;
