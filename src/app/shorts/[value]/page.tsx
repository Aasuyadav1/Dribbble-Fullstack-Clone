import React from 'react'
import { getPostFollowing } from '@/actions/postAction'
import NotFoundData from '@/components/NotFoundData'
import Card from '@/components/Card'
import { getPopularPosts } from '@/actions/postAction'
import Category from '@/components/Category'


type Props = {
    params: {
        value: 'Following' | 'popular'
    }
}

const page = async ({params}: Props) => {
    var posts = [];
    if(params.value == 'Following') {
        posts = await getPostFollowing();
    } else {
        posts = await getPopularPosts();
    }
    const filter: string[] = ["Following", "Popular", "All"];
  return (
    <div className=" mt-2 sm:mt-10 px-2 md:px-16">
        <Category/>
      {
        posts.length > 0 ? <div className="w-full mt-10 h-full grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-3 xl:grid-cols-4 px-2 md:px-16">{
          posts.map((post: any, i: number) => <Card key={i} data={post} />)
        }</div>   : <NotFoundData />
      }
    </div>
  )
}

export default page