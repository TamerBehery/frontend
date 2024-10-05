"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import DropdownAvatar from "@/components/navbar/DropdownAvatar";

import Logo from "@/../public/static/android-chrome-192x192.png";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiOutlineWhatsApp,
  AiOutlineHome,
} from "react-icons/ai";
import {
  FaWhatsappSquare,
  FaYoutubeSquare,
  FaFacebookSquare,
  FaTelegramPlane,
} from "react-icons/fa";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeElement, setActiveElement] = useState("Home");

  const handeNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="sticky top-0 w-full h-[88px] sm:h-24 lia shadow shadow-green-900 bg-gradient-to-b from-slate-100   via-white via-50% to-slate-100 to-100%">
      <div className=" flex h-full w-full justify-between items-center px-4 xl:px-8 2xl:px-16">
        <div>
          <Link href="/" onClick={() => setActiveElement("Home")}>
            <Image
              src={Logo}
              alt="Logo"
              width="64"
              height="64"
              className="cursor-pointer"
              priority
            />
          </Link>
        </div>

        <div dir="rtl" className="flex-grow">
          <ul className="hidden md:flex justify-center">
            <Link href="/" onClick={() => setActiveElement("Home")}>
              <li className="mx-3 lg:mx-5 font-sans font-semibold hover:font-bold text-sm lg:text-xl text-green-800">
                الرئيسية
              </li>
            </Link>

            <Link href="/newMempership" onClick={() => setActiveElement("/")}>
              <li className="mx-3 lg:mx-5 font-sans font-semibold hover:font-bold text-sm lg:text-xl text-green-800">
                طلب عضوية جديدة
              </li>
            </Link>

            {status === "authenticated" && data?.user?.Role != "Editor" && (
              <Link href="/" onClick={() => setActiveElement("Service")}>
                <li className="mx-3 lg:mx-5 font-sans font-semibold hover:font-bold text-sm lg:text-xl text-green-800">
                  خدمات الاعضاء
                </li>
              </Link>
            )}

            <Link
              href="/contactUs"
              onClick={() => setActiveElement("contactUs")}
            >
              <li className="mx-3 lg:mx-5 font-sans font-semibold hover:font-bold text-sm lg:text-xl text-green-800">
                تواصل معنا
              </li>
            </Link>

            {status === "authenticated" &&
              (data?.user?.Role === "Admin" ||
                data?.user?.Role === "Editor") && (
                <Link href="/posts" onClick={() => setActiveElement("Service")}>
                  <li className="mx-3 lg:mx-5 font-sans font-semibold hover:font-bold text-sm lg:text-xl text-green-800">
                    إدارة التقارير الإخبارية
                  </li>
                </Link>
              )}
          </ul>
        </div>

        <div className="flex">
          <DropdownAvatar />

          <div onClick={handeNav} className="md:hidden cursor-pointer">
            <AiOutlineMenu size={42} className="text-green-800" />
          </div>
        </div>
      </div>

      <div
        className={
          menuOpen
            ? "fixed top-0 left-0 w-[80%] h-screen md:hidden bg-[#ecf0f3] bg-opacity-90  p-5 ease-in duration-500"
            : "fixed top-0 left-[-100%] h-screen p-5 ease-in duration-500"
        }
      >
        <div className="flex justify-end pb-6 border-b-2 border-b-green-900">
          <div onClick={handeNav} className="cursor-pointer">
            <AiOutlineClose size={25} className="text-green-900" />
          </div>
        </div>

        <div className="flex-col text-right">
          <ul>
            <Link href="/">
              <li
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="py-2 font-sans font-semibold hover:font-bold text-xl text-green-900 border-b-2 border-b-green-900 cursor-pointer"
              >
                الرئيسية
              </li>
            </Link>

            <Link href="/newMempership">
              <li
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="py-2 font-sans font-semibold hover:font-bold text-xl text-green-900 border-b-2 border-b-green-900 cursor-pointer"
              >
                طلب عضوية جديدة
              </li>
            </Link>

            {status === "authenticated" && data?.user?.Role != "Editor" && (
              <Link href="/mempershipRenew">
                <li
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  className="py-2 font-sans font-semibold hover:font-bold text-xl text-green-900 border-b-2 border-b-green-900 cursor-pointer"
                >
                  طلب تجديد عضوية
                </li>
              </Link>
            )}

            {status === "authenticated" && data?.user?.Role != "Editor" && (
              <Link href="/closetRentRequest">
                <li
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  className="py-2 font-sans font-semibold hover:font-bold text-xl text-green-900 border-b-2 border-b-green-900 cursor-pointer"
                >
                  طلب ايجار دولاب
                </li>
              </Link>
            )}

            {status === "authenticated" && data?.user?.Role != "Editor" && (
              <Link href="/stadiumRentRequest">
                <li
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                  className="py-2 font-sans font-semibold hover:font-bold text-xl text-green-900 border-b-2 border-b-green-900 cursor-pointer"
                >
                  طلب ايجار ملعب
                </li>
              </Link>
            )}

            <Link href="/contactUs">
              <li
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="py-2 font-sans font-semibold hover:font-bold text-xl text-green-800 border-b-2 border-b-green-800 cursor-pointer"
              >
                تواصل معنا
              </li>
            </Link>

            {status === "authenticated" && (data?.user?.Role === "Admin" || data?.user?.Role === "Editor") && (
                <Link href="/posts">
                  <li
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    className="py-2 font-sans font-semibold hover:font-bold text-xl text-green-900 border-b-2 border-b-green-900 cursor-pointer"
                  >
                    إدارة التقارير الإخبارية
                  </li>
                </Link>
              )}
          </ul>

          <div
            className="py-4 font-sans font-semibold hover:font-bold text-xl text-green-900 border-b-2 border-b-green-900
           flex justify-between items-center"
          >
            <div>تابعنا</div>

            <div className="flex justify-center items-center gap-3 flex-grow">
              <a
                href="https://www.facebook.com/greenhillsclub1/"
                target="_blank"
              >
                <FaFacebookSquare size={30} className="text-green-900" />
              </a>

              <a href="https://t.me/Green_Hills_Club" target="_blank">
                <FaTelegramPlane size={30} className="text-green-900" />
              </a>

              <a href="https://wa.me/201278157070/" target="_blank">
                <FaWhatsappSquare size={30} className="text-green-900" />
              </a>

              <a target="_blank" href="https://youtube.com/@greenhillsclub2124">
                <FaYoutubeSquare size={30} className="text-green-900" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
