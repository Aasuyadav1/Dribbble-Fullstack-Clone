'use server'
import React from "react";
import Image from "next/image";
import { getUser } from "@/actions/userAction";
import BookmarkBtn from "../BookmarkBtn";
import LikeBtn from "../LikeBtn";
import FollowBtn from "../FollowBtn";

const SingleCardHeader = async ({
  postid,
  data,
}: {
  postid: string;
  data: any;
}) => {
  const session = await getUser();

  const isLiked = data.likes.includes(session?.id) || false;

  const isBookmarked = data.bookmarks.includes(session?.id) || false;

  const isFollowed = data?.user?.followers?.includes(session?.id) || false;

  console.log("ise followed", isFollowed);

  return (
    <div className=" !w-full sticky -top-[1px] left-0 z-10 h-fit rounded-t-xl  bg-white py-3 ">
      <div className="flex justify-between items-center max-w-[950px] w-full mx-auto">
      <div className="flex gap-2 items-center">
        <Image
          src={data?.user?.image}
          height={25}
          width={25}
          alt="dribbble"
          className="rounded-full"
        />
        <h1 className="font-medium text-sm text-secondaryDark">
          {data?.user?.username}
        </h1>
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
          {session?.id !== data?.user?._id ? (
            <FollowBtn isFollowed={isFollowed} _id={data?.user?._id} />
          ) : null}
        </div>
      </div>
      </div>
    </div>
  );
};

export default SingleCardHeader;
