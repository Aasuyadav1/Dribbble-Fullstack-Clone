import React from 'react'
import NotFoundImage from '../../public/images/notfound.png'
import Image from 'next/image'

interface Props {
    heading?: string,
    subHeading?: string
}

const NotFound = ({heading = "Result not found", subHeading = "It seems we can’t find any results based on your search."} : Props) => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
        <Image src={NotFoundImage} alt="notfound" height={500} width={500} />
        <h1 className='font-semibold text-xl'>{heading}</h1>
        <p className='font-medium mt-2 text-black/50'>{subHeading}</p>
    </div>
  )
}

export default NotFound