import React from "react";
import Category from "@/components/Category";
import { getPostsByCategory } from "@/actions/postAction";
import Card from "@/components/Card";
import NotFoundData from "@/components/NotFoundData";

const page = async  ({ params }: { params: { category: string } }) => {
  const posts = await getPostsByCategory(params.category);

  return (
    <main className=" mt-2 sm:mt-10 px-2 md:px-16  ">
      <Category />
      {
        posts.length > 0 ? <div className="w-full mt-10 h-full grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-4 px-2 md:px-16">{
          posts.map((post: any, i: number) => <Card key={i} data={post} />)
        }</div>   : <NotFoundData />
      }
    
    </main>
  );
};

export default page;
