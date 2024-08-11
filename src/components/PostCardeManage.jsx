import Link from "next/link";
import React, { useState, useRef } from "react";

import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

import Swal from "sweetalert2";
import ConfirmBox from "@/components/ConfirmBox";

const PostCardeManage = ({ post }) => {
  const cardeRef = useRef();

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const handleDialoge = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleDelete = () => {
    handleDialoge("هل انت متأكد من حذف المقال؟", true);
  };

  const deletePost = async () => {
    const response = await fetch(`/api/post/${post?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response?.json();

    if (data?.data.count > 0) {
      cardeRef.current.remove();
    }
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      handleDialoge("", false);
      deletePost();
    } else {
      handleDialoge("", false);
    }
  };

  return (
    <div ref={cardeRef}>
      <div className="flex items-center gap-3 bg-slate-100">
        <div className="bg-white p-1 border-gray-300 border-2">
          <img
            //src={post?.attributes?.Image?.data[0]?.attributes?.url}
            src={post?.Image}
            className="max-w-40 min-w-40 min-h-28 max-h-28 shrink-0"
          ></img>
        </div>
        <div className="w-full">
          <h2 className="font-sans font-semibold text-xl text-green-900 line-clamp-2">
            {/*post?.attributes?.Tittle*/}
            {post?.Tittle}
          </h2>
          <h1 className="mt-1 text-[12px] font-medium font-sans text-green-900">
            {/*post?.attributes?.PostDate*/}
            {post?.PostDate.toString()}
          </h1>
          <div className="flex justify-end px-2">
            <MdDeleteForever
              size={24}
              className="text-green-900 ml-2 cursor-pointer"
              onClick={handleDelete}
            />
            {/* <Link href="/posts/create">
              <MdEdit
                size={24}
                className="text-green-900 ml-2 cursor-pointer"
              />
            </Link> */}
          </div>
        </div>
      </div>

      {dialog.isLoading && (
        <ConfirmBox message={dialog.message} onDialog={areUSureDelete} />
      )}
    </div>
  );
};

export default PostCardeManage;
