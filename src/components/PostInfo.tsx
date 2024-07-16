"use client";
import React, { useState } from "react";
import Modal from "./ui/Modal";
import { IoIosInformationCircleOutline } from "react-icons/io";

const PostInfo = ({ postid, data }: { postid: string; data: any }) => {
  const [open, isOpen] = useState(false);
  return (
    <div className="w-full">
      <Modal
      openBtn={
        <div className="opacity-80 border border-zinc-400 cursor-pointer text-[40px] rounded-full h-fit w-fit p-2">
          <IoIosInformationCircleOutline className="text-xl" />
        </div>
      }
      open={open}
      isOpen={isOpen}
    >
      <div className="w-full  px-6 py-4">
        <h1 className="text-2xl font-bold mt-4">Shorts Details</h1>
        <p className="text-sm mt-2 text-secondaryDark/70 font-medium ">published on {new Date(data.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}</p>
        <div className="flex mt-2 gap-6">
        <div className="p-3">
            <h1 className="text-lg font-semibold mt-4">Views</h1>
            <p className="text-sm">{data.views}</p>
          </div>
          <div className="p-3">
            <h1 className="text-lg font-semibold mt-4">Comments</h1>
            <p className="text-sm">{data.comments.length}</p>
          </div>
          <div className="p-3">
            <h1 className="text-lg font-semibold mt-4">Saves</h1>
            <p className="text-sm">{data.bookmarks.length}</p>
          </div>
          <div className="p-3">
            <h1 className="text-lg font-semibold mt-4">Like</h1>
            <p className="text-sm">{data.likes.length}</p>
          </div>
        </div>
        <div className="mt-2">
          <h1 className="text-md font-semibold ">Tags</h1>
          <div className="flex gap-2 flex-wrap mt-2 ">
          {
            data.tags.map((tag: string, i: number) => (
              <span className="border px-2 py-1 transition-colors hover:bg-slate-100 rounded-md text-secondaryDark/90">
              {tag}
            </span>
            ))
          }
            
          </div>
        </div>
      </div>
    </Modal>
    </div>
  );
};

export default PostInfo;
