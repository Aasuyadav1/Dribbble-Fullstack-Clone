import { getAllPosts } from "@/actions/postAction";
import Card from "@/components/Card";
import Category from "@/components/Category";
import React from 'react'

const page = async () => {
  const posts = await getAllPosts();
  return (
    <main className="bg-primary mt-10 px-16">
      <Category />
      <div className="w-ful mt-10 h-full flex flex-wrap gap-10 ">
        {posts ? (
          posts.map((post: any, i: number) => <Card key={i} data={post} />)
        ) : (
          <div>Not found</div>
        )}
      </div>
    </main>
  );
}

export default page