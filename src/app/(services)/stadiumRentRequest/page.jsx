"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import Breadcrumb from "@/components/Breadcrumb";

const StadiumRent = () => {
  const router = useRouter();

  const { data, status } = useSession();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    const response = await fetch("/api/CLB_Stadium_Rent_Request", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response?.json();

    if (data?.data) {
      setRequests(data?.data);
    }
  };

  const DateFormate = (stringDate) => {
    const date = new Date(stringDate);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div className="">
      <Breadcrumb Tittle={"طلب ايجار ملعب"} />

      <div className="p-4 mx-4 my-5 mb-6 md:mb-0 ring-1 ring-gray-300 rounded-md bg-slate-100 shadow-md">
        <div className="flex justify-between align-middle pb-2">
          <div className="text-2xl ">قائمة الطلبات</div>

          <Link
            type="submit"
            className="rounded-md bg-green-600 px-3 py-[2px] text-sm rtl:text-lg font-semibold rtl:font-normal leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            href={"/stadiumRentRequest/create"}
          >
            + اضافة طلب جديد
          </Link>
        </div>

        <div className="overflow-x-scroll">
          <table className="w-full min-w-[1024px]">
            <thead>
              <tr className="border-t-2 border-b-2">
                <th className="min-w-8 max-w-8 font-serif font-semibold text-right py-1 px-3">
                  تاريخ الطلب
                </th>
                <th className="min-w-8 max-w-8 font-serif font-semibold text-right py-1 px-3">
                  تاريخ الحجز
                </th>
                <th className="min-w-8 max-w-8 font-serif font-semibold text-right py-1 px-3">
                  حالة الطلب
                </th>
                <th className="min-w-8 max-w-8 font-serif font-semibold text-right py-1 px-3">
                  قيمة الايجار
                </th>
                <th className="min-w-32 font-serif font-semibold text-right py-1 px-3">
                  ملاحظات
                </th>
              </tr>
            </thead>
            <tbody>
              {requests?.map((request) => {
                return (
                  <tr key={request.Request_ID} className="border-b-[1px]">
                    <td className="min-w-8 max-w-8 font-sans font-normal text-right py-1 px-3">
                      {DateFormate(request.Request_Date)}
                    </td>
                    <td className="min-w-8 max-w-8 font-sans font-normal text-right py-1 px-3">
                      {DateFormate(request.Start_Date)}
                    </td>
                    <td className="min-w-8 max-w-8 font-serif font-normal text-right py-1 px-3">
                      {request.Request_State === 0 && (
                        <div className="bg-blue-500 rounded-full text-white text-center">
                          تحت المراجعة
                        </div>
                      )}
                      {request.Request_State === 1 && (
                        <div className="bg-green-500 rounded-full text-white text-center">
                          تمت المراجعة
                        </div>
                      )}
                    </td>
                    <td className="min-w-12 max-w-12 font-sans font-normal text-right py-1 px-3">
                      {request.Rent_Value}
                    </td>
                    <td className="min-w-32 font-sans font-normal text-right py-1 px-3">
                      {request.Remarks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StadiumRent;
