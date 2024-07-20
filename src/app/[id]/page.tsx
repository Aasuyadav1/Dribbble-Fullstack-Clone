import React from "react";
import Image from "next/image";
import { getUserById } from "@/actions/userAction";
import ProfileHead from "@/components/profile/ProfileHead";
import ProfileSectionHead from "@/components/profile/ProfileSectionHead";
import PostCard from "@/components/profile/PostCard";
import { getPostsByUser } from "@/actions/postAction";
import NotFound from "@/components/NotFound";

const page = async ({ params }: any) => {

  const user = await getUserById(params.id);
  if (!user) return null;
  const posts = await getPostsByUser(user._id);

  return (
    <div className="w-full h-full  mt-10 ">
      {posts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:gap-10 md:grid-cols-4">
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
