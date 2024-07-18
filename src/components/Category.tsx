'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Category = () => {
  const pathname = usePathname();

  const category: string[] = ["All", "Coding", "UIUX", "Photography", "Design", "Portfolio"]

  return (
    <div className='w-full flex gap-3 items-center'>
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
  )
}

export default Category
