'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SelectCmp from './ui/Select'
import { IoFilterSharp } from "react-icons/io5";
import Button from "@/components/ui/Button";
import { useSelectStore } from "@/store/useSelect";


const Category = () => {
  const pathname = usePathname();
  // const [selectValue, setSelectValue] = useState<string>("All");
  const { selectValue, setSelectValue} = useSelectStore((state) => state);

  const category: string[] = ["All", "Coding", "UIUX", "Photography", "Design", "Portfolio"];
  const filter: string[] = ["Following", "Popular", "All"];

  return (
    <div className='w-full flex justify-between gap-3 items-center overflow-x-auto'>
      <div className='max-w-[150px] w-full h-full'> 
        <SelectCmp Options={filter} setSelectValue={setSelectValue} selectValue={selectValue} isLink={true} />
      </div>
      <div className='flex gap-3 justify-start items-center'>
        {
          category.map((item, index) => {
            const isActive = item === "All" ? pathname === '/' : pathname === `/category/${item}`;
            return (
              <Link 
                href={`/${item === "All" ? "" : `category/${item}`}`} 
                key={index} 
                className={`text-secondaryDark font-medium text-sm rounded-full cursor-pointer px-4 py-2 transition-all hover:bg-yellow-100/30 ${isActive ? "bg-yellow-100/30" : "bg-white"}`}
              >
                {item}
              </Link>
            );
          })
        }
      </div>
      <Button className="bg-transparent border-2 !text-black font-normal rounded-full flex gap-2 items-center hover:!bg-[#e5e5ea]">
        <IoFilterSharp/>
        Filter
      </Button>
    </div>
  );
}

export default Category;
