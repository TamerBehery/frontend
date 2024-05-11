import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";
import Image from "next/image";

const NextAuthServerSide = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {session ? (
        <div>
          <h1>{session?.user?.name}</h1>
          <Image
            src={session?.user?.image}
            alt="image"
            width={50}
            height={50}
          />
          <h1>{session?.user?.email}</h1>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NextAuthServerSide;
