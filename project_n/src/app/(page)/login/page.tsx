"use client";
import Input from "@/app/component/Input";
import { useToast } from "@/hooks/use-toast";
import { LoginSchema, validateWithZod } from "@/lib/zod/Schema";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const {toast} = useToast()
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const [error, setError] = useState<{
    [key: string]: { message: string };
  } | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      validateWithZod(LoginSchema, { username, password });
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });
      if(!result?.ok){
        toast({ title: "เกิดข้อผิดพลาด", description:result?.error, variant:"destructive"})
        return
      }
      toast({ title:"ล็อคอินสำเร็จ", variant:"success"})
      setTimeout(()=>{
        router.push("/");

      },1000)
    } catch (error: any) {

      //handle validation errors from zod
      if (error.fieldErrors) {
        setError(error.fieldErrors);
      }
    } finally{
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* <!-- Left: Image --> */}
      <div className="w-1/2 h-screen hidden lg:block relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-primary flex flex-col justify-center items-center text-white p-8">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            ยินดีต้อนรับสู่ Shopkub!
          </h2>
          <p className="text-lg text-center">
            ลงชื่อเข้าใช้เพื่อสัมผัสประสบการณ์ช้อปปิ้งที่เหนือกว่า
          </p>
        </div>
      </div>
      {/* <!-- Right: Login Form --> */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 ">
        <h1 className="text-2xl font-semibold mb-2">Login</h1>
        <form onSubmit={onSubmit} className="space-y-2">
          
          {/* <!-- Username Input --> */}
          <Input
            label="Username"
            labelClassName="font-normal text-base text-gray-600"
            name="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            type="text"
            placeholder=""
            inputClassName="w-full"
            error={error?.username}
          />

          {/* <!-- Password Input --> */}
          <Input
            placeholder=""
            label="Password"
            labelClassName="font-normal text-base text-gray-600"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            inputClassName="w-full"
            error={error?.password}
          />

          <div className=" flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-gray-900"
            />
            <label htmlFor="remember" className="text-gray-600 ml-2">
              Remember Me
            </label>
          </div>
          {/* <!-- Forgot Password Link --> */}
          <div className="mb-6 text-gray-900">
            <Link href="/forget-password" className="hover:underline">
              Forgot Password?
            </Link>
          </div>
          {/* <!-- Login Button --> */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary disabled:button-disabled text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>
        {/* <!-- Sign up Link --> */}
        <div className="mt-6 text-gray-900 text-center">
          <Link href="/register" className="hover:underline">
            register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
