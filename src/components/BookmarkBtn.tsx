"use client";
import React from "react";
import { toggleBookmark } from "@/actions/bookmarkAction";
import { useOptimistic } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { useStore } from "@/store/useStore";

interface LikeBtnType {
  isBookmarked: boolean;
  _id: string;
}

const BookmarkBtn = ({ isBookmarked, _id }: LikeBtnType) => {
  const {setLoginModalOpen} = useStore((state) => state);
  const [optimisticState, setOptimisticState] = useOptimistic(
    { isBookmarked },
    (optimisticState, newLikeState) => ({
      isBookmarked: !optimisticState.isBookmarked,
    })
  );


  const handleToggleBookMark = async () => {
    setOptimisticState("");
    try {
      const res = await toggleBookmark({ post: _id });
      if(!res){
        setLoginModalOpen(true);
      }
    } catch (error) {
      setOptimisticState("");
      console.error("Error toggling Bookmark:", error);
    }
  };

  return (
    <div
      onClick={handleToggleBookMark}
      className="w-fit h-fit rounded-full"
    >
     {
       optimisticState.isBookmarked ? (
        <IoBookmark className="text-secondaryDark p-2 bg-primary text-4xl rounded-full shadow-md " />
        ) : (
        <IoBookmarkOutline className="text-secondaryDark p-2 bg-primary text-4xl rounded-full shadow-md " />
       )
     }
    </div>
  );
};

export default BookmarkBtn;
