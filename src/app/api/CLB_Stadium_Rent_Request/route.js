import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";

const prisma = new PrismaClient();

export async function GET(request, context) {
  const { params } = context;

  const session = await getServerSession(authOptions);

  const Requests = await prisma.cLB_Stadium_Rent_Request.findMany({
    where: {
      //Membership_ID: parseInt(params.mempershipid),
      Membership_ID: parseInt(session?.user?.Membership_ID),
    },
  });

  //console.log(Requests);

  return NextResponse.json({ data: Requests }, { status: 200 });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);

  const body = await request.json();
  const { Stadium_ID, Start_Date, End_Date, Rent_Value, Remarks } = body.data;

  //console.log(body);

  if (!Start_Date || !Stadium_ID) {
    return NextResponse.json(
      {
        message: "Missing data is required",
      },
      { status: 400 }
    );
  }

  //   const exist = await prisma.cLB_Stadium_Rent_Request.findMany({
  //     where: {
  //       Stadium_ID: Stadium_ID,
  //       Year: Year,
  //     },
  //   });

  //   if (exist.length > 0) {
  //     return NextResponse.json(
  //       { message: "تم حجز الدولاب مسبقا اختار دولاب اخر." },
  //       { status: 400 }
  //     );
  //   }

  const user = await prisma.cLB_Stadium_Rent_Request.create({
    data: {
      Stadium_ID,
      Is_Member:true,
      Is_Not_Member:false,
      Membership_ID: parseInt(session?.user?.Membership_ID),
      Start_Date: new Date(Start_Date),
      End_Date: new Date(End_Date),
      Request_State: 0,
      Currency_ID: 1,
      Rent_Value,
      Remarks,
    },
  });

  try {
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(err.message);
  }
}
