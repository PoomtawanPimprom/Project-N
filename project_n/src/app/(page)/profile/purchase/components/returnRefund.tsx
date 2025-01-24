import React from 'react'

export default function ReturnRefund() {
    const image = 'https://firebasestorage.googleapis.com/v0/b/project-n-eff9b.firebasestorage.app/o/user-profile.png?alt=media&token=30d9c36c-1638-42d5-82e7-fbd9e6f3e438'



    return (
        <div className="max-w-7xl mx-auto p-4 hover:shadow-lg rounded-lg">
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 p-4 border-b border-gray-200">
                    {/* Image */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32">
                        <img src={image} alt='image' className="w-full h-full object-cover rounded-lg" />
                    </div>

                    {/* Product Info */}
                    <div className="mt-3 sm:mt-0 flex-1">
                        <p className="text-lg font-semibold text-gray-800">Name</p>
                        <p className="text-gray-600">Blue</p>
                        <p className="text-gray-600">XXL</p>
                        <p className="text-gray-600">จำนวน: 100x</p>
                    </div>

                    {/* Price Info */}
                    <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                        <p className="text-lg font-semibold text-gray-800">ราคา: 1000</p>
                        {/* <p className="text-sm text-gray-500 sm:text-lg">ราคารวมทั้งหมด: 200000</p> */}
                    </div>
                </div>
            </div>

            {/* Total Price */}
            <div className="p-4 border-gray-200 text-right">
                <p className="text-lg font-semibold text-gray-800">{`ยอดรวมคำสั่งซื้อ: ฿10000000`}</p>
            </div>
        </div>
    );
}
