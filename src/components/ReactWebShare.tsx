'use client'
import React from "react";
import { RWebShare } from "react-web-share";
import { FiShare } from "react-icons/fi";


const ReactWebShare = ({id} : {id: string}) => {
  
  return (

      <RWebShare
        data={{
          text: "Like humans, flamingos make friends for life",
          url: `/post/${id}`,
          title: "Flamingos",
        }}
      >
         <div className="opacity-80 border border-zinc-400 cursor-pointer text-[40px] rounded-full h-fit w-fit p-2">
        <FiShare className="text-xl" />
      </div>
      </RWebShare>
  );
};

export default ReactWebShare;