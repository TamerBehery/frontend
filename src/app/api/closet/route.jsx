import { PrismaClient } from "@prisma/client";
import { NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  const Closets = await prisma.CLB_Closet.findMany();
  //console.log(Closets);
  return NextResponse.json({ data: Closets }, { status: 200 });
}
