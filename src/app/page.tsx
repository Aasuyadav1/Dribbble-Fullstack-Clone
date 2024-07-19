import { getAllPosts } from "@/actions/postAction";
import Card from "@/components/Card";
import Category from "@/components/Category";
import React from 'react'

const page = async () => {
  const posts = await getAllPosts();
  return (
    <main className="bg-primary mt-10 px-2 md:px-16">
      <Category />
      <div className="w-full mt-10 h-full grid grid-cols-2 gap-4 md:gap-10 md:grid-cols-4">
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