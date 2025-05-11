"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { WithDrawalBookBankInterface } from "@/app/interface/withDrawalBookBankInterface";
import bankList from "@/json/bankList";

interface WithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  selectBookBank: (item:WithDrawalBookBankInterface) => void;
  AllBookBank: WithDrawalBookBankInterface[];
}

export default function SelectBookBankDialog({
  open,
  onOpenChange,
  onClose,
  selectBookBank,
  AllBookBank,
}: WithdrawalDialogProps) {
  const renderImage = (bankname: string) => {
    const result = bankList.find((item) => item.engName === bankname);
    return <img className="block w-10 h-10 rounded-md" src={result?.logo} />;
  };

  const handleClick = (item:WithDrawalBookBankInterface) =>{
    selectBookBank(item)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>เลือกข้อมูลบัญชี</DialogTitle>
        </DialogHeader>
        {AllBookBank.map((item) => (
          <div 
          onClick={()=>{
            handleClick(item)
          }}
          key={item.accountNumber}
          className=" flex  px-4 py-2 border rounded-lg w-full cursor-pointer hover:bg-gray-50 hover:border-blue-300  transition-all duration-200">
            <div className="flex mr-2">
              {renderImage(item?.bankName!)}
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <p className="text-base font-bold text-zinc-700">
                  {item?.accountName}
                </p>
                <p className=" text-sm text-zinc-500 text-wrap">
                  {item?.accountNumber}
                </p>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 ml-16 sm:ml-64"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  เลือก
                </button>
              </div>
            </div>
          </div>
        ))}

      </DialogContent>
    </Dialog>
  );
}
