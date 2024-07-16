import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CiHeart, CiBookmark } from 'react-icons/ci';
import { GoHeartFill } from 'react-icons/go';
import { PiEyeFill } from 'react-icons/pi';
import BookmarkBtn from '../BookmarkBtn';
import LikeBtn from '../LikeBtn';
import { getUser } from '@/actions/userAction';

const PostCard = async ({data, isFotter = true} : {data: any, isFotter?: boolean}) => {
  const session = await getUser();

  const isLiked = data?.likes?.includes(session?.id) || false;

  const isBookmarked = data?.bookmarks?.includes(session?.id) || false;
  return (
    <div className='w-fit h-fit overflow-hidden  '>
    <div className='w-fit cursor-pointer p-0 con h-fit relative group overflow-hidden rounded-xl '>
    <Link href={`/post/${data?._id}`}>
    <Image src={data?.image[0]} className='rounded-md w-[273px] aspect-square' alt="dribbble"  width={273} height={1000} />
    </Link>
    <div className='w-full image-gr bottom-0 left-0  absolute py-3 px-2 group-hover:flex hidden justify-between items-center overflow-hidden '>
        <h1 className=' font-medium text-primary'>{data?.title}</h1>
        <div className='flex gap-4'>
            {/* <CiHeart  className='text-secondaryDark p-2 bg-primaryDark text-4xl rounded-full shadow-md hover:text-secondary/90'/> */}
            <BookmarkBtn isBookmarked={isBookmarked} _id={data?._id} />
        </div>
    </div>
    </div>
   {
    isFotter ?  <div className='mt-1 flex py-1 px-1 justify-end items-center'>
        
    <div className='flex gap-2 items-center'>
    <LikeBtn
        isLiked={isLiked}
        like={data?.likes?.length || 0}
        _id={data?._id}
      />
        <div className='flex gap-1 items-center'>
        <PiEyeFill className='text-secondary/50 text-xl ' />
        <h1 className='text-secondaryDark/50 font-medium text-xs'> {data?.views?.length || 0}k</h1>
        </div>
    </div>
</div> : null
   }
   
</div>
  );
};

export default PostCard;
