import Link from "next/link";
import React from "react";

const PostCarde = ({ post }) => {
  return (
    <Link href={`/post-details/${post?.id}`}>
      <div className="flex items-center gap-3 bg-slate-100">
        <div className="bg-white p-1 border-gray-300 border-2">
          <img
            src={post?.attributes?.Image?.data[0]?.attributes?.url}
            className="max-w-40 min-w-40 min-h-28 max-h-28 shrink-0"
          ></img>
        </div>
        <div className="">
          <h2 className="font-sans font-semibold text-xl text-green-900 line-clamp-2">
            {post?.attributes?.Tittle}
          </h2>
          <h1 className="mt-1 text-[12px] font-medium font-sans text-green-900">
            {post?.attributes?.PostDate}
          </h1>

        </div>
      </div>
    </Link>
  );
};

export default PostCarde;
