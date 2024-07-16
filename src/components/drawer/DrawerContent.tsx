import React from "react";
import Image from "next/image";
import { getPostsByUser } from "@/actions/postAction";
import PostCard from "../profile/PostCard";
import { getPostsByCategory } from "@/actions/postAction";
import RightSection from "../rightsection/RightSection";
import { incrementViews } from "@/actions/postAction";
import Link from "next/link";
import Button from "../ui/Button";
import PostDelete from "./PostDelete";
import { auth } from "../../../auth";

const DrawerContent = async ({
  postid,
  data,
}: {
  postid: string;
  data: any;
}) => {
  const userPosts = await getPostsByUser(data?.user?._id);

  const filteredPosts = await userPosts?.filter(
    (post: any) => post?._id !== postid
  );

  const session:any = await auth();

  const relatedPosts = await getPostsByCategory(data?.category);

  const filteredRelatedPosts = await relatedPosts?.filter(
    (post: any) => post?._id !== postid
  );

  const view = await incrementViews(postid);

  return (
    <div className="max-w-[950px] w-full mx-auto  mt-10 pb-10">
     <div className="flex items-center relative">
     <Image
        src={data?.image[0]}
        quality={100}
        className="w-full h-fit rounded-md mt-4"
        width={100}
        height={100}
        objectFit="contain"
        layout="responsive"
        alt="dribbble"
        priority={true}
      />
      <div className="absolute top-24 -right-44" >
      <RightSection postid={postid} data={data} />
      </div>
     </div>
      <h2 className="text-center font-medium  text-secondary mt-4">
        {data?.description}
      </h2>
     {
        session?.user?.id === data?.user?._id && (
          <div className="w-full mt-24 flex justify-center items-center">
          <div className="flex gap-8 bg-[#f5f5fd] px-4 py-3 rounded-md">
         <Link href={`/uploads/new/${postid}`}>
         <Button className="text-md !text-secondaryDark bg-transparent font-normal p-0 cursor-pointer hover:bg-transparent">Edit</Button>
         </Link>
         <PostDelete postid={postid} />
          </div>
        </div>
        )
     }
      {filteredPosts?.length > 0 && (
        <div className="mt-14">
          <h1 className="text-left font-semibold text-xl">
            More by ( {data?.user?.username} )
          </h1>
          <div className="w-full flex flex-wrap gap-4 mt-8 items-center justify-start ">
            {filteredPosts?.map((post: any) => (
              <PostCard
                key={post?._id}
                // postid={post?._id}
                data={post}
                isFotter={false}
              />
            ))}
          </div>
        </div>
      )}
      {filteredRelatedPosts?.length > 0 && (
        <div className="mt-14">
          <h1 className="text-left font-semibold text-xl">
            Related to ( {data?.category} )
          </h1>
          <div className="w-full flex flex-wrap gap-4 mt-8 items-center justify-start ">
            {filteredRelatedPosts?.map((post: any) => (
              <PostCard
                key={post?._id}
                // postid={post?._id}
                data={post}
                isFotter={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawerContent;
