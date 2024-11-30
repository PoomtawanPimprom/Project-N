import Link from 'next/link';
import React from 'react';

const Page = () => {
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
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form action="#" method="POST">
          {/* <!-- Username Input --> */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-900" 
              autoComplete="off" 
            />
          </div>
          {/* <!-- Password Input --> */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-900" 
              autoComplete="off" 
            />
          </div>
          {/* <!-- Remember Me Checkbox --> */}
          <div className="mb-4 flex items-center">
            <input 
              type="checkbox" 
              id="remember" 
              name="remember" 
              className="text-gray-900" 
            />
            <label htmlFor="remember" className="text-gray-600 ml-2">Remember Me</label>
          </div>
          {/* <!-- Forgot Password Link --> */}
          <div className="mb-6 text-gray-900">
            <a href="#" className="hover:underline">Forgot Password?</a>
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
          <Link href='/register' className='hover:underline'>Sign up Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
