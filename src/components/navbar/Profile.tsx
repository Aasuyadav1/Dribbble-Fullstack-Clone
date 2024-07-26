'use client'
import React, {useState} from "react";
import Image from "next/image";
import ProfileDropdown from "./ProfileDropdown";
import { userSessionType } from "@/types/indexType";
import DevPopover from "../ui/Popover";

const Profile = ({session}: any) => {
  if(!session) return null
  return (
    <div className="relative">
   <DevPopover popButton={session.image ? (
        <Image
          src={session.image}
          alt="profile"
          width={45}
          height={45}
          className="rounded-full cursor-pointer"
        />
      ) : (
        <div className="h-[45px] w-[45px] text-2xl rounded-full text-white font-medium cursor-pointer bg-purple-500 grid place-content-center">
          {session.name?.charAt(0)}
        </div>
      )}>
   <ProfileDropdown session={session} />
   </DevPopover>
    </div>
  );
};

export default Profile;
