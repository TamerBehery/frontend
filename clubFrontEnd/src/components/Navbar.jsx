"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

import Logo from "../../public/android-chrome-192x192.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handeNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
     className="sticky top-0 w-full h-24 lia shadow shadow-green-900 bg-gradient-to-b from-slate-100   via-white via-50% to-slate-100 to-100%"
    >
      <div className=" flex h-full w-full justify-between items-center px-4 xl:px-8 2xl:px-16">
        <div>
          <Link href="/">
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

        <div>
          <ul className="hidden sm:flex">
            <Link href="/">
              <li className="ml-10 font-extrabold hover:font-bold text-xl text-green-800">
                Home
              </li>
            </Link>
            <Link href="/">
              <li className="ml-10 font-semibold hover:font-bold text-xl text-green-800">
                Blogs
              </li>
            </Link>
            <Link href="/">
              <li className="ml-10 font-semibold hover:font-bold text-xl text-green-800">
                Services
              </li>
            </Link>
            <Link href="/">
              <li className="ml-10 font-semibold hover:font-bold text-xl text-green-800">
                Contact Us
              </li>
            </Link>
          </ul>
        </div>

        <div onClick={handeNav} className="sm:hidden cursor-pointer">
          <AiOutlineMenu size={35} className="text-green-800" />
        </div>
      </div>

      <div
        className={
          menuOpen
            ? "fixed top-0 left-0 w-[80%] h-screen sm:hidden bg-[#ecf0f3] bg-opacity-90  p-5 ease-in duration-500"
            : "fixed top-0 left-[-100%] h-screen p-5 ease-in duration-500"
        }
      >
        <div className="flex justify-end pb-6 border-b-2 border-b-green-800">
          <div onClick={handeNav} className="cursor-pointer">
            <AiOutlineClose size={25} className="text-green-800" />
          </div>
        </div>

        <div className="flex-col">
          <ul>
            <Link href="/">
              <li
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="py-2 font-semibold hover:font-bold text-xl text-green-800 border-b-2 border-b-green-800 cursor-pointer"
              >
                Home
              </li>
            </Link>
            <Link href="/">
              <li
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="py-2 font-semibold hover:font-bold text-xl text-green-800 border-b-2 border-b-green-800 cursor-pointer"
              >
                Blogs
              </li>
            </Link>
            <Link href="/">
              <li
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="py-2 font-semibold hover:font-bold text-xl text-green-800 border-b-2 border-b-green-800 cursor-pointer"
              >
                Services
              </li>
            </Link>
            <Link href="/">
              <li
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="py-2 font-semibold hover:font-bold text-xl text-green-800 border-b-2 border-b-green-800 cursor-pointer"
              >
                Contact Us
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
