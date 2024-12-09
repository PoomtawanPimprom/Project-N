"use client";

import { reportCategoryInterface } from "@/app/interface/reportCategoryInterface";
import { reportInterface } from "@/app/interface/reportInterface";
import { getAllReport } from "@/app/service/report/service";
import { getAllReportCategoies } from "@/app/service/reportCategory/service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const sortDateCategoryData = ["asc", "desc"];

const ReportInfoTable = () => {
  const [reports, setReports] = useState<reportInterface[]>([]);
  const [reportCategories, setReportCategories] = useState<
    reportCategoryInterface[]
  >([]);
  const router = useRouter();

  //filter
  const [search, setSearch] = useState("");
  const [sortReportCate, setSortReportCate] = useState("");
  const [sortDate, setSortDate] = useState("desc");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPrePage = 10;
  const lastindex = currentPage * recordsPrePage;
  const firstIndex = lastindex - recordsPrePage;
  const records = reports.slice(firstIndex, lastindex);
  const totalpage = Math.ceil(reports.length / recordsPrePage);
  const numbers = Array.from({ length: totalpage }, (_, i) => i + 1);

  const fetchAllData = async () => {
    await fetchReportCateData();
    await fetchReportData();
  }

  const fetchReportCateData = async () => {

    const reportCateData = await getAllReportCategoies();
    setReportCategories(reportCateData);
  };

  const fetchReportData = async () => {
    const query = new URLSearchParams({
      sortReportCate,
      search,
      sortDate,
    }).toString();
    const AllReport = await getAllReport(query);
    setReports(AllReport);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalpage));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlefilter = () => {
    fetchReportData();
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <>
      <div className="filter flex mt-2 mb-2 space-x-2">
          <div>
            <input
              type="text"
              className="px-4 py-2 rounded-xl"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <select
              className="px-4 py-2 rounded-xl"
              value={0 || sortReportCate}
              onChange={(e) => setSortReportCate(e.target.value)}
            >
              <option value=""> - </option>
              {reportCategories.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="px-4 py-2 rounded-xl"
              value={sortDate}
              onChange={(e) => setSortDate(e.target.value)}
            >
              {sortDateCategoryData.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className=" bg-green-main text-white px-4 py-2 rounded-xl hover:bg-green-900" onClick={handlefilter}>
              ค้นหา
            </button>
          </div>
      </div>
      <div className="w-full">
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>

                <th scope="col" className="px-6 py-3">
                  ข้อความ
                </th>
                <th scope="col" className="px-6 py-3">
                  รายงานเมื่อ
                </th>
                <th scope="col" className="px-6 py-3">
                  ผู้รายงาน
                </th>
                <th scope="col" className="px-6 py-3">
                  ชื่อสินค้า
                </th>
                <th scope="col" className="px-6 py-3">
                  หัวข้อรายงาน
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  ดูรายละเอียดเพิ่มเติม
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((item, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  
                  <td className="px-6 py-4">{item.comment}</td>
                  <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString("th-TH")}</td>
                  <td className="px-6 py-4">{item.user?.name}</td>
                  <td className="px-6 py-4">{item.product?.name}</td>
                  <td className="px-6 py-4">{item.reportCategory?.name}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        router.push(`/admin/manage/report/${item.id}`)
                      }
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      ดูเพิ่มเติม
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-2">
            <div className="flex  border-2 border-slate-800 rounded-lg bg-slate-500 ">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-2 py-2"
              >
                <p>Previous</p>
              </button>

              {numbers.map((item, index) => (
                <div className="px-2 py-2 border-x-[1px] border-slate-800">
                  <a href="">{item}</a>
                </div>
              ))}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalpage}
                className="px-4 py-2"
              >
                <p>next</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportInfoTable;
