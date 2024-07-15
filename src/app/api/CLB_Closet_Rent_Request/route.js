import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";

const prisma = new PrismaClient();

export async function GET(request, context) {
  const { params } = context;

  const session = await getServerSession(authOptions);

  const Requests = await prisma.cLB_Closet_Rent_Request.findMany({
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
  const { Closet_ID, Year, Rent_Value, Remarks } = body.data;

  //console.log(body);

  if (!Year || !Closet_ID) {
    return NextResponse.json(
      {
        message: "Missing data is required",
      },
      { status: 400 }
    );
  }

  const exist = await prisma.cLB_Closet_Rent_Request.findMany({
    where: {
      Closet_ID: Closet_ID,
      Year: Year,
    },
  });

  if (exist.length > 0) {
    return NextResponse.json(
      { message: "تم حجز الدولاب مسبقا اختار دولاب اخر." },
      { status: 400 }
    );
  }

  const user = await prisma.cLB_Closet_Rent_Request.create({
    data: {
      Closet_ID,
      Membership_ID: parseInt(session?.user?.Membership_ID),
      Year,
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
