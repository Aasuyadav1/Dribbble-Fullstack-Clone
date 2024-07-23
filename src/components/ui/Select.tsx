"use client";
import React, { useEffect, useState, useRef, useId } from "react";
import clsx from "clsx";
import { Tooltip as Select } from "react-tooltip";
import { createPortal } from "react-dom";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";


type SelectProps = {
  setSelectValue: (value: string) => void;
  selectValue: string;
  Options: string[];
  isLink?: boolean;
};

const SelectCmp = ({
  setSelectValue,
  selectValue,
  Options,
  isLink = false,
}: SelectProps) => {
  const [calcWidth, setCalcWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const randomId = useId();
  const router = useRouter()

  useEffect(() => {
    if (buttonRef.current) {
      setCalcWidth(buttonRef.current.offsetWidth);
      // console.log(buttonRef.current.offsetWidth, "width");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMounted(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleRedirect = (Value: string) => {
    router.push(`/${Value === "All" ? "" : `shorts/${Value}`}`);
  }

  return (
    <>
      {mounted &&
        createPortal(
          <Select
            clickable={true}
            isOpen={mounted}
            id={randomId}
            place="bottom"
            style={{
              backgroundColor: "transparent",
              padding: "0px",
              zIndex: 1000,
            }}
            offset={2}
            opacity={1}
          >
            <div
              className="flex w-full text-secondary shadow-md flex-col gap-1 border border-zinc-400/50 bg-primary rounded-md p-2 max-h-64 overflow-y-scroll [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
              style={{ width: calcWidth + "px" }}
              ref={selectRef}
            >
              {Options.map((elem, i) => (
                // isLink ? (
                //   <Link href={`/${elem === "All" ? "" : `shorts/${elem}`}`} key={i}>
                //     <label
                //       className={clsx(
                //         "hover:bg-[#e5e5ea] text-left rounded-lg p-1 overflow-hidden w-full px-2 cursor-pointer",
                //         selectValue === elem && "bg-[#e5e5ea]"
                //       )}
                //       htmlFor={elem}
                //     >
                //       {elem}
                //       <input
                //         onChange={(e) => {
                //           setSelectValue(e.target.value);
                //           setMounted(false);
                //         }}
                //         type="radio"
                //         id={elem}
                //         name="select"
                //         value={elem}
                //         className="opacity-0"
                //       />
                //     </label>
                //   </Link>
                // ) : (
                  <label
                    className={clsx(
                      "hover:bg-[#e5e5ea] text-left rounded-lg p-1 overflow-hidden w-full px-2 cursor-pointer",
                      selectValue === elem && "bg-[#e5e5ea]"
                    )}
                    key={i}
                    htmlFor={elem}
                  >
                    {elem}
                    <input
                      onChange={(e) => {
                        setSelectValue(e.target.value);
                        if (isLink) handleRedirect(e.target.value);
                        setMounted(false);
                      }}
                      type="radio"
                      id={elem}
                      name="select"
                      value={elem}
                      className="opacity-0"
                    />
                  </label>
                // )
              ))}
            </div>
          </Select>,
          document.body
        )}
      <button
        onClick={() => setMounted(!mounted)}
        data-tooltip-id={randomId}
        className="w-full transition-all flex  items-center justify-between focus:bg-[#f2f2f7] border-zinc-400 bg-primary py-1 border rounded-md px-2"
        ref={buttonRef}
      >
        {selectValue}
        <IoIosArrowDown
          className={clsx(
            "text-lg transition-all text-zinc-500",
            mounted && "rotate-180"
          )}
        />
      </button>
    </>
  );
};

export default SelectCmp;
