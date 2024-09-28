"use client"
import { useState } from 'react'

const ProductByIdPage = ({ params }: { params: { id: number } }) => {

  const [product,setProductId] = useState();
  

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
              <div className="flex w-full h-fit mb-2">
                <div className="flex w-full">
                  <div className="w-4/5">
                    <div>
                      <p>Product name</p>
                    </div>
                    <div>review </div>
                  </div>
                  <div className="flex w-1/5 justify-end ">
                    <div>
                      <p>Report</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" grid grid-cols-5 gap-2 border p-2 rounded-xl ">
                <div className="flex h-10 border rounded-xl justify-center items-center ">
                  1
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductByIdPage