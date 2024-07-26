import React from "react";
import Image from "next/image";
import { getCommentsByPostId } from "@/actions/commentAction";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DevPopover from "../ui/Popover";
import clsx from "clsx";
import { auth } from "../../../auth";
import CommentPopover from "./CommentPopover";
import Link from "next/link";

const CommentDis = async ({ postid }: { postid: string }) => {
  const comments = await getCommentsByPostId(postid);

  const session:any = await auth();

  return (
    <div className="w-full flex flex-col gap-4 mt-6">
      {comments.length > 0 ? (
        comments.map((comment: any, i: number) => (
          <div key={i} className="flex gap-4 w-full">
            <div>
            {comment.user.image ? (
            <Link className="cursor-pointer" href={`/${comment.user._id}`}>
              <Image
                src={comment.user.image}
                height={25}
                width={25}
                alt="dribbble"
                className="rounded-full cursor-pointer"
              />
            </Link>
          ) : (
            <Link className="cursor-pointer" href={`/${comment.user._id}`}>
              <div className="h-[25px] w-[25px] text-md rounded-full text-white font-medium cursor-pointer bg-purple-500 grid place-content-center">
                {comment?.user?.username?.charAt(0)}
              </div>
            </Link>
          )}
            </div>
            <div className="w-full">
              <div className="w-full flex justify-between items-center gap-1">
                <Link className="cursor-pointer " href={`/${comment.user._id}`}>
                <h1 className="text-sm font-semibold ">
                  {comment.user.username}
                </h1>
                </Link>

                {
                  session?.user?.id === comment.user._id && (
                    <CommentPopover commentid={comment._id} postid={postid} data={comment} />
                  )
                }
              </div>
              <p className="text-md font-medium  -mt-[1px] text-secondaryDark/90">
                {comment.content}
              </p>
              <span className="text-xs text-secondaryDark/80 font-medium">
                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div>No comments</div>
      )}
    </div>
  );
};

export default CommentDis;
