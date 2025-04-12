import { orderItemInterface } from "@/app/interface/orderItemInterface";

type prop = {
  orderItem: orderItemInterface;
};

export default function ProductCard(prop: prop) {
  return (
    <div className="flex rounded-lg w-full p-4 border-zinc-300 border">
      <img src={prop.orderItem.product?.image?.image1} className="w-32 h-32 rounded-md" />
      <div className="flex w-full justify-between ml-5">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold text-black">
            {prop.orderItem.product?.name}
          </p>
          { prop.orderItem.size ?? <p className="text-zinc-500">ไซต์ : {prop.orderItem.size}</p>}
          { prop.orderItem.color ?? <p  className="text-zinc-500">สี : {prop.orderItem.color}</p>}
        </div>
        <div className="flex">
          <p className="text-3xl font-bold text-primary">
            {prop.orderItem.product?.price} บาท
          </p>
        </div>
      </div>
    </div>
  );
}
