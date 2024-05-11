"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DropdownAvatar = () => {
  const { data, status } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex w-[110px] justify-end ml-3 sm:ml-0">
      {/* {status === "loading" && <p>loading</p>} */}

      {status === "unauthenticated" && (
        <button
          type="button"
          //className="px-4 py-2 text-white bg-green-800 hover:bg-green-900  focus:outline-none font-medium rounded-lg text-sm  items-center"
          className="px-3 py-2 text-xs text-green-800 font-semibold border-2 border-green-800 hover:text-white hover:bg-green-800 focus:outline-none rounded-full items-center "
          onClick={() => {
            signIn();
          }}
        >
          تسجيل الدخول
        </button>
      )}

      {status === "authenticated" && (
        <div className="relative ml-0">
          <img
            className="inline-block h-10 sm:h-10 w-10 sm:w-10 rounded-full ring-1 ring-gray-300"
            src={data?.user?.image}
            //src="/static/avatar.png"
            alt=""
            onClick={toggleDropdown}
          />

          {isOpen && (
            <div className="absolute left-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 ">
              <ul>
                <li className="block px-4 py-2 text-sm text-gray-700 rounded-t-lg overflow-hidden">
                  <div className="overflow-hidden">
                    <p>{data?.user?.name}</p>
                    <p>{data?.user?.email}</p>
                  </div>
                </li>

                <hr />
                <Link href={"/profile"}>
                  <li
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      closeDropdown();
                      //signOut();
                    }}
                  >
                    الصفحة الشخصية
                  </li>
                </Link>

                <hr />
                <li
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg cursor-pointer"
                  onClick={() => {
                    closeDropdown();
                    signOut();
                  }}
                >
                  تسجيل الخروج
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownAvatar;
