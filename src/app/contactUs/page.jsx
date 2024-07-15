import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
//import NextAuthServerSide from "@/components/NextAuthServerSide";

const ContactUs = async () => {
  return (
    <div className="">
      <Breadcrumb Tittle={"تواصل معنا"} />

      <div className="p-4 mx-4 lg:mx-[19%] my-5 mb-6 md:mb-0 ring-1 ring-gray-300 rounded-md bg-slate-100 shadow-md">
        <ul>
          <li className="flex">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-green-900 text-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
              </svg>
            </div>
            <div className="mx-4 mb-6">
              <h3 className="mb-2 text-lg font-sans font-medium leading-6 text-gray-900 dark:text-white">
                العنوان
              </h3>
              <p className="text-gray-600 dark:text-slate-400">
                مركز المدينة 2 - شارع الشباب - أمام كومبوند دار مصر
              </p>
              <p className="text-gray-600 dark:text-slate-400">
                مدينة الشروق, القاهرة, مصر
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-green-900 text-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 min-w-12"
              >
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                <path d="M15 7a2 2 0 0 1 2 2"></path>
                <path d="M15 3a6 6 0 0 1 6 6"></path>
              </svg>
            </div>
            <div className="mx-4 mb-6">
              <h3 className="mb-2 text-lg font-sans font-medium leading-6 text-gray-900 dark:text-white">
                التليفون
              </h3>
              <p className="text-gray-600" dir="ltr">
                +2 01205050125
              </p>
              <p className="text-gray-600" dir="ltr">
                +2 01205050126
              </p>
              <p className="text-gray-600" dir="ltr">
                +2 01205050124
              </p>
              <p className="text-gray-600" dir="ltr">
                +2 01205050157
              </p>
            </div>
          </li>

          <li className="flex">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-green-900 text-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                ></path>
              </svg>{" "}
            </div>
            <div className="mx-4 mb-6">
              <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                Email
              </h3>
              <p className="text-gray-600 dark:text-slate-400">
                greenhillsclub2030@gmail.com
              </p>
              <p className="text-gray-600 dark:text-slate-400">
                greenhillsclubmedia@gmail.com
              </p>
            </div>
          </li>

          <li className="flex">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-green-900 text-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                <path d="M12 7v5l3 3"></path>
              </svg>
            </div>
            <div className="mx-4 mb-4">
              <h3 className="mb-2 text-lg font-sans font-medium leading-6 text-gray-900 dark:text-white">
                ساعات العمل
              </h3>
              <p className="text-gray-600 dark:text-slate-400">
                السبت - الجمعة: 08:00 ص - 12:00 ص
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactUs;
