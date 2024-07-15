import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, context) {
  const { params } = context;

  const Requests = await prisma.CLB_Stadium.findMany({
    where: {
      Stadium_ID: parseInt(params.stadiumid),
    },
  });

  //console.log(Requests);

  return NextResponse.json({ data: Requests }, { status: 200 });
}
