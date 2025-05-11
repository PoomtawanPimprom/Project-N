"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import BankAccountForm from "./BankAccountForm";
import { WithDrawalBookBankInterface } from "@/app/interface/withDrawalBookBankInterface";
import { bankAccountSchema, validateWithZod } from "@/lib/zod/Schema";
import {
  deleteBookBankById,
  updateBookBankById,
} from "@/app/service/withdrawal-bookBank/servive";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface EditBookBankDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;

  bookBank: WithDrawalBookBankInterface;
  fetchAllBook: () => void;
}

const EditBookBankDialog = ({
  open,
  onOpenChange,
  onClose,
  bookBank,
  fetchAllBook,
}: EditBookBankDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    bankId: 0,
  });
  // dialog-confirm
  const [dialogConfirmDeleteOpen, setDialogConfirmDeleteOpen] = useState(false);
  // dialog-confirm
  const openConfirmDialog = () => {
    setDialogConfirmDeleteOpen(true);
  };

  const closeConfirmDialog = () => {
    setDialogConfirmDeleteOpen(false);
  };

  const handleFormChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      accountNumber: "",
      accountName: "",
      bankName: "",
      bankId: 0,
    });
  };
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await deleteBookBankById(bookBank.id);
      if (!res.success) {
        throw Error(res.error);
      }
      toast({
        variant: "success",
        description: res.message,
      });
      fetchAllBook();
      onClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const data = {
        bankName: formData.bankName,
        accountName: formData.accountName,
        accountNumber: formData.accountNumber,
        bankId: formData.bankId,
      };
      console.log(data);
      validateWithZod(bankAccountSchema, data);
      const res = await updateBookBankById(bookBank.id, data);
      if (!res.success) {
        throw Error(res.error);
      }
      toast({
        variant: "success",
        description: res.message,
      });
      fetchAllBook();
      resetForm();
      onClose();
    } catch (error: any) {
      let errorMessages = null;
      if (error.fieldErrors) {
        errorMessages = Object.values(error.fieldErrors)
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

  useEffect(() => {
    if (bookBank) {
      setFormData({
        bankName: bookBank.bankName,
        accountName: bookBank.accountName,
        accountNumber: bookBank.accountNumber,
        bankId: bookBank.bookBankTypeId,
      });
    }
  }, [bookBank]);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>แก้ไขบัญชีธนาคาร</DialogTitle>
        </DialogHeader>
        <BankAccountForm formData={formData} onChange={handleFormChange} />
        <div className="w-full  p-1 rounded-lg">
          <div className="flex justify-between items-center w-full pt-4 border-t border-gray-200">
            <div>
              <button 
              onClick={openConfirmDialog}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 shadow-sm">
                <Trash2 size={18} />
                <span>ลบ</span>
              </button>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                ยกเลิก
              </button>
              <button
                disabled={isLoading}
                type="button"
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/80 px-4 py-2 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    กำลังทำบันทึก...
                  </span>
                ) : (
                  "บันทึก"
                )}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
      <ConfirmDeleteDialog
        loading={isLoading}
        open={dialogConfirmDeleteOpen}
        onClose={closeConfirmDialog}
        onOpenChange={openConfirmDialog}
        deleteFunc={handleDelete}
      />
    </Dialog>
  );
};

export default EditBookBankDialog;
