import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useUser } from "@/app/context/userContext";
import { roleInterface } from "@/app/interface/roleInterface";
import { updateRoleById } from "@/app/service/admin/admin/service";
import { SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type prop = {
  id: number | string;
  role: roleInterface[];
};

export function UpdateRole_Dialog({ id, role }: prop) {
  const router = useRouter();
  const [selectId, setSelectId] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleChangeRole = async () => {
    if (!selectId) {
      console.error("Role ID is missing");
      return;
    }

    const data = { roleId: selectId };
    console.log(id, data);

    try {
      const res = await updateRoleById(id, data);
      setSelectId("");
      router.refresh();
      // ปิด Dialog โดยใช้ ref เพื่อคลิกปุ่ม Close โดยอัตโนมัติ
      closeRef.current?.click();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <Dialog>
  <DialogTrigger asChild>
    <button className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 bg-black hover:bg-zinc-700 hover:shadow-lg hover:scale-105 text-white">
      <SquarePen className="mr-2" /> แก้ไข
    </button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle className="text-xl font-bold">แก้ไขระดับของผู้ใช้</DialogTitle>
    </DialogHeader>
    <Select onValueChange={(value) => setSelectId(value)}>
      <SelectTrigger className="w-full border-2 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-400">
        <SelectValue placeholder="ระดับของผู้ใช้" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="font-medium">ตำแหน่ง</SelectLabel>
          {role.map((item, index) => (
            <SelectItem 
              value={item.id.toString()} 
              key={`select-${index}`}
              className="hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    <DialogFooter className="gap-2 mt-4">
      <DialogClose asChild ref={closeRef}>
        <button
          type="button"
          className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 bg-zinc-700 hover:bg-zinc-600 hover:shadow-md text-white"
        >
          Close
        </button>
      </DialogClose>
      <button
        onClick={handleChangeRole}
        className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 bg-primary hover:bg-primary/80 hover:shadow-md hover:scale-105 text-white"
        type="submit"
      >
        ยืนยัน
      </button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  );
}
