"use client";
import ShowError from "@/app/component/ShowError";
import { LoginSchema, renderError, validateWithZod } from "@/lib/zod/Schema";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedDatas = validateWithZod(LoginSchema, { username, password });
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });
      if (result?.error) {
         //handle validation errors from next-auth
        setError(result.error);
        console.error(result.error);
        return false;
      }
      router.push("/");
    } catch (error) {
      //handle validation errors from zod
      const err = renderError(error);
      setError(err.message);
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* <!-- Left: Image --> */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://humanepro.org/sites/default/files/styles/article_new/public/images/hero/F2_shutterstock_474493482_2.jpg?itok=onS2mDk3"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      {/* <!-- Right: Login Form --> */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 ">
        <h1 className="text-2xl font-semibold mb-2">Login</h1>
        <form onSubmit={onSubmit} className="space-y-2">
          {/* <!-- Username Input --> */}
          <div className="">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-900"
              autoComplete="off"
            />
          </div>
          {/* <!-- Password Input --> */}
          <div className="">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-900"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-500" />
                ) : (
                  <Eye size={20} className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
          {/* error */}
          <ShowError classname="mb-2" error={error} />
          {/* <!-- Remember Me Checkbox --> */}
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
            className="bg-gray-900 hover:bg-gray-500 text-white font-semibold rounded-md py-2 px-4 w-full"
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
