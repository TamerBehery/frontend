import React from "react";
import PostCarde from "@/components/PostCarde";

const PostList = ({ posts }) => {
  return (
    <div className="flex-col space-y-2 my-4">
      {posts.map((post, i) => {
        return (
          <div key={post?.id} className="shadow-md p">
            <PostCarde key={post?.id} post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
