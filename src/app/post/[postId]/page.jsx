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

  const getPost = async () => {
    //postApis.getPostById(params?.postId).then((res) => {
    //  setPost(res?.data.data);
    //});

    const response = await fetch(`/api/post/${params?.postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response?.json();

    if (data?.data) {
      setPost(data?.data[0]);
    }
    //console.log(data?.data[0]);
  };

  return (
    <div>
      <Breadcrumb Tittle={"مقال"} />

      {post?.Image ? (
        <div className="ArticleContainer mx-10 lg:mx-[19%]">
          <div className="my-5">
            <h1 className="text-[13px] font-medium font-sans ">
              {post?.PostDate}
            </h1>
            <h2 className="mt-4 text-2xl font-bold font-sans text-justify">
              {post?.Tittle}
            </h2>
          </div>

          <div>
            <Image
              src={post?.Image}
              alt="Image"
              width={400}
              height={400}
              className="w-[100%] object-fill"
            />
          </div>

          <div className="my-5">
            <p className="text-justify text-lg">{post?.Article}</p>
          </div>

          {post?.Post_Media.map((i) => {
            return (
              <div className="mb-2">
                <Image
                  src={i?.Image}
                  alt="Image"
                  width={400}
                  height={400}
                  className="w-[100%] object-fill"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <SkeletonPostDetails />
      )}
    </div>
  );
};

export default Post;
