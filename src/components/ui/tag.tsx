'use client';
import React, { KeyboardEvent } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

type TagsInputProps = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tagLength?: number;
  textLength?: number;
  trigger?: 'Enter' | 'Comma' | 'ArrowRight' | 'Space';
};

const DevChipInput = ({ tags, setTags, trigger = "Enter", tagLength = 14, textLength = 20 }: TagsInputProps) => {
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== trigger) return;
    const inputValue = e.currentTarget.value.trim();
    if (!inputValue || tags.includes(inputValue)) return alert("Tag already exists");
    if (inputValue.length > textLength) return alert(`Tag must be less than ${textLength} characters`);

    setTags((prev) => [...prev, inputValue]);
    e.currentTarget.value = "";
  };

  const handleDelete = (value: string) => {
    setTags((prev) => prev.filter((tag) => tag !== value));
  };

  return (
    <div className="w-full relative bg-transparent mt-4  rounded-full border border-zinc-500 flex flex-wrap gap-2 p-3 ">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex select-none text-base w-fit gap-2 px-3 pr-1 rounded-full text-black border-2 items-center bg-primaryDark/30"
        >
          {tag}
          <RiCloseCircleFill
            onClick={() => handleDelete(tag)}
            className="text-xl hover:opacity-80 cursor-pointer"
          />
        </span>
      ))}
      {tags.length < tagLength && (
        <input
          type="text"
          onKeyDown={handleEnter}
          placeholder="enter tag"
          className="px-1 rounded-full bg-transparent outline-none w-28 border-none"
        />
      )}
      <button role="clear-btn" className="absolute right-2 top-1 text-lg text-black/50 hover:text-black/60" onClick={() => setTags([])}>🗙</button>
    </div>
  );
};

export default DevChipInput;
