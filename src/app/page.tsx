import Image from "next/image";
import AuthBtns from '@/components/signin/AuthBtns'

export default function Home() {
  return (
    <div className='w-full p-2 h-full flex mt-10  justify-center items-center'>
    <div className=' max-w-[500px] w-full h-fit'>
    <h1 className='text-3xl font-semibold'>Login to Dribbble</h1>
    <AuthBtns/>
    </div>
 </div>
  );
}
