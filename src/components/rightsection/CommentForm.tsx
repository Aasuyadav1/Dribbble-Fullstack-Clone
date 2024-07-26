"use client";
import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import CommentDis from "./CommentDis";
import { createComment } from "@/actions/commentAction";
import { useStore } from "@/store/useStore";
import { updateComment } from "@/actions/commentAction";
import { toast } from "sonner";

const CommentForm = ({ postid }: { postid: string }) => {
  const { setComments, setEmptyComments, comments, setLoginModalOpen } = useStore(
    (state) => state
  );
  const [isUpdate, setIsUpdate] = useState(false);
  const [content, setContent] = useState(comments?.content || "");
  const [isLoading, setIsLoading] = useState(false);

  const uploadComment = async () => {
    if (isUpdate) return;
    setIsLoading(true);
    try {
       const res = await createComment({
        postId: postid,
        content: content,
      });
      if(res){
        setContent("");
      toast.success("Comment Added");
      } else {
        setLoginModalOpen(true);
      }
      setEmptyComments();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const updateComments = async () => {
    if (!isUpdate) return;
    setIsLoading(true);
    try {
      await updateComment({
        id: comments.id,
        postid: comments.postId,
        content: content,
      });
      toast.success("Comment Updated");
      setContent("");
      setEmptyComments();
      setIsUpdate(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEmptyComments();
    setIsUpdate(false);
    setContent("");
  }

  useEffect(() => {
    if(comments.id) {
      setIsUpdate(true);
      setContent(comments.content);
    } else {
      setIsUpdate(false);
      setContent("");
    }
  }, [comments]);

  return (
    <div>
      <div>
        <h1 className="text-xl font-semibold mt-4">Feedback</h1>
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mt-10 border border-zinc-400 p-2 rounded-lg"
          placeholder="Write a comment..."
        />
        <div className="flex items-center gap-4 mt-2">
        <Button
          disabled={isLoading}
          type="submit"
          onClick={isUpdate ? updateComments : uploadComment}
          className="  font-medium px-6 py-1 text-md"
        >
          {isUpdate ? "Update" : "Add Comment"}
        </Button>
        {
          comments?.id && (
            <Button className=" font-medium px-6 py-1 text-md  !text-secondaryDark hover:bg-slate-200 border border-secondaryDark bg-transparent" onClick={handleCancel}>
            Cancel
          </Button>
          )
        }
        </div>
      </div>
      {/* <div className="mt-10">
        <CommentDis postid={postid} />
      </div> */}
    </div>
  );
};

export default CommentForm;
