import React from "react";
import PostCardeManage from "@/components/PostCardeManage";

const PostListManage = ({ posts }) => {
  return (
    <div className="flex-col space-y-2 my-4">
      {posts.map((post, i) => {
        return (
          <div key={post?.id} className="shadow-md p">
            <PostCardeManage key={post?.id} post={post} />
          </div>
        );
      })}      
    </div>
  );
};

export default PostListManage;
