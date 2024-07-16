import React from 'react'

const page = ({params}: any) => {
  return (
    <div>{params?.value}</div>
  )
}

export default page