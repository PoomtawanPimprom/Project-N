import prisma from "@/lib/prisma/db";
import AdminSideBar from "../../AdminSideBar";
import DataAdminTable from "./Table";
import { userInterface } from "@/app/interface/userInterface";

export default async function ManageTransportPage( props: {
  searchParams: Promise<{ search: string | "" }>;
}) {
  const search = await props.searchParams
  const alluser =
    (await prisma.user.findMany({
      orderBy: {roleId: "desc"}
    })) as userInterface[];

  return (
    <div className=" min-h-screen flex bg-accent">
      <AdminSideBar />
      <div className="flex-grow p-6 space-y-4 ">
        <div className="flex justify-between">
          <div className="flex">
            <p className="text-3xl font-bold ">จัดการแอดมิน</p>
          </div>
        </div>
        <DataAdminTable userData={alluser} />
      </div>
    </div>
  );
}
