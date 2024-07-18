import React from 'react'
import SearchCmp from '@/components/SearchCmp'

const page = ({params}: any) => {
  return (
   <>
   <SearchCmp value={params?.value}/>
   </>
  )
}

export default page