"use server";
import React from "react";
import { FaRegComment } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { auth } from "../../../auth";
import Link from "next/link";
import VaulDrawer from "../drawer/vdrawer";
import CommentForm from "./CommentForm";
import ReactWebShare from "../ReactWebShare";
import PostInfo from "../PostInfo";
import CommentDis from "./CommentDis";

const RightSection = async ({
  postid,
  data,
}: {
  postid: string;
  data: any;
}) => {
  const session:any = await auth();

  //   const data = await getPostById(postid);

  // const isLiked = data.likes.includes(session?.id) || false;

  // const isBookmarked = data.bookmarks.includes(session?.id) || false;
  return (
    <div className="flex flex-col gap-3 items-center ">
      {/* {session && (
        <>
          <LikeBtn
            isLiked={isLiked}
            like={data?.likes?.length || 0}
            _id={data?._id}
            showCount={false}
          />
          <BookmarkBtn isBookmarked={isBookmarked} _id={data._id} />
        </>
      )} */}
      <VaulDrawer
        openBtn={
          <div className="border opacity-80 border-zinc-400 cursor-pointer text-[40px] rounded-full h-fit w-fit p-2">
            <FaRegComment className="text-xl " />
          </div>
        }
        postid={data?._id}
        data={data}
        position="right"
      >
        <div className="py-4 px-4">
          <CommentForm postid={postid} />

          <CommentDis postid={postid} />
        </div>
      </VaulDrawer>
     
      <ReactWebShare id={postid} />

      <PostInfo postid={postid} data={data} />

      {session?.user?.id === data?.user?._id && (
        <Link
        href={`/uploads/new/${postid}`}
          className="mt-4 opacity-80 border border-zinc-400 cursor-pointer text-[40px] rounded-full h-fit w-fit p-2"
        >
          <FiEdit2 className="text-xl " />
        </Link>
      )}
    </div>
  );
};

export default RightSection;
