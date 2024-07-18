import React from "react";
import Category from "@/components/Category";
import { getPostsByCategory } from "@/actions/postAction";
import Card from "@/components/Card";
const page = async  ({ params }: { params: { category: string } }) => {
  const posts = await getPostsByCategory(params.category);

  return (
    <main className="bg-primary mt-10  px-16">
      <Category />
      <div className="w-ful mt-10 h-full flex flex-wrap gap-4 ">
        {posts.length > 0 ? (
          posts.map((post: any, i: number) => <Card key={i} data={post} />)
        ) : (
          <div>Not found</div>
        )}
      </div>
    </main>
  );
};

export default page;
