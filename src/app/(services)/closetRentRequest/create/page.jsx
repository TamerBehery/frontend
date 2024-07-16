"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Breadcrumb from "@/components/Breadcrumb";
import { now } from "next-auth/client/_utils";

const CreateClosetRentRequest = () => {
  const [enabled, setEnabled] = useState(true);

  const [error, setError] = useState("");

  const router = useRouter();

  const [closetList, setClosetList] = useState([]);

  const [closetID, setClosetID] = useState(0);

  const emptyData = {
    Request_ID: 0,
    Membership_ID: 0,
    //Membership_No: "",
    Year: new Date().getFullYear().toString(),
    Closet_ID: 0,
    Rent_Value: 0,
    Remarks: "",
  };

  const [data, setData] = useState(emptyData);

  useEffect(() => {
    setEnabled(false);
    getRentValue();
    setEnabled(true);
  }, [closetID]);

  useEffect(() => {
    getClosets();
  }, []);

  const getClosets = async () => {
    const response = await fetch(`/api/closet`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await response?.json();

    setClosetList(resData?.data);
  };

  const getRentValue = async () => {
    if (closetID !== 0) {
      const response = await fetch(`/api/closet/${closetID}`, {
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
          //Membership_No: X.Membership_No,
          Closet_ID: X.Closet_ID,
          Rent_Value: X.Rent_Value,
        });
      } else {
        setData(emptyData);
      }
    }
  };

  const Create = async (e) => {
    e.preventDefault();

    if (closetID === 0) {
      setError("يجب ادخال الدولاب أولاً .");
      return;
    }

    try {
      const response = await fetch("/api/CLB_Closet_Rent_Request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        const userInfo = await response.json();
        router.replace("/closetRentRequest");
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
      <Breadcrumb Tittle={"طلب ايجار دولاب"} />

      <div className="p-4 mx-4 lg:mx-[19%] my-5 mb-6 md:mb-0 ring-1 ring-gray-300 rounded-md bg-slate-100 shadow-md">
        <div className="flex justify-between align-middle pb-2">
          <div className="text-2xl ">طلب جديد</div>
        </div>

        <form className="space-y-4" onSubmit={Create}>
          <div>
            <label
              htmlFor="Closet_ID"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              الدولاب
            </label>
            <div className="mt-1">
              <select
                id="Closet_ID"
                name="Closet_ID"
                //type="date"
                //autoComplete="Membership_No"
                //required
                value={closetID}
                onChange={(e) => setClosetID(e.target.value)}
                className="w-36 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              >
                <option value="0">اختيار الدولاب</option>
                {closetList?.map((c) => {
                  return (
                    <option key={c.Closet_ID} value={c.Closet_ID}>
                      {c.Closet_Name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Year"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                سنة الايجار
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Year"
                name="Year"
                type="text"
                disabled
                //required
                value={data.Year}
                onChange={(e) => setData({ ...data, Year: e.target.value })}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="Rent_Value"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                قيمة الايجار
              </label>
            </div>
            <div className="mt-1">
              <input
                id="Rent_Value"
                name="Rent_Value"
                type="number"
                disabled
                //required
                value={data.Rent_Value}
                onChange={(e) =>
                  setData({ ...data, Rent_Value: e.target.value })
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
              disabled={!enabled}
              className="flex justify-center w-20 rounded-md bg-green-600 px-3 py-0.5 text-sm rtl:text-lg font-semibold rtl:font-normal leading-6 text-white shadow-sm hover:bg-green-500 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              حفظ
            </button>

            <Link
              href="/closetRentRequest"
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

export default CreateClosetRentRequest;
