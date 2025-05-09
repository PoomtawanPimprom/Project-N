"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { createWithDrawalReq } from "@/app/service/withdrawal-request/service";
import { getAllBookBankByUserId } from "@/app/service/withdrawal-bookBank/servive";

import { WithDrawalBookBankInterface } from "@/app/interface/withDrawalBookBankInterface";
import { bankAccountSchema, validateWithZod, withDrawalReqSchema } from "@/lib/zod/Schema";

import WithdrawalCreateDialog from "./WithdrawalCreateDialog";
import bankList from "@/json/bankList";

interface WithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  withdrawableAmount: number;
  storeId: number;
  amount: number;
}

export default function WithdrawalDialog({
  open,
  onOpenChange,
  onClose,
  withdrawableAmount,
  storeId,
  amount,
}: WithdrawalDialogProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [allBookBank, setAllBookBank] = useState<WithDrawalBookBankInterface[]>(
    []
  );
  const [selectBookBank, setselectBookBank] =
    useState<WithDrawalBookBankInterface>();
  const [isLoading, setIsLoading] = useState(false);
  const [dialogCreateOpen, setDialogCreateOpen] = useState(false);

  const openCreateDialog = () => {
    setDialogCreateOpen(true);
  };

  const closeCreateDialog = () => {
    setDialogCreateOpen(false);
  };

  const closeDialog = () => {
    onOpenChange(false);
  };

  const handleWithdraw = async () => {
    try {
      setIsLoading(true);
      const data = {
        storeId,
        amount,
        bookBankId: selectBookBank?.id,
      };
      console.log(data)
      validateWithZod(withDrawalReqSchema, data);
      const res = await createWithDrawalReq(data);
      if (!res.success) {
        throw Error(res.error);
      }
      toast({
        variant: "success",
        description: res.message,
      });
      onClose();
    } catch (error: any) {
      console.log(error);
      if (error.fieldErrors) {
        const errorMessages = Object.values(error.fieldErrors)
          .map((err: any) => err.message)
          .join(", ");

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

  const renderImage = (bankname: string) => {
    const result = bankList.find((item) => item.engName === bankname);
    return <img className="w-10 h-10 rounded-md" src={result?.logo} />;
  };


  const fetchData = async () => {
    if (!session?.user.id) {
      return;
    }
    const res = await getAllBookBankByUserId(Number(session?.user.id));
    

    setAllBookBank(res.bookBank);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    const default_bookBank = allBookBank.find((bookBank) => bookBank.default === true)
    setselectBookBank(default_bookBank)
  }, [allBookBank]);
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
        <div className="my-4">
          {/* <div 
          className="flex justify-between border rounded-lg p-4">
            <div className="flex">
              <div className="flex"></div>
              <div className="flex-col"></div>
            </div>
            <div>
              <button>กดเพื่อเลือกบัญชี</button>
            </div>
          </div> */}

          <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
            เลือกบัญชีธนาคาร
          </label>
          <Select
            onValueChange={(value) => {
              const selected = allBookBank.find(
                (bank) => bank.accountNumber === value
              );
              setselectBookBank(selected);
            }}
            value={selectBookBank?.accountNumber || ""}
          >
            <SelectTrigger className="w-full text-start py-6">
              <SelectValue placeholder="-- กรุณาเลือกบัญชีธนาคาร --" />
            </SelectTrigger>
            <SelectContent>
              {allBookBank.map((bank) => (
                <SelectItem
                  className="px-2 [&_[data-select-item-indicator]]:hidden"
                  key={bank.accountNumber}
                  value={bank.accountNumber}
                >
                  <div className="flex justify-between gap-2 w-full ">
                    <div className="flex gap-2">
                      <div>{renderImage(bank.bankName)}</div>
                      <div className="flex flex-col ">
                        <p className="font-medium ">{bank.accountName}</p>
                        <p className="text-sm ">{bank.accountNumber}</p>
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
              <div className="px-2 py-2 border-t">
                <button
                  onClick={openCreateDialog}
                  className="w-full text-sm text-primary hover:underline"
                  type="button"
                >
                  + เพิ่มบัญชีธนาคาร
                </button>
              </div>
            </SelectContent>
          </Select>
        </div>

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
      <WithdrawalCreateDialog
        fetchAllBook={fetchData}
        open={dialogCreateOpen}
        onClose={closeCreateDialog}
        onOpenChange={openCreateDialog}
      ></WithdrawalCreateDialog>
    </Dialog>
  );
}
