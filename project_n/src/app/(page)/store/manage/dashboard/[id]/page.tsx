"use client";

import { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getInfomationForDashboardByStoreID } from "@/app/service/store/service";
import {
  ShoppingBag,
  Package,
  TrendingUp,
  AlertTriangle,
  LoaderIcon,
} from "lucide-react";
import StoreSideBar from "../../StoreSideBar";

const options: Intl.DateTimeFormatOptions = {
  weekday: "long", // "long" ถูกต้อง
  year: "numeric", // "numeric" ถูกต้อง
  month: "long", // "long" ถูกต้อง
  day: "numeric", // "numeric" ถูกต้อง
};

export default function Dashboard(props: { params: Promise<{ id: number }> }) {
  const params = use(props.params);
  const storeID = params.id;
  const [data, setData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    bestSellingProductsWithNames: [],
    lowStockProducts: [],
    salesData: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchdata = async () => {
    try {
      const res = await getInfomationForDashboardByStoreID(1);
      setData(res);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const chartData = data.salesData.map((item: any) => ({
    date: new Date(item.createdAt).toLocaleDateString("th-TH", options),
    revenue: item._sum.total,
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderIcon className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen relative">
      <StoreSideBar storeId={storeID.toString()} />
      <div className="flex flex-col w-full">
        <div className="px-6 pt-4">
          <p className="text-4xl font-bold text-accent-foreground">แดชบอร์ด</p>
        </div>
        <div className="grid gap-6 p-6  ">
          {/* แถว Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm lg:text-xl font-medium text-accent-foreground">
                  ยอดขายรวม
                </CardTitle>
                <ShoppingBag className="w-4 h-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">
                  ฿{data.totalRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ยอดขายทั้งหมดของร้าน
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm lg:text-xl font-medium text-accent-foreground ">
                  จำนวนออเดอร์
                </CardTitle>
                <Package className="w-4 h-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-purple-600">
                  {data.totalOrders}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  จำนวนออเดอร์ทั้งหมด
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm lg:text-xl font-medium text-accent-foreground">
                  สินค้าขายดี
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {data.bestSellingProductsWithNames.map((item: any, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <span className="w-6 h-6 flex items-center font-semibold justify-center bg-green-100 text-green-600 rounded-full mr-2 text-xs">
                        {index + 1}
                      </span>
                      <span className="text-gray-600">{item.name}</span>
                      <span className="ml-auto font-medium text-green-600">
                        {item._sum.quantity} ชิ้น
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm lg:text-xl font-medium text-accent-foreground">
                  สินค้าใกล้หมด
                </CardTitle>
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {data.lowStockProducts.map((item: any) => (
                    <li
                      key={item.id}
                      className="flex items-center text-sm bg-red-50 rounded-lg p-2"
                    >
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-2" />
                      <span className="text-gray-600">{item.product.name}</span>
                      <span className="ml-auto font-medium text-red-600">
                        {item.quantity} ชิ้น
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* กราฟยอดขาย */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                แนวโน้มยอดขาย
              </CardTitle>
              
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: "#E5E7EB" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: "#E5E7EB" }}
                    tickFormatter={(value) => `฿${value.toLocaleString()}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      padding: "12px",
                    }}
                    formatter={(value: any) => [
                      `฿${value.toLocaleString()}`,
                      "ยอดขาย",
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    fill="#4F46E5"
                    radius={[4, 4, 0, 0]}
                    name="ยอดขาย"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
