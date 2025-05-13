"use client";

import { useState, useEffect } from "react";
import WithdrawalDialog from "./WithdrawalDialog";
import { getAmountByStoreId } from "@/app/service/withdrawal-request/service";

interface prop {
  storeId: number ;
}

export default function WithdrawalCard({ storeId }: prop) {
  const [actualBalance, setActualBalance] = useState(0);
  const [withdrawableAmount, setWithdrawableAmount] = useState(0);
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fecthData = async () => {
    const balance = await getAmountByStoreId(storeId);

    setActualBalance(balance.amount);

    const withdrawable = balance.amount * 0.8;
    setWithdrawableAmount(withdrawable);

    setCanWithdraw(withdrawable >= 1000);
  };

  // สมมติว่าเราดึงข้อมูลจาก API
  useEffect(() => {
    fecthData();
  }, []);

  const openWithdrawalDialog = () => {
    if (!canWithdraw) return;
    setDialogOpen(true);
  };

  const handleWithdrawalSuccess = () => {
    setDialogOpen(false);
  };

  return (
    <div className="w-full max-w-md ">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold text-center ">บริการเบิกเงิน</h1>
        </div>

        <div className="p-6 dark:bg-zinc-800">
          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-2 dark:text-zinc-200 ">
              ยอดเงินที่สามารถเบิกได้
            </p>
            <div className="text-3xl font-bold text-center text-blue-700 dark:text-blue-500">
              {withdrawableAmount.toLocaleString("th-TH", {
                minimumFractionDigits: 2,
              })}{" "}
              บาท
            </div>
            <p className="text-gray-500 text-xs text-center mt-1 dark:text-zinc-400">
              (80% ของยอดเงินจริง {actualBalance.toLocaleString("th-TH")} บาท)
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={openWithdrawalDialog}
              disabled={!canWithdraw}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition duration-200 ${
                canWithdraw
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              เบิกเงิน
            </button>

            {!canWithdraw && withdrawableAmount > 0 && (
              <p className="text-red-500 text-sm text-center mt-2">
                ไม่สามารถเบิกเงินได้ เนื่องจากยอดเงินต้องไม่น้อยกว่า 1,000 บาท
              </p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-zinc-800 p-4 border-t">
          <p className="text-xs text-gray-500 text-center">
            หากมีข้อสงสัยเกี่ยวกับการเบิกเงิน กรุณาติดต่อฝ่ายบริการลูกค้า
          </p>
        </div>
      </div>

      {/* Dialog Component */}
      <WithdrawalDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onClose={handleWithdrawalSuccess}
        withdrawableAmount={withdrawableAmount}
        storeId={storeId}
        amount={withdrawableAmount}
      />
    </div>
  );
}
