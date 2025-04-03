"use client";

import Table from "@/app/component/table/Table";
import TableBody from "@/app/component/table/TableBody";
import TableData from "@/app/component/table/Tabledata";
import TableHead from "@/app/component/table/TableHead";
import TableHeader from "@/app/component/table/TableHeader";
import TableRow from "@/app/component/table/TableRow";
import { reportCategoryInterface } from "@/app/interface/reportCategoryInterface";
import { reportInterface } from "@/app/interface/reportInterface";
import { getAllReport } from "@/app/service/report/service";
import { getAllReportCategories } from "@/app/service/reportCategory/service";
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
  };

  const fetchReportCateData = async () => {
    const reportCateData = await getAllReportCategories();
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
            className="px-4 py-2 rounded-xl border "
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <select
            className="px-4 py-2 rounded-xl border "
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
            className="px-4 py-2 rounded-xl border "
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
          <button
            className=" bg-primary text-white px-4 py-2 rounded-xl hover:bg-green-900"
            onClick={handlefilter}
          >
            ค้นหา
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="relative overflow-x-auto sm:rounded-lg">
          <Table className="w-full text-sm text-left rtl:text-right text-accent-foreground">
            <TableHeader className="text-sm 2xl:text-base  text-gray-800  bg-gray-50 dark:bg-black dark:text-accent-foreground">
              <TableRow className="font-semibold">
                <TableHead className="px-6 py-3 text-left text-sm">
                  ข้อความ
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm  ">
                  รายงานเมื่อ
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm  ">
                  ผู้รายงาน
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm  ">
                  ชื่อสินค้า
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-sm  ">
                  หัวข้อรายงาน
                </TableHead>
                <TableHead className="px-6 py-3 text-right">
                  ดูรายละเอียดเพิ่มเติม
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((item, index) => (
                <TableRow
                  key={index}
                  className="bg-white border-b dark:bg-zinc-900  hover:bg-gray-50 dark:hover:bg-zinc-600"
                >
                  <TableData className="px-6 py-4">{item.comment}</TableData>
                  <TableData className="px-6 py-4">
                    {new Date(item.createdAt).toLocaleDateString("th-TH")}
                  </TableData>
                  <TableData className="px-6 py-4">{item.user?.name}</TableData>
                  <TableData className="px-6 py-4">
                    {item.product?.name}
                  </TableData>
                  <TableData className="px-6 py-4">
                    {item.reportCategory?.name}
                  </TableData>
                  <TableData className="px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        router.push(`/admin/manage/report/${item.id}`)
                      }
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      ดูเพิ่มเติม
                    </button>
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end mt-2 text-white">
            <div className="flex rounded-lg bg-primary ">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-2 py-2"
              >
                <p>Previous</p>
              </button>

              {numbers.map((item, index) => (
                <div
                  key={index}
                  className="flex px-2 py-2 w-[40px] justify-center items-center border-black border-x-[1px] "
                >
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
