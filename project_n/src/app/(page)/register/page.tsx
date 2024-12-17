"use client";
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

  const onSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { username, email, password };
    try {
      const validatedDatas = validateWithZod(RegisterSchema, data);
      const res = await createUser(validatedDatas);
      if (res.success) {
        toast({
          description: res.message,
        });
        router.push("/login");
      } else {
        setError(res.message);
      }
    } catch (error) {
      const err = renderError(error);
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={onSumbit}>
          {/* <!-- Username Input --> */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-900"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* <!-- Password Input --> */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-900"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-900"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error ? (
            
            <div className="mb-2 text-red-500 font-semibold">
              {error.split(", ").map((item,index)=>(
                <p key={index}>{item}</p>
              ))}
            </div>
          ) : null}

          {/* <!-- Login Button --> */}
          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-500 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Register
          </button>
        </form>
        {/* <!-- Sign up Link --> */}
        <div className="mt-2 text-gray-900 text-center">
          <Link href="/login" className="hover:underline">
            Sign in Here
          </Link>
        </div>
      </div>

      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://humanepro.org/sites/default/files/styles/article_new/public/images/hero/F2_shutterstock_474493482_2.jpg?itok=onS2mDk3"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

export default Register;
