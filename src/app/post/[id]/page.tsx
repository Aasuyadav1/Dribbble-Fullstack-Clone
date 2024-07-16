import React from "react";
import { getPostById } from "@/actions/postAction";
import SingleCardHeader from "@/components/drawer/DrawerHeader";
import DrawerContent from "@/components/drawer/DrawerContent";
import { incrementViews } from "@/actions/postAction";

const page = async  ({ params }: any) => {
  const post = await getPostById(params?.id);
  await incrementViews(params?.id);
  return (
    <div>
      <div className=" flex justify-center items-center flex-col ">
        <div className=" w-full h-full">
          <div className="w-full">
            <h1 className="text-3xl mt-14 max-w-[950px] w-full mx-auto font-semibold text-left">
              {post?.title}
            </h1>
            <SingleCardHeader postid={params?.id} data={post} />
            <DrawerContent postid={params?.id} data={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
