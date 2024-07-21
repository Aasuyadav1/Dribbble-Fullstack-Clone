import { getAllPosts } from "@/actions/postAction";
import Card from "@/components/Card";
import Category from "@/components/Category";
import React from 'react'
import NotFoundData from "@/components/NotFoundData";

const page = async () => {
  const posts = await getAllPosts();
  return (
    <main className="bg-primary mt-2 sm:mt-10 px-2 md:px-16">
      <Category />
      {
        posts.length > 0 ? <div className="w-full mt-2 md:mt-10 h-full grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-4 px-2 md:px-16">{
          posts.map((post: any, i: number) => <Card key={i} data={post} />)
        }</div>   : <NotFoundData />
      }
    </main>
  );
}

export default page