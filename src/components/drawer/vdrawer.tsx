"use client";
import { Drawer } from "vaul";
import { IoCloseSharp } from "react-icons/io5";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";

interface DevDrawerProps {
  openBtn: React.ReactNode;
  children?: React.ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  postid?: string;
  data?: any;
}
export default function VaulDrawer({
  children = null,
  position = "bottom",
  openBtn = null,
  postid,
  data,
}: DevDrawerProps) {
  const { comments , setEmptyComments, setComments} = useStore((state) => state);
  const getPositionClasses = () => {
    switch (position) {
      case "left":
        return {
          content: `left-0 top-0 bottom-0 w-80 h-full border-r pr-10 rounded-r-xl`,
          handle: "-right-8 top-1/2 -translate-y-1/2 h-16 w-3 cursor-w-resize",
        };
      case "right":
        return {
          content: `right-0 top-0 bottom-0 max-w-[400px] w-full h-full border-l mt-10 rounded-l-xl`,
          handle: "-left-8 top-1/2 -translate-y-1/2 h-16 w-3 cursor-w-resize",
        };
      case "top":
        return {
          content: `top-0 left-0 right-0 h-80 w-full border-b pb-10 rounded-b-xl`,
          handle:
            "-bottom-8 left-1/2 -translate-x-1/2 w-16 h-3 cursor-n-resize",
        };
        case 'bottom': return { content: `bottom-0 left-0 right-0 h-[615px]  w-full rounded-t-xl `, handle: '-top-8 left-1/2 -translate-x-1/2 w-16  cursor-n-resize' };
      default:
        return { content: "", handle: "" };
    }
  };
  useEffect(() => {
      setEmptyComments();
  },[])
  return (
    <Drawer.Root  direction={position} setBackgroundColorOnScale={false} noBodyStyles={true} shouldScaleBackground>
      <Drawer.Trigger asChild>{openBtn}</Drawer.Trigger>
        <Drawer.Portal >
        <Drawer.Overlay className={`fixed inset-0 ${position === "right" ? 'bg-black/10' : 'bg-black/80'} outline-none z-40 `} />
        <Drawer.Content
          className={`z-40 bg-white ${
            getPositionClasses().content
          } fixed  outline-none`}
        >
          <Drawer.Trigger
            asChild
            className="absolute text-2xl text-primary cursor-pointer hover:text-primaryDark -top-8 right-2"
          >
            <IoCloseSharp />
          </Drawer.Trigger>

          <div className=" flex justify-center items-center flex-col scroll-smooth overflow-y-auto w-full no-scrollbar h-full">
            <div className=" w-full h-full">
            {children}
        
            </div>
        </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
