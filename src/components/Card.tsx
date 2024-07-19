'use server'
import React from "react";
import Image from "next/image";
import { PiEyeFill } from "react-icons/pi";
import LikeBtn from "./LikeBtn";
import { auth } from "../../auth";
import BookmarkBtn from "./BookmarkBtn";
import DrawerServerWrapper from "./drawer/DrawerServerWrapper";



const Card = async ({ data }: any) => {
  const session: any = await auth();


  const isLiked = data.likes.includes(session?.user?.id) || false;

  const isBookmarked = data.bookmarks.includes(session?.user?.id) || false;

  return (
    <div className="w-fit  ">
      <div className="w-full cursor-pointer p-0 con h-fit relative group overflow-hidden rounded-xl">
        <DrawerServerWrapper openBtn={
          <Image
          src={data.image[0]}
          className="rounded-md bg-slate-50 w-[282px] h-[211px] aspect-square object-fill"
          alt="dribbble"
          width={273}
          objectFit="fill"
          height={1000}
        />}
              
          postid={data._id} data={data} /> 
        
        <div className="w-full image-gr bottom-0 left-0  group-hover:absolute py-3 px-2 group-hover:flex hidden justify-between items-center overflow-hidden ">
          <h1 className=" font-medium text-primary">{data.title}</h1>
          <div className="flex gap-4">
            {/* <CiHeart className="text-secondaryDark p-2 bg-primaryDark text-4xl rounded-full shadow-md hover:text-secondary/90" /> */}
            <BookmarkBtn isBookmarked={isBookmarked} _id={data._id} />
          </div>
        </div>
      </div>
      <div className="mt-1 flex py-1 px-1 justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image
            src={data.user.image}
            height={25}
            width={25}
            alt="dribbble"
            className="rounded-full"
          />
          <h1 className="text-secondaryDark font-medium text-sm">
            {data.user.username}
          </h1>
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
