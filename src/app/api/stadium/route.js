import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  const Stadiums = await prisma.cLB_Stadium.findMany();
  //console.log(Closets);
  return NextResponse.json({ data: Stadiums }, { status: 200 });
}
