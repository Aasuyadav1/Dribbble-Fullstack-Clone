import React from "react";
import Link from "next/link";
import Image from "next/image";
import NavSearch from "./NavSearch";
import Profile from "./Profile";
import Dribbble from "../../../public/images/dribbble-logo.png"
import { auth } from "../../../auth";


const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex gap-2 w-full px-2 py-2 sm:px-12 sm:py-6 bg-primary justify-between items-center p-4">
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
        session ?  <Profile  session={session.user}/> : null
       }
      </div>
    </nav>
  );
};

export default Navbar;
