import React from "react";
import PostCarde from "@/components/PostCarde";

const PostList = ({ posts }) => {
  return (
    <div className="flex flex-wrap flex-col lg:flex-row lg:justify-between my-4">
      {posts.map((post, i) => {
        return (
          <div key={post?.id} className="shadow-md w-[100%] lg:w-[calc(50%-3px)] h-[124px] mb-2 overflow-hidden">
            <PostCarde key={post?.id} post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
