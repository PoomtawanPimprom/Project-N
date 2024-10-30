"use client";
import ProductCard from "@/app/component/productCard";
import ReportButton from "@/app/component/reportButton";
import { productInterface } from "@/app/interface/productInterface";
import { getProductById } from "@/app/service/product/service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ModalReportForm from "../../report/component/modalReportForm";

const ProductByIdPage = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const [product, setProduct] = useState<productInterface>();
  const [count, setCount] = useState(1);

  //report system
  const [openReportModal,setOpenReportModal] = useState(false)
  
  
  const fetchData = async () => {
    const data = await getProductById(params.id);
    setProduct(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="bg-red-700 h-dvh w-3/5 p-4">
          {/* Product */}
          <div className="flex space-x-2 h-[430px] ">
            {/* image */}
            <div className="flex w-1/2 rounded-xl  bg-black">
              <img
                className="rounded-xl"
                src="https://images.unsplash.com/photo-1725714834984-4f37a2406563?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="flex flex-col w-1/2 bg-red-500 rounded-xl p-4">
              {/* name */}
              <div className="flex w-full mt-2 h-1/6">
                <div className="flex w-full">
                  <div className="w-4/5">
                    <div>
                      <p>Product name</p>
                    </div>
                    <div>review </div>
                  </div>
                  <div className="flex w-1/5 justify-end ">
                    <div>
                      <ReportButton userId={1} productId={params.id} onClick={() => setOpenReportModal(true)}/>
                      <ModalReportForm productId={params.id} open={openReportModal} onClose={()=> setOpenReportModal(false)}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-4/6  grid grid-cols-5 gap-2  border p-2 rounded-xl mt-2">
                <div className="flex h-10 border rounded-xl justify-center items-center ">
                  1
                </div>
              </div>
              <div className="flex flex-col h-1/6 justify-end">
                <div className="flex  justify-between my-2 h-10">
                  <div className="flex border border-black  rounded-lg w-32 ">
                    <button
                      onClick={() => setCount(count - 1)}
                      disabled={count === 1}
                      className="w-1/3 mx-2 justify-center items-center"
                    >
                      <p>-</p>
                    </button>
                    <div className="flex w-1/3 mx-2 justify-center items-center ">
                      <p>{count}</p>
                    </div>
                    <button
                      onClick={() => setCount(count + 1)}
                      className="w-1/3 mx-2 justify-center items-center"
                    >
                      <p>+</p>
                    </button>
                  </div>
                  <div className="flex w-full ml-3 border rounded-lg justify-center items-center">
                    <button className="justify-center items-center">
                      เพิ่มลงตะกร้า
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-2">
            <div className="flex flex-col w-full border p-2 rounded-xl">
              <div className="flex mb-2 text-2xl font-bold">
                <p>รายละเอียดสินค้า</p>
              </div>
              <div className="flex">info</div>
            </div>
          </div>
          <div
            className="flex mt-2 cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="flex flex-col w-full border p-2 rounded-xl">
              <div className="flex mb-2 text-2xl font-bold">
                <p>ร้านค้า</p>
              </div>
              <div className="flex">info</div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ProductByIdPage;
