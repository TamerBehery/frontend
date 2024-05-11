"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import postApis from "@/_utils/PostApis";
import Image from "next/image";
import SkeletonPostDetails from "@/components/SkeletonPostDetails";

const Post = ({ params }) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    getPost();
  }, [params?.postId]);

  const getPost = () => {
    postApis.getPostById(params?.postId).then((res) => {
      setPost(res?.data.data);
    });
  };

  return (
    <div>
      <Breadcrumb Tittle={"مقال"}/>

      {post?.attributes?.Image?.data[0]?.attributes?.url ? (
        <div className="ArticleContainer mx-10 lg:mx-[19%]">
          <div className="my-5">
            <h1 className="text-[13px] font-medium font-sans ">
              {post?.attributes?.PostDate}
            </h1>
            <h2 className="mt-4 text-2xl font-sans font-bold">
              {post?.attributes?.Tittle}
            </h2>
          </div>

          <div>
            <Image
              src={post?.attributes?.Image?.data[0]?.attributes?.url}
              alt="Image"
              width={400}
              height={400}
              className="w-[100%] object-fill"
            />
          </div>

          <div className="my-5">
            {post?.attributes?.Article.map((text, i) => {
              return (
                <p key={i}>
                  {text?.children[0].text}
                  <br />
                </p>
              );
            })}
          </div>
        </div>
      ) : (
        <SkeletonPostDetails />
      )}
    </div>
  );
};

export default Post;
