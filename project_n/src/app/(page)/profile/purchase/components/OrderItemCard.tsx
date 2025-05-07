import { orderItemInterface } from "@/app/interface/orderItemInterface";

interface prop {
  orderItem: orderItemInterface;
}

export default function OrderItemCard({ orderItem }: prop) {
  const renderWord = (status: number) => {
    switch (status) {
      case 2:
        return (
          <p className="text-gray-600">
            ชำระเงินเมื่อ : {new Date(orderItem.updatedAt).toLocaleDateString()}
          </p>
        );

      case 3:
        return (
          <p className="text-gray-600">
            จัดส่งเมื่อ : {new Date(orderItem.updatedAt).toLocaleDateString()}
          </p>
        );

      default:
        break;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 p-4  hover:bg-zinc-200 border-gray-200 dark:bg-zinc-900  dark:hover:bg-zinc-600">
      {/* Image */}
      <div className="w-24 h-24 sm:w-32 sm:h-32">
        <img
          src={orderItem.product!.image?.image1}
          alt="image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 sm:mt-0 flex-1">
        <p className="text-lg font-semibold text-gray-800 dark:text-zinc-100">
          {orderItem.product!.name}
        </p>
        <p className="text-gray-600 dark:text-zinc-300">
          {orderItem.color ? "สีของสินค้า : " + orderItem.color : ""}
        </p>
        <p className="text-gray-600 dark:text-zinc-300">
          {orderItem.size ? "ไซส์ของสินค้า : " + orderItem.size : ""}
        </p>
        <p className="text-gray-600 dark:text-zinc-300">จำนวน : {orderItem.quantity}</p>
        {renderWord(orderItem.orderItemStatusId)}
      </div>

      {/* Price Info */}
      <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <p className="text-lg font-semibold text-gray-800 dark:text-zinc-100">
          ราคา: {orderItem.quantity * orderItem.product!.price!} บาท
        </p>
      </div>
    </div>
  );
}
