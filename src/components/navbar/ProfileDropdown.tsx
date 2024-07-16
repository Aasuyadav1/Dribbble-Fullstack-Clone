import React, { useState, useEffect } from "react";
import Image from "next/image";
import { userSessionType } from "@/types/indexType";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface Props {
  session: userSessionType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileDropdown = ({ session, open, setOpen }: Props) => {
  if(!session) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: open ? 1 : 0, y: open ? 0 : -20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`w-[320px] px-3 py-6 bg-primary rounded-xl shadow-md border border-zinc-300 z-[9999] ${
        open ? "block" : "hidden"
      } absolute right-0 top-[60px]`}
    >
      <div className="w-full flex justify-center items-center flex-col">
        {
          session?.image ? (<Image
            src={session?.image}
            width={100}
            height={100}
            className="rounded-full"
            alt="profile"
          />) : (
            <div className="h-[100px] w-[100px] text-6xl rounded-full text-white font-medium cursor-pointer bg-purple-500 grid place-content-center">
          {session.name?.charAt(0)}
        </div>
          )
        }
        <h1 className="text-md font-semibold mt-2">{session?.name}</h1>
      </div>
      <ul className="list-none px-10 mt-8 flex flex-col gap-2  ">
        <Link href={`/${session?.id}`} onClick={() => setOpen(false)} className="cursor-pointer text-md text-zinc-900 transition-all font-medium hover:text-zinc-500">
          Visit Profile
        </Link>
        <Link href={"/uploads/new"} className="cursor-pointer text-md text-zinc-900 transition-all font-medium hover:text-zinc-500">
          Upload design work
        </Link>
        <li
          onClick={() => signOut()}
          className="cursor-pointer text-md text-zinc-900 transition-all font-medium hover:text-zinc-500 mt-6"
        >
          Log out
        </li>
      </ul>
    </motion.div>
  );
};

export default ProfileDropdown;
