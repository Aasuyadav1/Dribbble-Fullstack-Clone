"use client";
import React, { useEffect, useState, useRef, useId } from "react";
import clsx from "clsx";
import { Tooltip as Select } from "react-tooltip";
import { createPortal } from "react-dom";
import { IoIosArrowDown } from "react-icons/io";

type SelectProps = {
  setSelectValue: React.Dispatch<React.SetStateAction<string>>;
  selectValue: string;
  Options: string[];
};

const SelectCmp = ({
  setSelectValue,
  selectValue,
  Options,
}: SelectProps) => {
  const [calcWidth, setCalcWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const randomId = useId();

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

  return (
    <>
      {mounted &&
        createPortal(
          <Select
            clickable={true}
            isOpen={mounted}
            id={randomId}
            place="bottom"
            style={{ backgroundColor: "transparent", padding: "0px", zIndex: 1000,  }}
            offset={2}
            opacity={1}
          >
            <div
              className="flex w-full text-secondary shadow-md flex-col gap-1 border border-zinc-400/50 bg-primaryDark rounded-md p-2 max-h-64 overflow-y-scroll [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
              style={{ width: calcWidth + "px" }}
              ref={selectRef}
            >
              {Options.map((elem, i) => (
                <label
                  className={clsx(
                    "hover:bg-zinc-400/50 text-left rounded-lg p-1 overflow-hidden w-full  px-2 cursor-pointer",
                    selectValue == elem && "bg-zinc-400"
                  )}
                  key={i}
                  htmlFor={elem}
                >
                  {elem}
                  <input
                    onChange={(e) => {
                      setSelectValue(e.target.value);
                      setMounted(false);
                    }}
                    type="radio"
                    id={elem}
                    name="select"
                    value={elem}
                    className="opacity-0"
                  />
                </label>
              ))}
            </div>
          </Select>,
          document.body
        )}
      <button
        onClick={() => setMounted(!mounted)}
        data-tooltip-id={randomId}
        className="w-full transition-all flex  items-center justify-between focus:border-zinc-400/50 border-zinc-400 bg-primaryDark py-1 border rounded-md px-2"
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
