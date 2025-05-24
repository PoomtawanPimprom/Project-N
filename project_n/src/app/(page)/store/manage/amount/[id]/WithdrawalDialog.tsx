"use client";

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
import {
  getAllBookBankByUserId,
  updateDefaultBookBank,
} from "@/app/service/withdrawal-bookBank/servive";

import { WithDrawalBookBankInterface } from "@/app/interface/withDrawalBookBankInterface";
import { validateWithZod, withDrawalReqSchema } from "@/lib/zod/Schema";

import WithdrawalCreateDialog from "./WithdrawalCreateDialog";
import bankList from "@/json/bankList";
import EditBookBankDialog from "./EditBookBankDialog";
import SelectBookBankDialog from "./SelectBookBankDialog";

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
  // dialog-create
  const [dialogCreateOpen, setDialogCreateOpen] = useState(false);
  // dialog-edit
  const [dialogEditOpen, setDialogEditOpen] = useState(false);
  // dialog-select
  const [dialogSelectOpen, setDialogSelectOpen] = useState(false);

  // default status
  const [defaultStatus, setDefaultStatus] = useState(false);

  // dialog-create
  const openCreateDialog = () => {
    setDialogCreateOpen(true);
  };

  const closeCreateDialog = () => {
    setDialogCreateOpen(false);
  };
  // dialog-select
  const openSelectDialog = () => {
    setDialogSelectOpen(true);
  };

  const closeSelectDialog = () => {
    setDialogSelectOpen(false);
  };

  // dialog-edit
  const openEditDialog = () => {
    setDialogEditOpen(true);
  };

  const closeEditDialog = () => {
    setDialogEditOpen(false);
  };

  // dialog
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
      validateWithZod(withDrawalReqSchema, data);
      if (defaultStatus) {
        const currentBookbank = allBookBank.find(
          (item) => item.default === true
        );
        await updateDefaultBookBank(currentBookbank?.id!, selectBookBank?.id!);
      }
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
    return <img className="block w-10 h-10 rounded-md" src={result?.logo} />;
  };

  const fetchData = async () => {
    if (!session?.user?.id) {
      return;
    }

    const res = await getAllBookBankByUserId(Number(session.user.id));
    setAllBookBank(res.bookBank);

    const default_bookBank = res.bookBank.find(
      (bookBank: any) => bookBank.default === true
    );

    if (default_bookBank && default_bookBank.id !== null) {
      localStorage.setItem("bbid", default_bookBank.id);
      setselectBookBank(default_bookBank);
    }

    return;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const default_bookBank = allBookBank.find(
      (bookBank) => bookBank.default === true
    );
    if (!default_bookBank) {
      setselectBookBank(default_bookBank);
    } else {
      setselectBookBank(allBookBank[0]);
      setDefaultStatus(true);
    }
  }, [selectBookBank]);
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
          <div className="flex justify-between w-full">
            <label className="flex text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
              เลือกบัญชีธนาคาร
            </label>
            <button
              onClick={openCreateDialog}
              className=" text-sm text-primary hover:underline"
              type="button"
            >
              + เพิ่มบัญชีธนาคาร
            </button>
          </div>
          <div
            onClick={openSelectDialog}
            className="group relative flex mt-1 px-4 py-2 border rounded-lg w-full cursor-pointer hover:bg-gray-50 hover:border-blue-300  transition-all duration-200"
          >
            <div className="flex mr-2">
              {renderImage(selectBookBank?.bankName!)}
            </div>
            <p className="absolute hidden group-hover:block text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md top-0 right-0 mr-16 -mt-2">
              กดเพื่อเลือกบัญชี
            </p>
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <p className="text-base font-bold text-zinc-700">
                  {selectBookBank?.accountName}
                </p>
                <p className=" text-sm text-zinc-500 text-wrap">
                  {selectBookBank?.accountNumber}
                </p>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 ml-16 sm:ml-64"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditDialog();
                  }}
                >
                  แก้ไข
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <input
            type="checkbox"
            name="default"
            id="default"
            checked={defaultStatus}
            onChange={(e) => {
              setDefaultStatus(e.target.checked);
            }}
            className="mr-2"
          />
          <label
            htmlFor="default"
            className="text-sm text-zinc-700 dark:text-zinc-200"
          >
            ตั้งค่าบัญชีนี้เป็นบัญชีหลัก
          </label>
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
        open={dialogCreateOpen}
        onClose={closeCreateDialog}
        onOpenChange={openCreateDialog}
        fetchAllBook={fetchData}
      ></WithdrawalCreateDialog>
      <EditBookBankDialog
        bookBank={selectBookBank}
        open={dialogEditOpen}
        onClose={closeEditDialog}
        onOpenChange={openEditDialog}
        fetchAllBook={fetchData}
      />
      <SelectBookBankDialog
        open={dialogSelectOpen}
        onClose={closeSelectDialog}
        onOpenChange={openSelectDialog}
        selectBookBank={setselectBookBank}
        AllBookBank={allBookBank}
      />
    </Dialog>
  );
}
