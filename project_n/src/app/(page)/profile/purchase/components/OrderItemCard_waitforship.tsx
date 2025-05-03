import { orderItemInterface } from "@/app/interface/orderItemInterface";

interface prop {
  product: any;
}

export default function OrderItemCard_waitforship({ product }: prop) {

 
  const renderWord = (status:number) =>{
    switch (status) {
      case 2:
        return <p className="text-gray-600">ชำระเงินเมื่อ : {new Date(product.updatedAt).toLocaleDateString()}</p>

      case 3:
        return<p className="text-gray-600">จัดส่งเมื่อ : {new Date(product.updatedAt).toLocaleDateString()}</p>
    
      default:
        break;
    }
  }

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:gap-4 p-4 hover:bg-zinc-200 border-gray-200"
    >
      {/* Image */}
      <div className="w-24 h-24 sm:w-32 sm:h-32">
        <img
          src={product.image?.image1}
          alt="image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 sm:mt-0 flex-1">
        <p className="text-lg font-semibold text-gray-800">
          {product.name}
        </p>
        <p className="text-gray-600">
          {product.color ? "สีของสินค้า : " + product.color : ""}
        </p>
        <p className="text-gray-600">
          {product.size ? "ไซส์ของสินค้า : " + product.size : ""}
        </p>
        <p className="text-gray-600">จำนวน : {product.quantity}</p>
        {renderWord(product.orderItemStatusId)}
        
        
      </div>

      {/* Price Info */}
      <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <p className="text-lg font-semibold text-gray-800">
          ราคา: {product.quantity * product.price!} บาท
        </p>
      </div>
    </div>
  );
}
