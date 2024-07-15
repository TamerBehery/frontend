import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, context) {
  const { params } = context;

  const Requests = await prisma.cLB_Closet.findMany({
    where: {
      Closet_ID: parseInt(params.closetID),
      Year: params.year,
    },
  });

  //console.log(Requests);

  return NextResponse.json({ data: Requests }, { status: 200 });
}
