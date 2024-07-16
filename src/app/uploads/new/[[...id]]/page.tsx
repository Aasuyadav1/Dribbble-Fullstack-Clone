import React from 'react'
import UploadNav from '@/components/upload/UploadNav'
import UploadWidget from '@/components/upload/UploadWidget'
import ContinueModel from '@/components/upload/ContinueModel'
import { getPostById } from '@/actions/postAction'
import { auth } from '../../../../../auth'
import { redirect } from 'next/navigation'

const page = async ({params}: {params: {id: string}}) => {
  var data;
  const session:any = await auth();
  if(params.id){
    data = await getPostById(params.id)
    if(session?.user?.id !== data?.user?._id){
      return redirect("/")
    }
  }
  return (
    <div>
      <UploadNav updateId={params?.id || ""} postData={data || null}/>
      <UploadWidget updateId={params?.id || ""} postData={data || null}/>
    </div>
  )
}

export default page