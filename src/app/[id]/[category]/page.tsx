import React from "react";
import PostCard from "@/components/profile/PostCard";
import { getPostByUserCategory } from "@/actions/postAction";
import { getLikesPostByUser } from "@/actions/likeAction";
import { getBookmarkedPostByUser } from "@/actions/bookmarkAction";
import NotFound from "@/components/NotFoundData";

const page = async ({
  params,
}: {
  params: { category: string; id: string };
}) => {
  let posts = [];

  if (params.category === "like") {
    posts = await getLikesPostByUser(params.id);
  } else if (params.category === "bookmark") {
    posts = await getBookmarkedPostByUser(params.id);
  } else {
    posts = await getPostByUserCategory(params.id, params.category);
  }

  return (
    <div className="w-full mt-10 h-full ">
      {posts.length > 0 ? (
        <div className="sm:flex sm:flex-wrap gap-10 mt-8 items-center justify-start grid grid-cols-1">
          {posts.map((post: any, i: number) => (
            <PostCard key={i} data={post} />
          ))}
        </div>
      ) : (
        <NotFound heading="No Post Found" subHeading="It seems we can’t find any posts "/>
      )}
    </div>
  );
};

export default page;
