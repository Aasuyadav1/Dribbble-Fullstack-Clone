'use client'
import React from 'react'
import { GoSearch } from "react-icons/go";

const NavSearch = () => {

    // make it server side this components for that remove functions directly add server action on onsubmit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('search value is', e.currentTarget.search.value)
    }
  return (
    <label htmlFor='search' className='max-w-[250px] w-full px-3 py-3 border-[4px] bg-[rgb(243,244,252)] border-transparent hover:bg-transparent transition-all hover:border-[rgb(255,230,253)] rounded-full flex gap-2 flex-row-reverse items-center cursor-pointer has-[:focus]:bg-transparent has-[:focus]:border-[rgb(255,230,253)] ' >
        <form method='post' onSubmit={handleSubmit}>
        <input name='search' id="search" type="text" placeholder='Search...' className='border-none outline-none w-full bg-transparent' />
        <button type='submit' className='hidden'></button>
        </form>
        <label htmlFor="search" className='h-fit w-fit '>
          <GoSearch className='w-4 h-4 text-secondaryDark opacity-90' />
        </label>
    </label>
  )
}

export default NavSearch