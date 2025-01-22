import { transportInterface } from "@/app/interface/transportInterface";
import prisma from "@/lib/prisma/db";
import DataTable from "./component/Table";
import { Plus } from "lucide-react";
import CreateTransportButton from "./component/CreateTransport-Button";

export default async function ManageTransportPage() {
  const allTransports =
    (await prisma.transport.findMany()) as transportInterface[];

  return (
    <div className="mx-auto max-w-7xl space-y-2 px-2">
      <div className="flex justify-between">
        <div className="flex">
          <p className="text-2xl font-semibold mt-8">จัดการบริษัทขนส่ง</p>
        </div>
        <div className="flex items-end">
          <CreateTransportButton/>
        </div>
      </div>
      <DataTable transports={allTransports} />
    </div>
  );
}
