import prisma from "@/lib/prisma/db";
import { userInterface } from "@/app/interface/userInterface";
import dynamic from "next/dynamic";

const AdminSideBar = dynamic(()=> import("../../AdminSideBar"))
const DataAdminTable = dynamic(()=> import("./adminTable")) 

export default async function ManageTransportPage(props: {
  searchParams: Promise<{ search: string | "" }>;
}) {
  const search = await props.searchParams;
  const alluser = (await prisma.user.findMany({
    where: search.search
      ? {
          OR: [
            { name: { contains: search.search } },
            { email: { contains: search.search } },
          ],
        }
      : {},
    orderBy: { roleId: "desc" },
  })) as userInterface[];

  return (
    <div className=" min-h-screen flex ">
      <AdminSideBar />
      <div className="flex-grow p-6  space-y-4 ">
        <div className="flex flex-col mx-auto  ">
          <div className=" font-bold text-3xl">
            <p>จัดการแอดมิน</p>
          </div>
        </div>
        <DataAdminTable userData={alluser} />
      </div>
    </div>
  );
}
