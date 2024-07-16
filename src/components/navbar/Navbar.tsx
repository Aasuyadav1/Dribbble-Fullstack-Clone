import React from "react";
import Link from "next/link";
import Image from "next/image";
import NavSearch from "./NavSearch";
import Profile from "./Profile";
import Dribbble from '../../public/images/dribbble-logo.png'
import { getUser } from "@/actions/userAction";


const Navbar = async () => {
  const session = await getUser();
  return (
    <nav className="flex w-full px-12 py-6 bg-primary justify-between items-center p-4">
      <div>
        <Link href="/">
          <Image
            src={Dribbble}
            alt="Dribbble"
            width={100}
            height={100}
            quality={100}
          />
        </Link>
      </div>
      <div className="flex gap-10 items-center">
        <NavSearch />
       {
        session ?  <Profile  session={session}/> : null
       }
      </div>
    </nav>
  );
};

export default Navbar;
