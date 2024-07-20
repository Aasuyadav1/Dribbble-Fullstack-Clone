import React from 'react'
import SearchCmp from '@/components/SearchCmp'
import { searchPostsByTitle } from '@/actions/postAction';
import NotFound from '@/components/NotFound';
import Card from '@/components/Card';

interface PageProps {
  params: {
    value: string;
  };
}

const page: React.FC<PageProps> = async ({ params }) => {
  let filteredValue = await  params?.value.replace(/%/g, ' '); // Replace % with space
  filteredValue = await filteredValue.replace(/\d+/g, ''); // Remove all numbers

  const posts = await searchPostsByTitle(filteredValue);

  console.log("searched results", posts);

  return (
    <div className="w-full mt-10 ">
      <SearchCmp value={filteredValue} />
      {
        posts.length > 0 ? <div className="w-full mt-10 h-full grid grid-cols-2 gap-4 md:gap-10 md:grid-cols-4 px-2 md:px-16">{
          posts.map((post: any, i: number) => <Card key={i} data={post} />)
        }</div>   : <NotFound />
      }
    </div>
  );
}

export default page
