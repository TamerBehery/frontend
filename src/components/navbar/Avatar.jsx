
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";
import DropdownAvatar from "../DropdownAvatarServerSide";

const Avatar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {session ? (
        <div>
          <DropdownAvatar session = {session}/>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Avatar;
