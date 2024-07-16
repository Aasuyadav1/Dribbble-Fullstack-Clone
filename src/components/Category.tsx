import React from 'react'
import Link from 'next/link'


const Category = async () => {

    const category: string[] = ["Coding", "UIUX", "Photography", "Design", "Portfolio"]
    
  return (
    <div className='w-full flex gap-3 items-center'>
        {
            category.map((item, index) => (
            <Link href={`/category/${item}`} key={index} className={`text-secondaryDark font-medium text-sm rounded-full cursor-pointer px-4 py-2 transition-all hover:bg-yellow-100/30 `}>{item}</Link>
        ))
        }
    </div>
  )
}

export default Category