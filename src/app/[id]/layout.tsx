import React from 'react'
import { getUserById } from '@/actions/userAction'
import ProfileHead from '@/components/profile/ProfileHead';
import ProfileSectionHead from '@/components/profile/ProfileSectionHead';

const layout = async ({
    children,
    params
  }: Readonly<{
    children: React.ReactNode;
    params: { id: string };
  }>) => {
    const user = await getUserById(params.id)
    console.log(user)
    if(!user) return null
  return (
    <div className='px-2 md:px-16'>
         <ProfileHead User={user}/>
         <ProfileSectionHead params={params.id}/>
        {children}
    </div>
  )
}

export default layout