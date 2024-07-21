"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import SelectCmp from "../ui/Select";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { useStore } from '@/store/useStore';
import { createPost, getPostById, updatePost } from "@/actions/postAction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ContinueModel = ({ updateId, postData }: { updateId?: string, postData?: any }) => {
  const router = useRouter();
  const { image, title, setTitle, setImage } = useStore((state) => state);
  const [selectValue, setSelectValue] = useState(postData?.category || "Random category");
  const [loading, setLoading] = useState(false);
  const [postD, setPostD] = useState(postData);
  const [data, setData] = useState({
    title: title,
    image: image.imageUrl,
    category: selectValue,
    description: postData?.description || "",
    tags: postData?.tags || ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isUpdate, setIsUpdate] = useState(!!updateId);

  const Options = ["Coding", "UI/UX", "Photography", "Design", "Portfolio"];


  const mainVariants: any = {
    open: { visibility: "visible", opacity: 1 },
    close: {
      opacity: 0,
      transitionEnd: {
        visibility: "hidden",
      },
    },
  };
  const sectionVariants = {
    open: { scale: 1 },
    close: { scale: 0.95 },
  };

  const emptyData = () => {
    setData({
      title: "",
      image: "",
      category: "Random category",
      description: "",
      tags: ''
    });
    setSelectValue("Random category");
    setTitle("");
    setImage({
      publicId: "",
      imageUrl: "",
    });
  }

  const handleForm = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handlePublish = async () => {
    if (isUpdate) return;
    if(!data.title || !data.image || !data.category || !data.description || !data.tags) return toast.error("Please fill all the fields");
    try {
      setLoading(true);
      const uploadedData = await createPost({
        title: data.title,
        image: data.image,
        description: data.description,
        category: data.category,
        tags: data.tags
      });

      if (uploadedData) {
        toast.success("Post created successfully");
        router.push(`/${uploadedData?.user}`);
        setIsOpen(false);
        emptyData();
        setLoading(false);
      }

    } catch (error) {
      console.log("error while upload post", error)
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const handleUpdate = async () => {
    if (!isUpdate) return;
    if(!data.title || !data.image || !data.category || !data.description || !data.tags) return toast.error("Please fill all the fields");
    try {
      setLoading(true);
      const postUpd = await updatePost({
        title: data.title,
        image: data.image,
        description: data.description,
        category: data.category,
        tags: data.tags,
        id: updateId
      });

      if (postUpd) {
        toast.success("Post updated successfully");
        router.push(`/${postUpd?.user}`);
        setIsOpen(false);
        setIsUpdate(false);
        setLoading(false);
        emptyData();
      }

    } catch (error) {
      console.log("error while update post", error)
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setData((prevData) => ({ ...prevData, category: selectValue }));
  }, [selectValue]);

  useEffect(() => {
    setData((prevData) => ({ ...prevData, title: title, image: image.imageUrl }));
  }, [image, title]);

  useEffect(() => {
    if (updateId && postData) {
      setIsUpdate(true);
      setData({
        title: postData.title || title,
        image: postData.image || image.imageUrl,
        category: postData.category || "Random category",
        description: postData.description || "",
        tags: postData.tags || ''
      });
      setSelectValue(postData.category || "Random category");
    } else {
      setIsUpdate(false);
      emptyData();
    }
  }, [updateId, postData]);

  return (
    <>
      <div className="w-fit" onClick={() => {
        setIsOpen(true);
      }}>
        <Button disabled={!image.imageUrl || !title} className={`px-6 py-2 bg-secondaryDark border border-zinc-800 rounded-full text-primary font-semibold ${!image.imageUrl || !title ? 'cursor-not-allowed' : 'cursor-default'}`}>
          Continue
        </Button>
      </div>

      {mounted && 
          <motion.main
            animate={isOpen ? "open" : "close"}
            variants={mainVariants}
            transition={{ duration: 0.2 }}
            initial={{ visibility: "hidden", opacity: 0 }}
            className="bg-black/50 z-50 fixed inset-0 h-screen w-screen grid place-content-center overflow-hidden"
          >
            <motion.section
              animate={isOpen ? "open" : "close"}
              variants={sectionVariants}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="py-4 px-10 rounded-xl max-w-[800px] w-full border-2 shadow-md bg-primary"
            >
              <h1 className="text-xl font-semibold mt-10">Final Touches</h1>
              <div className="sm:grid sm:grid-cols-2 flex flex-col gap-10 mt-10">
                <div className="w-full">
                  <h1 className="text-secondaryDark font-semibold text-sm">
                    Thumbnail preview
                  </h1>
                  <Image
                    src={image.imageUrl}
                    width={400}
                    height={150}
                    className="rounded-md mt-4"
                    alt="Selected image for upload"
                  />
                </div>
                <div className="w-full flex flex-col gap-4">
                  <h1 className="text-secondaryDark font-medium text-md">
                    {title}
                  </h1>
                  <div className="mt-3">
                    <h1 className="text-secondaryDark font-semibold text-sm">
                      Tags <span>(Maximum 20)</span>
                    </h1>
                    <input
                      type="text"
                      placeholder="Add tags"
                      className="w-full border border-zinc-500 px-4 py-2 rounded-full mt-4"
                      name="tags"
                      value={postData?.tags}
                      onChange={handleForm}
                    />
                  </div>
                  <div>
                    <h1 className="text-secondaryDark font-semibold text-sm">
                      Descriptions <span>(Maximum 20)</span>
                    </h1>
                    <input
                      type="text"
                      placeholder="Add descriptions"
                      className="w-full border border-zinc-500 px-4 py-2 rounded-full mt-4"
                      name="description"
                      value={postData?.description}
                      onChange={handleForm}
                    />
                  </div>
                  <div className="w-full">
                    <h1 className="text-secondaryDark font-semibold text-sm mb-4">
                      Select category
                    </h1>
                    <SelectCmp
                      setSelectValue={setSelectValue}
                      selectValue={selectValue}
                      Options={Options}
                    />
                  </div>
                  <div className="flex mt-8 justify-between gap-2 items-center">
                    <Button
                      onClick={() => {
                        setIsOpen(false)
                      }}
                      className="px-4 py-2 bg-transparent border border-zinc-800 rounded-full font-semibold !text-secondaryDark hover:bg-slate-100"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={isUpdate ? handleUpdate : handlePublish}
                      disabled={loading}
                      className={`bg-secondaryDark text-primary px-4 py-2 rounded-full w-full font-semibold`}
                    >
                      {isUpdate ? "Update" : "Publish Now"}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.main>
        }
    </>
  );
};

export default ContinueModel;
