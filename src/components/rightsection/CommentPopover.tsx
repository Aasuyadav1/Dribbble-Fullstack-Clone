'use client'
import React from "react";
import DevPopover from "../ui/Popover";
import clsx from "clsx";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useStore } from "@/store/useStore";
import { deleteComment } from "@/actions/commentAction";

const CommentPopover = ({commentid, postid, data} : {
    commentid: string;
    postid: string;
    data: any
}) => {
    const {setComments, setEmptyComments, comments} = useStore((state) => state);

    const handleEdit = async () => {
        setComments('id', commentid);
        setComments('content', data.content);
        setComments('postId', postid);
        setComments('userId', data.user._id);

        console.log(comments)
    }

    const handleDelete = async () => {
        try {
            await deleteComment({
                id: commentid,});
            setEmptyComments();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
      <DevPopover
        popButton={
          <button className="text-3xl bg-white rounded-full shadow-lg active:opacity-80">
            <HiOutlineDotsVertical className="text-xl cursor-pointer hover:text-secondaryDark/80" />
          </button>
        }
        place="bottom"
      >
        <div className="flex flex-col">
          {[{ text: "Edit", onClick: handleEdit }, { text: "Delete", onClick: handleDelete }].map((elem, index) => (
            <button
              className={clsx(
                "p-1 px-2 flex items-center gap-2 text-left bg-primary hover:bg-slate-300 w-full text-secondaryDark self-start rounded-lg",
                index === 1 && "hover:!bg-red-600/20 !text-red-600"
              )}
              onClick={elem.onClick}
              key={index}
            >
              <p>{elem.text}</p>
            </button>
          ))}
        </div>
      </DevPopover>
    </div>
  );
};

export default CommentPopover;
