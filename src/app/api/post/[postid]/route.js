import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import axios from "axios";
import { unlink } from "node:fs/promises";
import path from "path";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

export async function GET(request, context) {
  const { params } = context;

  const Requests = await prisma.Post.findMany({
    where: {
      id: params.postid,
    },
    include: {
      Post_Media: true, // All images where postId == 20
    },
  });

  //console.log(Requests);

  return NextResponse.json({ data: Requests }, { status: 200 });
}

export async function DELETE(request, context) {
  const { params } = context;

  const Deleted = await prisma.Post.findMany({
    where: {
      id: params.postid,
    },
    include: {
      Post_Media: true, // All images where postId == 20
    },
  });

  //delete file
  //const path1 = `./public${Deleted[0].Image}`;
  //console.log(Deleted[0].Image);
  //await unlink(path1);

  //const public_id = Deleted[0].Image.replace(
  //  "https://res.cloudinary.com/drp7utbgz/image/upload/",
  //  ""
  //);

  //console.log(public_id);
  try {
    const result = await cloudinary.v2.uploader.destroy(
      Deleted[0].image_Public_ID,
      {
        invalidate: true,
        resource_type: "image",
      }
    );

    Deleted[0].Post_Media.map(async (i) => {
      const result = await cloudinary.v2.uploader.destroy(
        i.image_Public_ID,
        {
          invalidate: true,
          resource_type: "image",
        }
      );
    });
  } catch {}

  await prisma.Post_Media.deleteMany({
    where: {
      Postid: params.postid,
    },
  });

  const Requests = await prisma.Post.deleteMany({
    where: {
      id: params.postid,
    },
  });

  //console.log(Requests);

  return NextResponse.json({ data: Requests }, { status: 200 });
}
