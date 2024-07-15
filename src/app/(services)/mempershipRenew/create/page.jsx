"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Breadcrumb from "@/components/Breadcrumb";

const CreateMembershipRenew = () => {
  const [enabled, setEnabled] = useState(true);

  const [error, setError] = useState("");

  const router = useRouter();

  const [year, setYear] = useState("");

  const emptyData = {
    Request_ID: 0,
    Membership_ID: 0,
    Membership_No: "",
    Year: "",
    Members_Renew: 0,
    Renew_DelayPenalty: 0,
    CardPrint_Value: 0,
    Fund_Value: 0,
    Renew_Value: 0,
    Remarks: "",
  };

  const [data, setData] = useState(emptyData);

  useEffect(() => {
    setEnabled(false)
    getRenewValue();
    setEnabled(true)
  }, [year]);

  const getRenewValue = async () => {
    if (year !== "") {
      const response = await fetch(`/api/CLB_Membership_Renew_Value/${year}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await response?.json();

      if (resData?.data.length > 0) {
        //setData(resData?.data[0]);
        const X = resData?.data[0];
        setData({
          ...data,
          Membership_ID: X.Membership_ID,
          Membership_No: X.Membership_No,
          Year: X.Year,
          Members_Renew: X.Members_Renew,
          Renew_DelayPenalty: X.Renew_DelayPenalty,
          CardPrint_Value: X.CardPrint_Value,
          Fund_Value: X.Fund_Value,
          Renew_Value: X.Renew_Value,
        });
      } else {
        setData(emptyData);
      }
    }
  };

  const Create = async (e) => {
    e.preventDefault();

    if (data.Year === "") {
      setError("يجب ادخال سنة التجديد أولاً .");
      return;
    }

    try {
      const response = await fetch("/api/CLB_Renew_Membership_Request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        const userInfo = await response.json();
        router.replace("/mempershipRenew");
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
      <Breadcrumb Tittle={"طلب تجديد عضوية"} />

      <div className="p-4 mx-4 lg:mx-[19%] my-5 mb-6 md:mb-0 ring-1 ring-gray-300 rounded-md bg-slate-100 shadow-md">
        <div className="flex justify-between align-middle pb-2">
          <div className="text-2xl ">طلب جديد</div>
        </div>

        <form className="space-y-4" onSubmit={Create}>
          <div>
            <label
              htmlFor="Start_Date"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              سنة التجديد
            </label>
            <div className="mt-1">
              <select
                id="Start_Date"
                name="Start_Date"
                //type="date"
                //autoComplete="Membership_No"
                //required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-36 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              >
                <option value="">اختيار السنة</option>
                <option value={2020}>2020</option>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Members_Renew"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                قيمة التجديد
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Members_Renew"
                name="Members_Renew"
                type="number"
                disabled
                //required
                value={data.Members_Renew}
                onChange={(e) =>
                  setData({ ...data, Members_Renew: e.target.value })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Members_Renew"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                غرامة التجديد
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Renew_DelayPenalty"
                name="Renew_DelayPenalty"
                type="number"
                disabled
                //required
                value={data.Renew_DelayPenalty}
                onChange={(e) =>
                  setData({ ...data, Renew_DelayPenalty: e.target.value })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Members_Renew"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                مصاريف خدمة
              </label>
            </div>
            <div className="mt-1">
              <input
                id="CardPrint_Value"
                name="CardPrint_Value"
                type="number"
                disabled
                //required
                value={data.CardPrint_Value}
                onChange={(e) =>
                  setData({ ...data, CardPrint_Value: e.target.value })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Members_Renew"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                صندوث الدعم
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Fund_Value"
                name="Fund_Value"
                type="number"
                disabled
                //required
                value={data.Fund_Value}
                onChange={(e) =>
                  setData({ ...data, Fund_Value: e.target.value })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Members_Renew"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                الاجمالى
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Renew_Value"
                name="Renew_Value"
                type="number"
                disabled
                //required
                value={data.Renew_Value}
                onChange={(e) =>
                  setData({ ...data, Renew_Value: e.target.value })
                }
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Members_Renew"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ملاحظات
              </label>
            </div>
            <div className="mt-1">
              <textarea
                id="Remarks"
                name="Remarks"
                //type="text"
                //required
                value={data.Remarks}
                onChange={(e) => setData({ ...data, Remarks: e.target.value })}
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
              disabled = {!enabled}
              className="flex justify-center w-20 rounded-md bg-green-600 px-3 py-0.5 text-sm rtl:text-lg font-semibold rtl:font-normal leading-6 text-white shadow-sm hover:bg-green-500 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              حفظ
            </button>

            <Link
              href="/mempershipRenew"
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

export default CreateMembershipRenew;
