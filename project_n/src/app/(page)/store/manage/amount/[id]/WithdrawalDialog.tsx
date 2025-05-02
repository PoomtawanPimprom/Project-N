"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import BankAccountForm from "./BankAccountForm";
import { createWithDrawalReq } from "@/app/service/withdrawal-request/service";
import { useToast } from "@/hooks/use-toast";
import { bankAccountSchema, validateWithZod } from "@/lib/zod/Schema";

interface WithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  withdrawableAmount: number;
  storeId: number | string;
  amount: number;
}

interface FormData {
  accountNumber: string;
  accountName: string;
  bankName: string;
}

export default function WithdrawalDialog({
  open,
  onOpenChange,
  onClose,
  withdrawableAmount,
  storeId,
  amount,
}: WithdrawalDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const closeDialog = () => {
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      accountNumber: "",
      accountName: "",
      bankName: "",
    });
    setFormErrors({});
  };

  const handleWithdraw = async () => {
    try {
      setIsLoading(true);

      const data = {
        storeId,
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        bankName: formData.bankName,
        amount,
      };
      validateWithZod(bankAccountSchema, data);
      const res = await createWithDrawalReq(data);
      if (!res.success) {
        throw Error(res.error);
      }
      toast({
        variant: "success",
        description: res.message,
      });
      onClose();
      resetForm();
    } catch (error: any) {
      console.log(error)
      if (error.fieldErrors) {
        const errorMessages = Object.values(error.fieldErrors)
        .map(err => err.message)
        .join(', ');
      
      toast({
        variant: "destructive",
        description: errorMessages,
      });

      } else {
        toast({
          variant: "destructive",
          description: error.error,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>ข้อมูลบัญชีสำหรับการเบิกเงิน</DialogTitle>
          <DialogDescription>
            กรุณากรอกข้อมูลบัญชีธนาคารของท่านเพื่อรับเงิน จำนวน{" "}
            {withdrawableAmount.toLocaleString("th-TH", {
              minimumFractionDigits: 2,
            })}{" "}
            บาท
          </DialogDescription>
        </DialogHeader>

        <BankAccountForm formData={formData} onChange={handleFormChange} />

        <DialogFooter className="flex justify-between sm:justify-between text-white">
          <button
            className="px-4 py-2 rounded-md bg-zinc-500"
            onClick={closeDialog}
          >
            ยกเลิก
          </button>
          <button
            onClick={handleWithdraw}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/80 px-4 py-2 rounded-md"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-4 w-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                กำลังทำรายการ...
              </span>
            ) : (
              "เบิกเงิน"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
