import React from "react";

const PostCarde = ({ post }) => {
  return (
    <div dir="rtl" className="flex items-center gap-3 bg-slate-100 shadow-md p">
      <div className="bg-white p-1 border-gray-300 border-2">
        <img src={post.image} className="max-w-40 min-w-40 min-h-28 max-h-28 shrink-0"></img>
      </div>
      <div className="">
        <h2 className="font-sans font-semibold text-xl text-green-700">
          {post.title}
        </h2>
      </div>
    </div>
  );
};

export default PostCarde;
