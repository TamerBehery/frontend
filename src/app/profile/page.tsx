import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import UploadImage from "@/components/UploadImage";

const profile = () => {
  return (
    <div className="">
      <Breadcrumb Tittle={"الصفحة الشخصية"} />

      <div className="space-y-6 p-4 mx-4 lg:mx-[19%] my-5 mb-6 md:mb-0 ring-1 ring-gray-300 rounded-md bg-slate-100 shadow-md">
        <div className="col-span-full">
          <label
            htmlFor="photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Photo
          </label>
        </div>

        <div className="col-span-full">
          <UploadImage />
        </div>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          سوف يتم تطبيق الصورة الشخصية الجديدة للحساب بعد اول عملية تسجيل خروج
          ودخول .
        </p>
      </div>
    </div>
  );
};

export default profile;
