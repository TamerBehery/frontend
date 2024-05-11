import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import next from "next";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body.data;
  //console.log(body);

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Missing name, email, or password" },
      { status: 400 }
    );
  }

  const exist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exist) {
    return NextResponse.json(
      { message: "البريد الالكترونى مستخدم من قبل." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(body.data.password, 10);
  //console.log(hashedPassword);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      image: "/static/avatar.png",
    },
  });

  return NextResponse.json(user);
}

export async function PUT(request) {
  const body = await request.json();

  const { name, email, password, image } = body;

  const updateUser = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      image: image,
    },
  });

  return NextResponse.json(updateUser);
}
