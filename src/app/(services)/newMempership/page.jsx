"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Breadcrumb from "@/components/Breadcrumb";

const CreateNewMembership = () => {
  const [disabled, setDisabled] = useState(false);

  const [error, setError] = useState("");

  const router = useRouter();

  const [data, setData] = useState({
    Request_ID: "",
    Membership_Name: "",
    Birth_Date: "",
    Qualification: "",
    Job: "",
    Home_Adress: "",
    Home_Tel: "",
    Work_Adress: "",
    Work_Tel: "",
    Marital_Status: "",
    Wife_Name: "",
    Wife_Birth_Date: "",
    Wife_Job: "",
    Other_Membership: "",
  });

  const Create = async (e) => {
    e.preventDefault();

    if (data.Membership_Name === "" || data.Home_Tel === "") {
      setError("يجب ادخال الاسم وتليقون المنزل أولاً .");
      return;
    }

    try {
      const response = await fetch("/api/CLB_Membership_Request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        setDisabled(true);
        const userInfo = await response.json();
        //router.replace("/mempershipRenew");
        setError("");
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
      <Breadcrumb Tittle={"طلب عضوية جديدة"} />

      <div className="p-4 mx-4 lg:mx-[19%] my-5 mb-6 md:mb-0 ring-1 ring-gray-300 rounded-md bg-slate-100 shadow-md">
        <div className="flex justify-between align-middle pb-2">
          <div className="text-2xl ">طلب عضوية جديدة</div>
        </div>

        <form className="space-y-4" onSubmit={Create}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Membership_Name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                الاسم
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Membership_Name"
                name="Membership_Name"
                type="text"
                autoComplete="Membership_Name"
                disabled={disabled}
                //required
                value={data.Membership_Name}
                onChange={(e) =>
                  setData({ ...data, Membership_Name: e.target.value })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Birth_Date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                تاريخ الميلاد
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Birth_Date"
                name="Birth_Date"
                type="date"
                autoComplete="Birth_Date"
                disabled={disabled}
                //required
                value={data.Birth_Date}
                onChange={(e) =>
                  setData({ ...data, Birth_Date: e.target.value })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Qualification"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                المؤهل
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Qualification"
                name="Qualification"
                type="text"
                autoComplete="Qualification"
                disabled={disabled}
                //required
                value={data.Qualification}
                onChange={(e) =>
                  setData({ ...data, Qualification: e.target.value })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Job"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                الوظيفة
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Job"
                name="Job"
                type="text"
                autoComplete="Job"
                disabled={disabled}
                //required
                value={data.Job}
                onChange={(e) => setData({ ...data, Job: e.target.value })}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Home_Adress"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                عنوان المنزل
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Home_Adress"
                name="Home_Adress"
                type="text"
                autoComplete="Home_Adress"
                disabled={disabled}
                //required
                value={data.Home_Adress}
                onChange={(e) =>
                  setData({ ...data, Home_Adress: e.target.value })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Home_Tel"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                تليفون المنزل
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Home_Tel"
                name="Home_Tel"
                type="text"
                autoComplete="Home_Tel"
                disabled={disabled}
                //required
                value={data.Home_Tel}
                onChange={(e) => setData({ ...data, Home_Tel: e.target.value })}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Work_Adress"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                عنوان العمل
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Work_Adress"
                name="Work_Adress"
                type="text"
                autoComplete="Work_Adress"
                disabled={disabled}
                //required
                value={data.Work_Adress}
                onChange={(e) =>
                  setData({ ...data, Work_Adress: e.target.value })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Work_Tel"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                تليفون العمل
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Work_Tel"
                name="Work_Tel"
                type="text"
                autoComplete="Work_Tel"
                disabled={disabled}
                //required
                value={data.Work_Tel}
                onChange={(e) => setData({ ...data, Work_Tel: e.target.value })}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="Marital_Status"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              الحالة الاجتماعية
            </label>
            <div className="mt-1">
              <select
                id="Marital_Status"
                name="Marital_Status"
                //autoComplete="Membership_No"
                disabled={disabled}
                //required
                value={data.Marital_Status}
                onChange={(e) =>
                  setData({ ...data, Marital_Status: e.target.value })
                }
                className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              >
                <option value="">اختيار الحالة الاجتماعية</option>
                <option value={"اعزب"}>اعزب</option>
                <option value={"متزوج"}>متزوج</option>
                <option value={"مطلق"}>مطلق</option>
                <option value={"ارمل"}>ارمل</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Wife_Name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                اسم الزوجة
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Wife_Name"
                name="Wife_Name"
                type="text"
                autoComplete="Wife_Name"
                disabled={disabled}
                //required
                value={data.Wife_Name}
                onChange={(e) =>
                  setData({ ...data, Wife_Name: e.target.value })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Wife_Birth_Date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                تاريخ ميلاد الزوجة
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Wife_Birth_Date"
                name="Wife_Birth_Date"
                type="date"
                autoComplete="Wife_Birth_Date"
                disabled={disabled}
                //required
                value={data.Wife_Birth_Date}
                onChange={(e) =>
                  setData({
                    ...data,
                    Wife_Birth_Date:
                      e.target.value === "" ? null : e.target.value,
                  })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Wife_Job"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                وظيفة الزوجة
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Wife_Job"
                name="Wife_Job"
                type="text"
                autoComplete="Wife_Job"
                disabled={disabled}
                //required
                value={data.Wife_Job}
                onChange={(e) => setData({ ...data, Wife_Job: e.target.value })}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Other_Membership"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                هل مشترك فى اندية اخرى؟
              </label>
            </div>
            <div className="mt-1">
              <textarea
                id="Other_Membership"
                name="Other_Membership"
                //type="text"
                //required
                disabled={disabled}
                value={data.Other_Membership}
                onChange={(e) =>
                  setData({ ...data, Other_Membership: e.target.value })
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
              disabled={disabled}
              //enabled={enabled}
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

export default CreateNewMembership;
