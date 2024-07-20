import React from 'react'
import PostCard from '@/components/profile/PostCard'
import { getPostByUserCategory } from '@/actions/postAction'
import { getLikesPostByUser } from '@/actions/likeAction'
import { getBookmarkedPostByUser } from '@/actions/bookmarkAction'

const page = async ({ params }: { params: { category: string, id: string } }) => {
  let posts = [];

  if (params.category === 'like') {
    posts = await getLikesPostByUser(params.id);
  } else if (params.category === 'bookmark') {
    posts = await getBookmarkedPostByUser(params.id);
  } else {
    posts = await getPostByUserCategory(params.id, params.category);
  }

  return (
    <div className="w-full mt-10 h-full flex flex-wrap gap-4 ">
      {posts.length > 0 ? (
        posts.map((post: any, i: number) => <PostCard key={i} data={post} />)
      ) : (
        <div>Not found</div>
      )}
    </div>
  )
}

export default page
