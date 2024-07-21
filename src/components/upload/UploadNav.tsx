import React from 'react'
import Button from '../ui/Button'
import ContinueModel from './ContinueModel'
import Link from 'next/link'


const UploadNav = ({ updateId, postData }: { updateId?: string, postData?: any }) => {
  return (
    <nav className='w-full flex justify-between items-center gap-4 md:px-10 px-2 py-2'>
        <div>
           <Link href={'/'}>
           <Button className='px-6 py-2 bg-transparent border border-zinc-800 rounded-full font-semibold  !text-secondaryDark hover:bg-slate-100'>Cancel</Button>
           </Link>
        </div>
        <div className='flex gap-10 items-center'>
        {/* <Button className='px-6 py-2 bg-transparent border border-zinc-800 rounded-full font-semibold  !text-secondaryDark hover:bg-slate-100'>Save as Draft</Button> */}
        <ContinueModel postData={postData} updateId={updateId} />
        </div>
    </nav>
  )
}

export default UploadNav