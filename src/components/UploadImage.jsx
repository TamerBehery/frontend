"use client";
import axios, { Axios } from "axios";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const UploadImage = () => {
  const session = useSession();
  const user = session?.data?.user;
  //console.log(session?.data?.user);
  const [uploading, setUploading] = useState(true);
  const [isNotSelectFile, setIsNotSelectFile] = useState(true);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const handleUpload = async () => {
    setUploading(true);
    //try {
    if (!selectedFile) {
      //console.log()
      alert("يجب اختيار الصورة اولا");

      //setUploading(false);
      return;
    }

    ////Upload Image
    //Upload Image To Cloudinary //cloudname: drp7utbgz - upload_preset:microsolution
    //const formData = new FormData();
    //formData.append("image", selectedFile);
    //const response = await axios.post("/api/upload", formData);
    //const data = await response?.data;
    //session.data.user.image = data?.image;

    //Upload Image To Cloudinary //cloudname: drp7utbgz - upload_preset:microsolution
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESET
    );
    let image_Public_ID = "";
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`,
        formData
      )
      .then((result) => {
        session.data.user.image = result.data.secure_url;
        image_Public_ID = result.data.public_id;
      });

    //console.log(data?.image)

    const response1 = await axios.put("/api/users", { user, image_Public_ID });
    //} catch (error) {
    //  console.log(error.response?.data);
    //}
    setUploading(false);
  };

  return (
    <div className="space-y-4 w-40">
      <label>
        <input
          type="file"
          hidden
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setSelectedImage(URL.createObjectURL(file));
              setSelectedFile(file);
              setUploading(false);
              setIsNotSelectFile(false);
            } else {
              setUploading(true);
              setIsNotSelectFile(true);
            }
          }}
        ></input>
        <div className="w-40 h-28 aspect-video rounded flex items-center justify-center border-2 border-dashed border-gray-400 cursor-pointer overflow-hidden">
          {selectedImage ? (
            <img src={selectedImage} alt="" className="object-cover" />
          ) : (
            <span>Select Image</span>
          )}
        </div>
      </label>

      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{ opacity: uploading ? ".5" : "1" }}
        dir="ltr"
        className="w-40 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        {/*uploading ? "Uploading.." : "Change"*/}
        {uploading && isNotSelectFile==false ? "Updating..." : "Change Photo"}
      </button>
    </div>
  );
};

export default UploadImage;
