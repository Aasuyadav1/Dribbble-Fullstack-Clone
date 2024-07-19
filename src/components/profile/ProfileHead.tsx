import React from 'react'
import { UserType } from '@/types/indexType'
import Image from 'next/image'
import { getPostsByUser } from '@/actions/postAction'
import { getLikesPostByUser } from '@/actions/likeAction'

const ProfileHead = async ({User}: {User: UserType}) => {
    const numberOfPosts = await getPostsByUser(User?._id)
    const numberOfLikes = await getLikesPostByUser(User?._id)
  return (
    <div className='w-full mt-10 flex justify-center items-center '>
        <div className='w-full flex justify-center gap-8 items-start'>
            {
                User?.image ? (
                    <Image
                src={User.image}
                alt="profile"
                width={110}
                height={110}
                className="rounded-full cursor-pointer"
            />
                ) : (
                    <div className="h-[110px] w-[110px] text-6xl rounded-full text-white font-medium cursor-pointer bg-purple-500 grid place-content-center">
          {User?.username.charAt(0)}
        </div>
                )
            }

            <div>
                <div>
                    <h1 className="text-4xl font-semibold mt-2">{User?.username}</h1>
                </div>
                <div className='flex gap-4 items-center transition-all mt-3'>
                    <span className='text-md text-zinc-900 hover:text-zinc-600 cursor-pointer '>{User?.followers?.length} Followers</span>
                    <span className='text-md text-zinc-900 hover:text-zinc-600 cursor-pointer'>{User?.following?.length} Following</span>
                    <span className='cursor-pointer text-md text-zinc-900 hover:text-zinc-600 '>{numberOfPosts?.length} Posts</span>
                    <span className='cursor-pointer text-md text-zinc-900 hover:text-zinc-600 '>{numberOfLikes?.length} Likes</span>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ProfileHead