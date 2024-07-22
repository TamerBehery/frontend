import { PrismaClient } from "@prisma/client";
import { NextResponse} from "next/server";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DATABASE_URL}?connection_limit=40&pool_timeout=60`,
    },
  },
  log: [
    "warn",
    "error",
    {
      level: "query",
      emit: "event",
    },
  ],
});

export async function GET(request) {
  const posts = await prisma.post.findMany();
  //console.log(posts);
  return NextResponse.json({ data: posts }, { status: 200 });
}
