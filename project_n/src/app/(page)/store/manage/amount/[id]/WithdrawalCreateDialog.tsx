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
import { useSession } from "next-auth/react";
import { createBookBank, getAllBookBankByUserId } from "@/app/service/withdrawal-bookBank/servive";
import { WithDrawalBookBankInterface } from "@/app/interface/withDrawalBookBankInterface";

interface WithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  fetchAllBook:()=>void
}



export default function WithdrawalCreateDialog({
  open,
  onOpenChange,
  onClose,
  fetchAllBook,
}: WithdrawalDialogProps) {
  const {data:session } = useSession()
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    bankId: 0
  });

  const resetForm = () => {
    setFormData({
      accountNumber: "",
      accountName: "",
      bankName: "",
      bankId:0    });
  };

  const handleWithdraw = async () => {
    try {
      setIsLoading(true);

      const data = {
        userId:Number(session?.user.id),
        bookBankTypeId:formData.bankId,
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        bankName: formData.bankName,
      };
      validateWithZod(bankAccountSchema, data);
      const res = await createBookBank(data);
      if (!res.success) {
        throw Error(res.error);
      }
      toast({
        variant: "success",
        description: res.message,
      });
      resetForm();
      fetchAllBook()
      onClose();
    } catch (error: any) {
      console.log(error)
      let errorMessages = null
      if (error.fieldErrors) {
         errorMessages = Object.values(error.fieldErrors)
        .map((err:any) => err.message)
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

  const handleFormChange = (name: string, value: string|number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>บันทึกข้อมูลบัญชีพนักงาน</DialogTitle>
          <DialogDescription>
            กรุณากรอกข้อมูลบัญชีธนาคารของท่านเพื่อรับเงิน
          </DialogDescription>
        </DialogHeader>

        <BankAccountForm formData={formData} onChange={handleFormChange} />

        <DialogFooter className="flex justify-between sm:justify-between text-white">
          <button
            className="px-4 py-2 rounded-md bg-zinc-500"
            onClick={onClose}
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
