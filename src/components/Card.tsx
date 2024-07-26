"use server";
import React from "react";
import Image from "next/image";
import { PiEyeFill } from "react-icons/pi";
import LikeBtn from "./LikeBtn";
import { auth } from "../../auth";
import BookmarkBtn from "./BookmarkBtn";
import DrawerServerWrapper from "./drawer/DrawerServerWrapper";
import Link from "next/link";

const Card = async ({ data }: any) => {
  const session: any = await auth();

  const isLiked = data.likes.includes(session?.user?.id) || false;

  const isBookmarked = data.bookmarks.includes(session?.user?.id) || false;

  return (
    <div className="w-full ">
      <div className="w-full cursor-pointer p-0 con h-fit relative group overflow-hidden rounded-xl">
        <DrawerServerWrapper
          openBtn={
            <Image
              src={data.image[0]}
              className="rounded-md bg-slate-50 w-full h-full md:w-[282px] md:h-[211px] aspect-[1/0] object-fill"
              alt="dribbble"
              width={273}
              height={1000}
            />
          }
          postid={data._id}
          data={data}
        />

        <div className="w-full image-gr bottom-0 left-0  group-hover:absolute py-3 px-2 group-hover:flex hidden justify-between items-center overflow-hidden ">
          <h1 className=" font-medium text-primary">{data.title}</h1>
          <div className="flex gap-4">
            {/* <CiHeart className="text-secondaryDark p-2 bg-primaryDark text-4xl rounded-full shadow-md hover:text-secondary/90" /> */}
            <BookmarkBtn isBookmarked={isBookmarked} _id={data._id} />
          </div>
        </div>
      </div>
      <div className="smmt-1 flex py-1 px-1 justify-between items-center">
        <div className="flex gap-2 items-center">
          {data.user.image ? (
            <Link className="cursor-pointer" href={`/${data.user._id}`}>
              <Image
                src={data.user.image}
                height={25}
                width={25}
                alt="dribbble"
                className="rounded-full cursor-pointer"
              />
            </Link>
          ) : (
            <Link className="cursor-pointer" href={`/${data.user._id}`}>
              <div className="h-[25px] w-[25px] text-md rounded-full text-white font-medium cursor-pointer bg-purple-500 grid place-content-center">
                {data?.user?.username?.charAt(0)}
              </div>
            </Link>
          )}
          <Link className="cursor-pointer" href={`/${data.user._id}`}>
            <h1 className="text-secondaryDark font-medium text-sm">
              {data.user.username}
            </h1>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          {/* <div className='flex gap-1 items-center'>
                <GoHeartFill className='text-secondary/50 text-xl' />
                <h1 className='text-secondaryDark/50 font-medium text-xs'>{data?.likes?.length || 0}</h1>
                </div> */}
          <LikeBtn
            isLiked={isLiked}
            like={data?.likes?.length || 0}
            _id={data?._id}
          />
          <div className="flex gap-1 items-center">
            <PiEyeFill className="text-secondary/50 text-xl " />
            <h1 className="text-secondaryDark/50 font-medium text-xs">
              {data?.views || 0}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
