import React from 'react'
import Image from 'next/image'
import { getUserById } from '@/actions/userAction'
import ProfileHead from '@/components/profile/ProfileHead'
import ProfileSectionHead from '@/components/profile/ProfileSectionHead'
import PostCard from '@/components/profile/PostCard'
import { getPostsByUser } from '@/actions/postAction'

const page = async ({params}: any) => {
    const user = await getUserById(params.id)

    console.log("user not login", user)
   
    if(!user) return null



    const posts = await getPostsByUser(user._id)

  return (
    <div className='w-ful mt-10 h-full flex flex-wrap gap-4'>
     
     {
       posts ? (
        posts.map((post : any, i : number) => (
          <PostCard key={i} data={post} />
         ))
       ) : <div>
        post not found
       </div>
     }
    </div>
  )
}

export default page