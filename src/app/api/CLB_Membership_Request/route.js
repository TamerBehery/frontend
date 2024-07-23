export const dynamic = "force-dynamic";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  const {
    Membership_Name,
    Birth_Date,
    Qualification,
    Job,
    Home_Adress,
    Home_Tel,
    Work_Adress,
    Work_Tel,
    Marital_Status,
    Wife_Name,
    Wife_Birth_Date,
    Wife_Job,
    Other_Membership,
  } = body.data;

  //console.log(body);

  if (!Membership_Name || !Home_Tel) {
    return NextResponse.json(
      {
        message: "Missing data is required",
      },
      { status: 400 }
    );
  }

  const exist = await prisma.CLB_Membership_Request.findMany({
    where: {
      Home_Tel: Home_Tel,
    },
  });
  console.log(exist.length);

  if (exist.length > 0) {
    return NextResponse.json(
      { message: "تم تقديم طلب لنفس رقم التليفون مسبقا مسبقا." },
      { status: 400 }
    );
  }

  const user = await prisma.CLB_Membership_Request.create({
    data: {
      Membership_Name,
      Birth_Date: Birth_Date !== "" ? new Date(Birth_Date) : null,
      Qualification,
      Job,
      Home_Adress,
      Home_Tel,
      Work_Adress,
      Work_Tel,
      Marital_Status,
      Wife_Name,
      Wife_Birth_Date:
        Wife_Birth_Date !== "" ? new Date(Wife_Birth_Date) : null,
      Wife_Job,
      Other_Membership,
    },
  });

  try {
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(err.message);
  }
}
