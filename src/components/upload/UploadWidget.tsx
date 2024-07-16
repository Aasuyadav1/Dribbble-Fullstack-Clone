"use client";
import React, { useEffect, useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useStore } from "@/store/useStore";
import { getPostById } from "@/actions/postAction";


const UploadWidget = ({ updateId, postData }: { updateId?: string, postData?: any }) => {
  const { title, image, setTitle, setImage } = useStore( (state) => state);
  const [data, setData] = useState(null)

  const handleSuccessWidget = (result: any) => {
    if (result.event === "success") {
      setImage({
        publicId: result.info.public_id,
        imageUrl: result.info.secure_url,
      });
    }

  };

  

  useEffect(()=>{
    if(updateId && postData){
      setTitle(postData.title)
      setImage({
        publicId: '',
        imageUrl: postData.image[0]
      })
    }
  },[updateId])

  return (
    <div className="w-full px-40 py-10">
      <div className="mb-6 flex gap-6">
        <div className="bg-secondaryDark text-primary grid place-content-center h-fit px-4 py-3 rounded-md max-w-[200px] w-full relative -z-10 select-none">
          Start by giving short name
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-4 h-4 bg-secondaryDark rotate-45"></span>
        </div>
        <input
          type="text"
          className="w-full text-4xl text-secondaryDark outline-none"
          placeholder="Give me a name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <CldUploadWidget
        uploadPreset="jsm_dribbbleclone"
        options={{ multiple: false, resourceType: "image" }}
        onSuccess={handleSuccessWidget}
        onError={(err) => console.log(err)}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className="w-full h-[600px] rounded-lg border-2 overflow-hidden border-dashed border-slate-400 flex items-center justify-center"
            >
              {!image.imageUrl && (
                <label
                  htmlFor="file"
                  className="cursor-pointer text-center p-4 md:p-8"
                >
                  <svg
                    className="w-10 h-10 mx-auto"
                    viewBox="0 0 41 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667"
                      stroke="#4F46E5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-3 text-gray-700 max-w-xs mx-auto">
                    Click to{" "}
                    <span className="font-medium text-indigo-600">
                      Upload your file
                    </span>{" "}
                    or drag and drop your file here
                  </p>
                </label>
              )}
              {image.imageUrl && (
                <CldImage
                  src={image.imageUrl}
                  alt="Uploaded Image"
                  className="rounded-lg"
                  width="1000"
                  height="1000"
                />
              )}
              <input id="file" type="file" className="hidden" />
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadWidget;
