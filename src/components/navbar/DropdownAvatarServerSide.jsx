//"use client";
//import { signIn, signOut } from "next-auth/react";
//import React, { useEffect, useState } from "react";

const DropdownAvatar = ({session}) => {
  //const { data, status } = useSession();

  //const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    //setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    //setIsOpen(false);
  };

  return (
    <div className="flex w-[110px] justify-end ml-3 sm:ml-0">
      {/* {status === "loading" && <p>loading</p>} */}


        <div className="relative ml-0">
          <img
            className="inline-block h-9 sm:h-10 w-9 sm:w-10 rounded-full ring-1 ring-gray-300"
            src={session?.user?.image}
            alt=""
            onClick={toggleDropdown}
          />

          {/*isOpen*/false && (
            <div className="absolute left-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 ">
              <ul>
                <li className="block px-4 py-2 text-sm text-gray-700 rounded-t-lg overflow-hidden">
                  <div className="overflow-hidden">
                    <p>{session?.user?.name}</p>
                    <p>{session?.user?.email}</p>
                  </div>
                </li>
                <hr />
                <li
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg cursor-pointer"
                  onClick={() => {
                    closeDropdown();
                    //signOut();
                  }}
                >
                  تسجيل الخروج
                </li>
              </ul>
            </div>
          )}
        </div>
      
    </div>
  );
};

export default DropdownAvatar;
