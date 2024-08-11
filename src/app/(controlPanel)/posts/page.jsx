"use client";
import Navbar from "@/components/navbar/Navbar";
import Carousel from "@/components/Carousel";
import PostListManage from "@/components/PostListManage";
import SkeltonPostList from "@/components/SkeltonPostList";

import PostApis from "@/_utils/PostApis";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    /*
    PostApis.getPosts().then((res) => {
      setPosts(res.data.data);
    });
    */

    const response = await fetch("/api/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response?.json();

    if (data?.data) {
      setPosts(data?.data);
    }
  };

  return (
    <div className=" ">
      {/*{posts[0]?.attributes?.Image?.data[0]?.attributes?.url ? (  */}
      {status === "authenticated" && data?.user?.Role == "Admin" && (
        <div>
          {posts[0]?.Image ? (
            <div>
              <Link
                href="/posts/create"
                className="flex justify-center w-full rounded-md bg-slate-100 px-3 py-0.5 text-sm rtl:text-lg font-semibold rtl:font-normal leading-6 text-green-800 shadow-md hover:bg-slate-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                اضافة مقال
              </Link>

              <PostListManage posts={posts} />
            </div>
          ) : (
            <div>
              <SkeltonPostList />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
