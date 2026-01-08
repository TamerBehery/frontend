import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, context) {
  const { params } = context;

  const Requests = await prisma.CLB_Membership.findMany({
    //where: {
    //  Membership_ID: parseInt(params.mempershipid),
    //},
  });

  //console.log(Requests);

  return NextResponse.json({ data: Requests }, { status: 200 });
}
