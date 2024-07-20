'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ProfileSectionHead = ({ params }: { params: string }) => {
  const pathname = usePathname()
  const SectionCate = [
    {
      name: "Works",
      href: ''
    },
    {
      name: "Like posts",
      href: 'like'
    },
    {
      name: "Bookmarks",
      href: 'bookmark'
    }
  ]

  return (
    <div className='w-full h-full mt-20'>
      <div className='flex gap-3 items-center'>
        {
          SectionCate.map((cate, i) => (
            <Link 
              key={i} 
              href={`/${params}/${cate.href}`} 
              className={`text-secondaryDark font-medium text-sm rounded-full cursor-pointer px-3 py-1 transition-all hover:bg-yellow-100/30 
                ${pathname === `/${params}/${cate.href}` || (pathname === `/${params}` && cate.href === '') ? 'bg-yellow-100/30' : 'bg-white'}`
              }
            >
              {cate.name}
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default ProfileSectionHead
