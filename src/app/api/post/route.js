export const dynamic = "force-dynamic";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  const posts = await prisma.post.findMany();
  //console.log(posts);
  return NextResponse.json({ data: posts }, { status: 200 });
}
