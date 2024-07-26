"use server";
import React from "react";
import Image from "next/image";
import { auth } from "../../../auth";
import BookmarkBtn from "../BookmarkBtn";
import LikeBtn from "../LikeBtn";
import FollowBtn from "../FollowBtn";
import Link from "next/link";

const SingleCardHeader = async ({
  postid,
  data,
}: {
  postid: string;
  data: any;
}) => {
  const session: any = await auth();

  const isLiked = data.likes.includes(session?.user?.id) || false;

  const isBookmarked = data.bookmarks.includes(session?.user?.id) || false;

  const isFollowed =
    data?.user?.followers?.includes(session?.user?.id) || false;

  console.log("ise followed", isFollowed);

  return (
    <div className="px-2 !w-full sticky -top-[1px] left-0 z-10 h-fit rounded-t-xl  bg-white py-3 ">
      <div className="flex justify-between items-center max-w-[950px] w-full mx-auto">
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
            <h1 className="font-medium text-sm text-secondaryDark">
              {data?.user?.username}
            </h1>
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-4">
            <div className="opacity-80 border border-zinc-400 cursor-pointer text-[40px] rounded-full h-fit w-fit p-2">
              <LikeBtn
                isLiked={isLiked}
                like={data?.likes?.length || 0}
                _id={data?._id}
                showCount={false}
              />
            </div>
            <div className="opacity-80 border border-zinc-400 cursor-pointer text-[40px] rounded-full h-fit w-fit">
              <BookmarkBtn isBookmarked={isBookmarked} _id={data._id} />
            </div>
            {session?.user?.id !== data?.user?._id ? (
              <FollowBtn isFollowed={isFollowed} _id={data?.user?._id} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCardHeader;
