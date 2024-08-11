import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  let { name, email, password, Membership_ID, Membership_No, National_ID } =
    body.data;

  //console.log(body);

  if (!name /*|| !email*/ || !password || !Membership_No || !National_ID) {
    return NextResponse.json(
      {
        message:
          "Missing name, email, or password or Membership_No or National_ID",
      },
      { status: 400 }
    );
  }

  /*
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
  */

  const exist = await prisma.user.findUnique({
    where: {
      Membership_No: Membership_No,
    },
  });

  if (exist) {
    return NextResponse.json(
      { message: "رقم العضوية مستخدم من قبل." },
      { status: 400 }
    );
  }

  const Membership = await prisma.CLB_Membership.findUnique({
    where: {
      Membership_No: Membership_No,
      National_ID: National_ID,
    },
  });

  if (!Membership) {
    return NextResponse.json(
      { message: "رقم العضوية غير موجود او الرقم القومى غير صحيح." },
      { status: 400 }
    );
  } else {
    Membership_ID = Membership.Membership_ID;
  }

  const hashedPassword = await bcrypt.hash(body.data.password, 10);
  //console.log(hashedPassword);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      image: "/static/avatar.png",
      Membership_ID,
      Membership_No,
      National_ID,
    },
  });

  try {
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(err.message);
  }
}

export async function PUT(request) {
  const body = await request.json();

  const { name, email, Membership_No, password, image } = body;

  const updateUser = await prisma.user.update({
    where: {
      Membership_No: Membership_No,
    },
    data: {
      image: image,
    },
  });

  return NextResponse.json(updateUser);
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions);

  const body = await request.json();

  const { oldPassword, password } = body.data;


  if (!oldPassword || !password) {
    return NextResponse.json(
      {
        message: "Missing oldPassword or password ",
      },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  const passwordMath = await bcrypt.compare(oldPassword, user.hashedPassword);

  if (!passwordMath) {
    return NextResponse.json(
      { message: "كلمة المرور القديمة غير صحيحة." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updateUser = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      hashedPassword,
    },
  });

  return NextResponse.json(updateUser);
}
