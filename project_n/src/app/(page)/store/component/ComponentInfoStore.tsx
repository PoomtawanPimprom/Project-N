import { storeInterface } from "@/app/interface/storeInterface";

interface prop {
  store: storeInterface | undefined;
}
//https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
const InfoStore = ({ store }: prop) => {
  return (
    <div className="flex w-full h-full p-3 ">
      <div className=" grid grid-cols-1 lg:grid-cols-5 w-full rounded  lg:gap-3 ">
        <div className=" col-span-2 border h-[455px] rounded-xl p-3 bg-green text-white space-y-2 mb-1">
          <div>
            <h1 className="text-6xl font-black mb-2">{store?.name}</h1>
          </div>
          <p className="text-xl ">{store?.description}</p>
        </div>
        <div className=" col-span-3  border  rounded-xl mb-1 ">
          <img
            className="h-[455px] w-[1250px] rounded-xl "
            src="https://images.unsplash.com/photo-1699004817375-907e7f5887de?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default InfoStore;
