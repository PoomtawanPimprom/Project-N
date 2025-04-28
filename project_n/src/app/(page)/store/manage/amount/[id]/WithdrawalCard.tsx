'use client';

import { useState, useEffect } from 'react';
import WithdrawalDialog from './WithdrawalDialog';

export default function WithdrawalCard() {
  const [actualBalance, setActualBalance] = useState(0);
  const [withdrawableAmount, setWithdrawableAmount] = useState(0);
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // สมมติว่าเราดึงข้อมูลจาก API
  useEffect(() => {
    // จำลองการดึงข้อมูลจาก API
    setTimeout(() => {
      const balance = 5000; // สมมติว่ายอดเงินจริงคือ 5,000 บาท
      setActualBalance(balance);
      
      const withdrawable = balance * 0.8;
      setWithdrawableAmount(withdrawable);
      
      // ตั้งเงื่อนไขปุ่ม: ถ้า 80% ของยอดเงินไม่เกิน 1,000 บาท จะไม่สามารถเบิกได้
      setCanWithdraw(withdrawable >= 1000);
    }, 1000);
  }, []);

  const openWithdrawalDialog = () => {
    if (!canWithdraw) return;
    setDialogOpen(true);
  };

  const handleWithdrawalSuccess = () => {
    setIsSuccess(true);
    setDialogOpen(false);
    
    // รีเซ็ตสถานะหลังจากแสดงข้อความสำเร็จ
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold text-center">บริการเบิกเงิน</h1>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-2">ยอดเงินที่สามารถเบิกได้</p>
            <div className="text-3xl font-bold text-center text-blue-700">
              {withdrawableAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท
            </div>
            <p className="text-gray-500 text-xs text-center mt-1">
              (80% ของยอดเงินจริง {actualBalance.toLocaleString('th-TH')} บาท)
            </p>
          </div>
          
          <div className="mt-8">
            <button
              onClick={openWithdrawalDialog}
              disabled={!canWithdraw}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition duration-200 ${
                canWithdraw
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              เบิกเงิน
            </button>
            
            {!canWithdraw && withdrawableAmount > 0 && (
              <p className="text-red-500 text-sm text-center mt-2">
                ไม่สามารถเบิกเงินได้ เนื่องจากยอดเงินต้องไม่น้อยกว่า 1,000 บาท
              </p>
            )}
            
            {isSuccess && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
                ทำรายการเบิกเงินสำเร็จ!
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 border-t">
          <p className="text-xs text-gray-500 text-center">
            หากมีข้อสงสัยเกี่ยวกับการเบิกเงิน กรุณาติดต่อฝ่ายบริการลูกค้า
          </p>
        </div>
      </div>

      {/* Dialog Component */}
      <WithdrawalDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleWithdrawalSuccess}
        withdrawableAmount={withdrawableAmount}
      />
    </div>
  );
}