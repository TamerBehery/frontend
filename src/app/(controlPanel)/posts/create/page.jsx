"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios, { Axios } from "axios";
import { useSession } from "next-auth/react";

import Breadcrumb from "@/components/Breadcrumb";

const CreatePost = () => {
  const { data, status } = useSession();

  const [disabled, setDisabled] = useState(false);

  const [error, setError] = useState("");

  const router = useRouter();

  const [post, setPost] = useState({
    id: "",
    Tittle: "",
    PostDate: "",
    Article: "",
    Image: "",
    image_Public_ID: "",
    Post_Media: [
      /*{
        Image: "",
        image_Public_ID: "",
      },*/
    ],
  });

  const [imageList, setImageList] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [uploading, setUploading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const Create = async (e) => {
    e.preventDefault();

    if (
      post.Tittle === "" ||
      post.PostDate === "" ||
      post.Article === "" ||
      !selectedFile
    ) {
      setError("يجب ادخال البيانات أولاً .");
      return;
    }

    //microsolution

    //Upload Image
    //const formData = new FormData();
    //formData.append("image", selectedFile);
    //const response1 = await axios.post("/api/upload", formData);
    //const imageData = await response1?.data;
    ////setPost({ ...data, Image: imageData?.image })
    //post.Image = imageData?.image;

    //Upload Image To Cloudinary //cloudname: drp7utbgz - upload_preset:microsolution
    // let formData = new FormData();
    // formData.append("file", selectedFiles[0]);
    // formData.append("upload_preset", "microsolution");
    // await axios
    //   .post("https://api.cloudinary.com/v1_1/drp7utbgz/upload", formData)
    //   .then((result) => {
    //     post.Image = result.data.secure_url;
    //     post.image_Public_ID = result.data.public_id;
    //   });

    setDisabled(true);

    for (let i = 0; i < selectedFiles.length; i++) {
      let formData = new FormData();
      formData.append("file", selectedFiles[i]);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESET);
      
      await axios
        .post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`, formData)
        .then((result) => {
          if (i === 0) {
            post.Image = result.data.secure_url;
            post.image_Public_ID = result.data.public_id;
          } else {
            post.Post_Media.push({
              Image: result.data.secure_url,
              image_Public_ID: result.data.public_id,
            });
          }
        });
    }

    //console.log(post);
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post }),
      });

      if (response.ok) {
        setDisabled(true);
        const postData = await response.json();
        //console.log(postData);
        router.replace("/posts");
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="">
      {status === "authenticated" && (data?.user?.Role == "Admin" || data?.user?.Role == "Editor") && (
        <div>
          <Breadcrumb Tittle={"اضافة مقال جديد"} />

          <div className="p-4 mx-4 lg:mx-[19%] my-5 mb-6 md:mb-0 ring-1 ring-gray-300 rounded-md bg-slate-100 shadow-md">
            <div className="flex justify-between align-middle pb-2">
              <div className="text-2xl ">مقال جديد</div>
            </div>

            <form className="space-y-4" onSubmit={Create}>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="Tittle"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    عنوان المقال
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="Tittle"
                    name="Tittle"
                    type="text"
                    autoComplete="Tittle"
                    disabled={disabled}
                    //required
                    value={post.Tittle}
                    onChange={(e) =>
                      setPost({ ...post, Tittle: e.target.value })
                    }
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="PostDate"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    تاريخ المقال
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="PostDate"
                    name="PostDate"
                    type="date"
                    autoComplete="PostDate"
                    disabled={disabled}
                    //required
                    value={post.PostDate}
                    onChange={(e) =>
                      setPost({ ...post, PostDate: e.target.value })
                    }
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="Article"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    المقال
                  </label>
                </div>
                <div className="mt-1">
                  <textarea
                    id="Article"
                    name="Article"
                    //type="text"
                    //required
                    disabled={disabled}
                    value={post.Article}
                    onChange={(e) =>
                      setPost({ ...post, Article: e.target.value })
                    }
                    className="block w-full h-48 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="Image"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    صورة المقال
                  </label>
                </div>
                <div className="mt-1">
                  <label>
                    <input
                      type="file"
                      multiple={true}
                      hidden
                      onChange={({ target }) => {
                        if (target.files) {
                          const file = target.files[0];
                          setSelectedImage(URL.createObjectURL(file));
                          setSelectedFile(file);
                          setUploading(false);

                          const files = target.files;
                          //setImageList(target.files);
                          let filesArr = [];
                          let imagesArr = [];
                          for (let i = 0; i < target.files.length; i++) {
                            imagesArr.push(URL.createObjectURL(files[i]));
                            filesArr.push(files[i]);
                          }
                          setSelectedImages(imagesArr);
                          setSelectedFiles(filesArr);
                        } else {
                          setUploading(true);
                        }
                      }}
                    ></input>
                    <div className="w-full h-12 aspect-video rounded flex items-center justify-center border-2 border-dashed border-gray-400 cursor-pointer overflow-hidden">
                      {/* {selectedImage ? (
                        <img
                          src={selectedImage}
                          alt=""
                          className="object-cover"
                        />
                      ) : ( */}
                      <span>Select Image</span>
                      {/* )} */}
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex flex-row flex-wrap border-2 border-gray-300">
                {selectedImages.map((i) => {
                  return (
                    <img
                      key={i}
                      src={i}
                      alt=""
                      className="object-cover w-[50%] h-36 md:h-48  p-1"
                    />
                  );
                })}
              </div>

              {error && (
                <div className="mt-2">
                  {/*<p className="block text-sm font-medium leading-6 text-white bg-red-500 ring-1 ring-red-800 px-3 py-1">*/}
                  <p className="block text-sm font-medium leading-6 text-red-600 rounded ring-1 ring-red-500 px-3 py-1 ">
                    {error}
                  </p>
                </div>
              )}

              <div className="flex gap-x-2">
                <button
                  type="submit"
                  disabled={disabled}
                  style={{ opacity: disabled ? ".5" : "1" }}
                  //enabled={enabled}
                  className="flex justify-center w-20 rounded-md bg-green-600 px-3 py-0.5 text-sm rtl:text-lg font-semibold rtl:font-normal leading-6 text-white shadow-sm hover:bg-green-500 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  حفظ
                </button>

                <Link
                  href="/posts"
                  disabled={disabled}
                  className="flex justify-center w-20 rounded-md bg-blue-700 px-3 py-0.5 text-sm rtl:text-lg font-semibold rtl:font-normal leading-6 text-white shadow-sm hover:bg-blue-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  تراجع
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
