"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Logo from "@/../public/static/android-chrome-192x192.png";

const Signin = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const [data, setData] = useState({
    Membership_No: "",
    //National_ID: "",
    //email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    /*
    if (data.email === "" || data.password === "") {
      setError("يجب ادخال البريد الالكترونى و كلمة المرور أولاً .");
      return;
    }
    */

    if (data.Membership_No === "" || data.password === "") {
      setError("يجب ادخال رقم العضوية و كلمة المرور أولاً .");
      return;
    }

    //console.log(data);
    const isLoggedin = await signIn(
      "credentials",
      {
        ...data,
        redirect: false,
      },
      { callbackUrl: "/" }
    );

    if (isLoggedin.error !== null) {
      setError("يجب ادخال رقم العضوية و كلمة المرور بشكل صحيح ");
    } else {
      //setError("Login Successful!!");
      router.replace("/");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src={Logo}
          alt="Logo"
          width="64"
          height="64"
          className="mx-auto h-16 w-auto"
          priority
        />
        <h2 className="mt-10 text-center text-2xl font-bold rtl:font-normal leading-9 tracking-tight text-gray-900">
          تسجيل الدخول
        </h2>
      </div>

      {/* <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={loginUser}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              البريد الالكترونى
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                //required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={loginUser}>
          <div>
            <label
              htmlFor="Membership_No"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              رقم العضوية
            </label>
            <div className="mt-2">
              <input
                id="Membership_No"
                name="Membership_No"
                type="text"
                autoComplete="Membership_No"
                //required
                value={data.Membership_No}
                onChange={(e) =>
                  setData({ ...data, Membership_No: e.target.value })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                كلمة المرور
              </label>
              {/*               <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                //required
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {error && (
            <div className="mt-2">
              {/*<p className="block text-sm font-medium leading-6 text-white bg-red-500 ring-1 ring-red-800 px-3 py-1">*/}
              <p className="block text-sm font-medium leading-6 text-red-600 rounded ring-1 ring-red-500 px-3 py-1 ">
                {error}
              </p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm rtl:text-lg font-semibold rtl:font-normal leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              تسجيل الدخول
            </button>
          </div>
        </form>
        {
          <p className="mt-4 mr-4 text-right text-sm text-gray-500">
            <Link
              href="/auth/register"
              className="font-semibold rtl:font-normal leading-6 text-lg text-indigo-600 hover:text-indigo-500"
            >
              انشاء حساب جديد
            </Link>
          </p>
        }
      </div>
    </div>
  );
};

export default Signin;
