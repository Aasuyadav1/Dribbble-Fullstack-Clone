import React from "react";
import Image from "next/image";
import { getCommentsByPostId } from "@/actions/commentAction";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DevPopover from "../ui/Popover";
import clsx from "clsx";
import { getUser } from "@/actions/userAction";
import CommentPopover from "./CommentPopover";

const CommentDis = async ({ postid }: { postid: string }) => {
  const comments = await getCommentsByPostId(postid);

  const session = await getUser();

  return (
    <div className="w-full flex flex-col gap-4 mt-6">
      {comments.length > 0 ? (
        comments.map((comment: any, i: number) => (
          <div key={i} className="flex gap-4 items-start w-full">
            <div>
              <Image
                src={comment.user.image}
                className="rounded-full"
                alt="user"
                width={35}
                height={35}
              />
            </div>
            <div className="w-full">
              <div className="w-full flex justify-between items-center gap-1">
                <h1 className="text-sm font-semibold ">
                  {comment.user.username}
                </h1>

                {
                  session?.id === comment.user._id && (
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
