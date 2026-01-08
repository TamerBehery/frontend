import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";

const prisma = new PrismaClient();

export async function GET(request, context) {
  const { params } = context;

  const Requests = await prisma.CLB_Membership_Renew_Value.findMany({
    where: {
      Membership_No: params.MembershipNo,
    },
  });

  //console.log(Requests);

  return NextResponse.json({ data: Requests }, { status: 200 });
}
