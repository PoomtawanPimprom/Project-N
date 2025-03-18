"use client";
import Input from "@/app/component/Input";
import ShowError from "@/app/component/ShowError";
import { createUser } from "@/app/service/register/service";
import { useToast } from "@/hooks/use-toast";
import { RegisterSchema, renderError, validateWithZod } from "@/lib/zod/Schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Register() {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [error, setError] = useState("");
  const [errorZod, setErrorZod] = useState<{
    [key: string]: { message: string };
  } | null>(null);

  const onSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { username, email, password };
      validateWithZod(RegisterSchema, data);
      const res = await createUser(data);
      if (res.success) {
        toast({
          description: res.message,
        });
        router.push("/login");
      } else {
        setError(res.message);
      }
    } catch (error: any) {
      //handle validation errors from zod
      if (error.fieldErrors) {
        setErrorZod(error.fieldErrors);
        return;
      }
      const err = renderError(error);
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 ">
        <h1 className="text-2xl font-semibold mb-2">Register</h1>
        <form className="space-y-2" onSubmit={onSumbit}>
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
            error={errorZod?.username}
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
            error={errorZod?.password}
          />

          {/* <!-- Email Input --> */}
          <Input
            placeholder=""
            label="Email"
            labelClassName="font-normal text-base text-gray-600"
            type="email"
            name="email"
            inputClassName="w-full"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            error={errorZod?.email}
          />

          <ShowError classname="mb-2" error={error} />

          {/* <!-- Login Button --> */}
          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-500 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Register
          </button>
        </form>
        {/* <!-- Sign up Link --> */}
        <div className="mt-6 text-gray-900 text-center">
          <Link href="/login" className="hover:underline">
            Sign in Here
          </Link>
        </div>
      </div>

      <div className="w-1/2 h-screen hidden lg:block relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-primary flex flex-col justify-center items-center text-white p-8">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            สร้างบัญชี Shopkub ของคุณ!
          </h2>
          <p className="text-lg text-center">
            เริ่มต้นการช้อปปิ้งที่สะดวกและคุ้มค่ากับเราวันนี้
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
