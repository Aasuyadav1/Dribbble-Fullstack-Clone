import React from 'react'

const page = ({params}: any) => {
  return (
    <div className='w-full  flex justify-center items-center bg-gradient-to-r from-cyan-100/90 to-fuchsia-100/90 relative min-h-[80px] '>
        <label htmlFor="search-sh" className='has-[:focus]:bg-transparent border-4 w-full px-4 py-4 max-w-[450px] z-10 shadow-xl !bg-white  border-transparent rounded-md absolute -bottom-8 left-1/2 -translate-x-1/2  transition-all hover:border-transparent has-[:focus]:border-[rgb(255,230,253)]'>
          <input type="text" id='search-sh' placeholder='Search...'
          value={params?.value} 
          className='outline-none w-full h-full bg-white border-none' />
        </label>
    </div>
  )
}

export default page