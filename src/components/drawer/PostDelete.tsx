"use client";
import React from "react";
import Button from "../ui/Button";
import { deletePost } from "@/actions/postAction";

const PostDelete = ({ postid }: { postid: string }) => {
  const handleDelete = async () => {
    try {
      const isDelete = await confirm(
        "Are you sure you want to delete this post?"
      );
      if (!isDelete) return;
      await deletePost(postid);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      onClick={handleDelete}
      className="text-md !text-secondaryDark bg-transparent font-normal p-0 cursor-pointer hover:bg-transparent"
    >
      Delete
    </Button>
  );
};

export default PostDelete;
