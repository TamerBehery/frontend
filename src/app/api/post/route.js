export const dynamic = "force-dynamic";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  const posts = await prisma.post.findMany(
    {
      orderBy: [
        {
          id: 'desc',
        }
      ]
    }
  );
  //console.log(posts);
  return NextResponse.json({ data: posts }, { status: 200 });
}

export async function POST(request) {

  const body = await request.json();
  const { Tittle, PostDate, Article, Image } = body.post;

  //console.log(body);

  if (!Tittle || !PostDate || !Article ) {
    return NextResponse.json(
      {
        message: "Missing data is required",
      },
      { status: 400 }
    );
  }

  // const exist = await prisma.cLB_Closet_Rent_Request.findMany({
  //   where: {
  //     Closet_ID: Closet_ID,
  //     Year: Year,
  //   },
  // });

  // if (exist.length > 0) {
  //   return NextResponse.json(
  //     { message: "تم حجز الدولاب مسبقا اختار دولاب اخر." },
  //     { status: 400 }
  //   );
  // }

  const post = await prisma.post.create({
    data: {
      Tittle,
      PostDate: new Date(PostDate),
      Article,
      Image,
    },
  });
  
  try {
    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json(err.message);
  }
}

