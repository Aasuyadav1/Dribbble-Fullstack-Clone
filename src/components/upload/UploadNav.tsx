import React from 'react'
import Button from '../ui/Button'
import ContinueModel from './ContinueModel'


const UploadNav = ({ updateId, postData }: { updateId?: string, postData?: any }) => {
  return (
    <nav className='w-full flex justify-between items-center gap-4 px-10 py-2'>
        <div>
           <Button className='px-6 py-2 bg-transparent border border-zinc-800 rounded-full font-semibold  !text-secondaryDark hover:bg-slate-100'>Cancel</Button>
        </div>
        <div className='flex gap-10 items-center'>
        <Button className='px-6 py-2 bg-transparent border border-zinc-800 rounded-full font-semibold  !text-secondaryDark hover:bg-slate-100'>Save as Draft</Button>
        <ContinueModel postData={postData} updateId={updateId} />
        </div>
    </nav>
  )
}

export default UploadNav