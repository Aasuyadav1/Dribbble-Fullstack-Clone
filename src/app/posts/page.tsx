import { getAllPosts } from "@/actions/postAction";
import PostCard from "@/components/profile/PostCard";
import Card from "@/components/Card";
import Category from "@/components/Category";
import React from 'react'

const page = async () => {
  const posts = await getAllPosts();
 
  return (
    <main className="bg-primary mt-10">
      <Category />
      <div className="w-ful mt-10 h-full flex flex-wrap gap-4 px-24">
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