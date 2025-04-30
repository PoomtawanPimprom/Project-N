"use client";
import { WithdrawalRequestInterface } from "@/app/interface/withDrawalRequestInterface";
import { getWithDrawalByStoreId } from "@/app/service/withdrawal-request/service";
import { useEffect, useState } from "react";

interface type {
  storeId: number | string
}

export default function WithdrawalRequestTable({ storeId }: type) {
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequestInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Filter withdrawals based on search term
  const filteredWithdrawals = withdrawals.filter(
    (item) =>
      item.accountName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.accountNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bankName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort withdrawals based on sort order
  const sortedWithdrawals = [...filteredWithdrawals].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();

    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const fetchData = async () => {
    try {
      const res = await getWithDrawalByStoreId(storeId);
      setWithdrawals(res.data);
    } catch (error) {
      console.error("Error fetching withdrawal requests:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [storeId]);

  // Function to get status badge color based on status name
  const getStatusBadgeClass = (statusName?: string) => {
    switch (statusName?.toLowerCase()) {
      case "approved":
      case "อนุมัติ":
        return "bg-green-100 text-green-800";
      case "pending":
      case "รอดำเนินการ":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
      case "ปฏิเสธ":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format currency
  const formatCurrency = (amount?: number) => {
    return amount?.toLocaleString("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) || "0.00";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="ค้นหารายการถอนเงิน..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>

          {searchTerm && (
            <span className="text-sm text-gray-600">
              พบ {filteredWithdrawals.length} รายการ
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-md ${
              sortOrder === "newest"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSortOrder("newest")}
          >
            ล่าสุด
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              sortOrder === "oldest"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSortOrder("oldest")}
          >
            เก่าสุด
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-zinc-800 rounded-lg">
          <thead className="bg-gray-50 dark:bg-zinc-900 text-gray-500 dark:text-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                ลำดับ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                เลขบัญชี
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                ชื่อบัญชี
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                ธนาคาร
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                จำนวนเงิน
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                สถานะ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                วันที่ขอถอน
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                วันที่อนุมัติ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-none">
            {sortedWithdrawals.length > 0 ? (
              sortedWithdrawals.map((item, index) => (
                <tr key={`withdrawal-row-${index}`} className="hover:bg-gray-50 dark:hover:bg-zinc-300">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {item.accountNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {item.accountName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {item.bankName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-primary">
                      {formatCurrency(item.amount)} บาท
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(item.status?.name)}`}>
                      {item.status?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("th-TH", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })
                      : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {item.approvedAt
                      ? new Date(item.approvedAt).toLocaleDateString("th-TH", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                  ไม่พบข้อมูลการถอนเงิน
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {withdrawals.length > 0 && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          แสดง {sortedWithdrawals.length} จาก {withdrawals.length} รายการ
        </div>
      )}
    </div>
  );
}