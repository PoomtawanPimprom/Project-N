import { transportInterface } from "@/app/interface/transportInterface";
import prisma from "@/lib/prisma/db";
import DataTable from "./component/Table";
import CreateTransportButton from "./component/CreateTransport-Button";
import AdminSideBar from "../../AdminSideBar";

export default async function ManageTransportPage() {
  const allTransports =
    (await prisma.transport.findMany()) as transportInterface[];

  return (
    <div className=" min-h-screen  flex ">
      <AdminSideBar />
      <div className="flex-grow p-6 space-y-4 ">
        <div className="flex justify-between">
          <div className="flex">
            <p className="text-3xl font-bold ">จัดการบริษัทขนส่ง</p>
          </div>
          <div className="flex items-end">
            <CreateTransportButton />
          </div>
        </div>
        <DataTable transports={allTransports} />
      </div>
    </div>
  );
}
