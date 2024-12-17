"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "เกิดข้อผิดพลาด");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8 border rounded-xl p-4">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">ลืมรหัสผ่าน</h2>
          <p className="mt-2 text-sm text-gray-600">
            กรุณากรอกอีเมลของคุณเพื่อรับลิงก์สำหรับรีเซ็ตรหัสผ่าน
          </p>
        </div>

        {success ? (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-base font-bold text-green-800  ">
                  ส่งอีเมลเรียบร้อยแล้ว
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>กรุณาตรวจสอบอีเมลของคุณเพื่อดำเนินการรีเซ็ตรหัสผ่าน</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form className="" onSubmit={handleSubmit}>
            <div className="mt-8 space-y-2">
              <p className="font-semibold">อีเมล</p>
              <input
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                disabled={isLoading}
              />
              <div><p className="text-sm text-red-500 font-semibold">{error}</p></div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? "กำลังดำเนินการ..." : "ส่งลิงก์รีเซ็ตรหัสผ่าน"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
