import Modal from "@/app/component/modal";
import { deleteProductByID } from "@/app/service/product/service";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type ModalDeleteprop = {
    storeId:number| undefined
  id: number;
  open: boolean;
  onClose: () => void;
};

export default function ModalDelete({ id, open, onClose,storeId }: ModalDeleteprop) {
    const router = useRouter();
    const { toast }= useToast();
    const handleDelete = async (id:number) => {
        try {
            await deleteProductByID(id);
            router.refresh();
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error uploading or submitting data", error);
                toast({
                  variant: "destructive",
                  description: error.message,
                });
              } else {
                console.error("Unexpected error", error);
                toast({
                  variant: "destructive",
                  description: "An unexpected error occurred.",
                });
              }
        } finally{
            toast({
                description: "ลบสินค้าเรียบร้อยแล้ว",
            })
            setTimeout(()=>{
                router.push(`/store/${storeId}`)
            },500)
        }
    }
    return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col w-96 space-y-4">
        <div className="flex font-bold text-xl">คุณต้องการจะลบสินค้านี้ใช่หรือไม่</div>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl  shadow-sm hover:shadow-2xl duration-200 hover:bg-gray-50/50">ยกเลิก</button>
          <button onClick={()=>handleDelete(id)} className="px-4 py-2 rounded-xl bg-red-500 shadow-sm hover:shadow-2xl hover:bg-red-700  text-white">ยืนยัน</button>
        </div>
      </div>
    </Modal>
  );
}
