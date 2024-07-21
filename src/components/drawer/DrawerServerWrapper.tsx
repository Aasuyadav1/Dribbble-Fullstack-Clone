'use server'
import React from "react";
import DrawerContent from "./DrawerContent";
import SingleCardHeader from "./DrawerHeader";
import VaulDrawer from "./vdrawer";
const DrawerServerWrapper = async ({
  openBtn,
  postid,
  data,
}: {
  openBtn: React.ReactNode;
  postid: string;
  data: any;
}) => {
  return (
    <VaulDrawer openBtn={openBtn} postid={postid} data={data}>
     <div className="w-full ">
     <h1 className="text-3xl mt-14 max-w-[950px]  mx-auto font-semibold text-left px-2">{data?.title}</h1>
      <SingleCardHeader postid={postid} data={data} />
      <DrawerContent postid={postid} data={data} />
     </div>
    </VaulDrawer>
  );
};

export default DrawerServerWrapper;
