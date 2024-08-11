import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { unlink } from "node:fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function GET(request, context) {
  const { params } = context;

  const Requests = await prisma.Post.findMany({
    where: {
      id: params.postid,
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
  });

  //delete file
  const path1 = `./public${Deleted[0].Image}`;
  console.log(Deleted[0].Image);
  await unlink(path1);

  const Requests = await prisma.Post.deleteMany({
    where: {
      id: params.postid,
    },
  });

  //console.log(Requests);

  return NextResponse.json({ data: Requests }, { status: 200 });
}
