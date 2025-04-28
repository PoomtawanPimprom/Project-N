import StoreSideBar from "../../StoreSideBar";
import WithdrawalCard from "./WithdrawalCard";

export default async function AmountPage(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;
  const storeId = Number(params.id);

  
  return (
    <div className="min-h-screen flex relative">
      <StoreSideBar storeId={storeId.toString()} />
      <div className="w-full border p-4">
        <div className="flex flex-col w-full border dark:border-none p-6 rounded-lg bg-white h-full  dark:bg-black dark:border-gray-600 dark:border-x gap-2">
          <div className="text-3xl font-bold">
            <p>เบิกรายได้</p>
          </div>
          <div className="flex justify-center items-center">
            <WithdrawalCard/>
          </div>
        </div>
      </div>
    </div>
  );
}
