"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Breadcrumb from "@/components/Breadcrumb";

const ResetPwd = () => {
  const [enabled, setEnabled] = useState(true);

  const [error, setError] = useState("");

  const router = useRouter();

  const [closetList, setClosetList] = useState([]);

  const [closetID, setClosetID] = useState(0);

  const userData = {
    oldPassword: "",
    password: "",
    password1: "",
};

  const [data, setData] = useState(userData);


  const Create = async (e) => {
    e.preventDefault();

    if (data.oldPassword === "" || data.password === "" || data.password1 === "") {
      setError("يجب ادخال كلمة المرور القدية والجديدة أولاً .");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        const userInfo = await response.json();
        router.replace("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="">
      <Breadcrumb Tittle={"تغيير كلمة المرور"} />

      <div className="p-4 mx-4 lg:mx-[19%] my-5 mb-6 md:mb-0 ring-1 ring-gray-300 rounded-md bg-slate-100 shadow-md">
        <div className="flex justify-between align-middle pb-2">
          <div className="text-2xl ">تغيير كلمة المرور</div>
        </div>

        <form className="space-y-4" onSubmit={Create}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                كلمة المرور القديمة
              </label>
            </div>
            <div className="mt-1">
              <input
                id="oldPassword"
                name="oldPassword"
                type="password"
                //required
                value={data.oldPassword}
                onChange={(e) => setData({ ...data, oldPassword: e.target.value })}
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
                كلمة المرور الجديدة
              </label>
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                //required
                value={data.password}
                onChange={(e) =>
                  setData({ ...data, password: e.target.value })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Password1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                تأكيد كلمة المرور الجديدة
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Password1"
                name="Password1"
                type="password"
                //required
                value={data.password1}
                onChange={(e) =>
                  setData({ ...data, password1: e.target.value })
                }
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

          <div className="flex gap-x-2">
            <button
              type="submit"
              disabled={!enabled}
              className="flex justify-center w-20 rounded-md bg-green-600 px-3 py-0.5 text-sm rtl:text-lg font-semibold rtl:font-normal leading-6 text-white shadow-sm hover:bg-green-500 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              حفظ
            </button>

            <Link
              href="/"
              className="flex justify-center w-20 rounded-md bg-blue-700 px-3 py-0.5 text-sm rtl:text-lg font-semibold rtl:font-normal leading-6 text-white shadow-sm hover:bg-blue-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              تراجع
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPwd;
