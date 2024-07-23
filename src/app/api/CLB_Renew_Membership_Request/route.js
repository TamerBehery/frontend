export const dynamic = "force-dynamic";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";

const prisma = new PrismaClient();

export async function GET(request, context) {
  const { params } = context;

  const session = await getServerSession(authOptions);

  const Requests = await prisma.CLB_Renew_Membership_Request.findMany({
    where: {
      //Membership_ID: parseInt(params.mempershipid),
      Membership_ID: parseInt(session?.user?.Membership_ID),
    },
  });

  //console.log(Requests);

  return NextResponse.json({ data: Requests }, { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  let {
    Membership_ID,
    Membership_No,
    Year,
    Members_Renew,
    Renew_DelayPenalty,
    CardPrint_Value,
    Fund_Value,
    Renew_Value,
    Remarks,
  } = body.data;

  //console.log(body);

  if (!Year || !Membership_ID || !Membership_No) {
    return NextResponse.json(
      {
        message: "Missing data is required",
      },
      { status: 400 }
    );
  }

  const exist = await prisma.CLB_Renew_Membership_Request.findMany({
    where: {
      Membership_ID: Membership_ID,
      Year: Year,
    },
  });

  if (exist.length > 0) {
    return NextResponse.json(
      { message: "تم تقديم طلب تجديد لنفس السنة مسبقا." },
      { status: 400 }
    );
  }

  const user = await prisma.CLB_Renew_Membership_Request.create({
    data: {
      Membership_ID,
      Membership_No,
      Year,
      Request_State: 0,
      Currency_ID: 1,
      Members_Renew,
      Renew_DelayPenalty,
      CardPrint_Value,
      Fund_Value,
      Renew_Value,
      Remarks,
    },
  });

  try {
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(err.message);
  }
}
