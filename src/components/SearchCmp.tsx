"use client"
import React, { useState, useEffect } from 'react'

const SearchCmp = ({ value }: { value: string }) => {
    const [searchVal, setSearchVal] = useState('')

    // Update searchVal whenever the value prop changes
    useEffect(() => {
        console.log("Value from props:", value); // Log the incoming prop value
        setSearchVal(value);
    }, []);

    useEffect(() => {
        console.log("Search value updated:", searchVal); // Log the updated searchVal
    }, [searchVal]);

    return (
        <div className='w-full flex justify-center items-center bg-gradient-to-r from-cyan-100/90 to-fuchsia-100/90 relative min-h-[80px]'>
            <label htmlFor="search-sh" className='has-[:focus]:bg-transparent border-4 w-full px-4 py-4 max-w-[450px] z-10 shadow-xl !bg-white border-transparent rounded-md absolute -bottom-8 left-1/2 -translate-x-1/2 transition-all hover:border-transparent has-[:focus]:border-[rgb(255,230,253)]'>
             
                    <input
                        type="text"
                        id='search-sh'
                        placeholder='Search...'
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        className='outline-none w-full h-full bg-white border-none'
                    />
           
            </label>
        </div>
    )
}

export default SearchCmp;
