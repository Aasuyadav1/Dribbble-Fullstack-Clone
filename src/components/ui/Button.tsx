'use client'
import React from 'react'
import clsx from 'clsx'

interface ButtonProps {
    children: React.ReactNode,
    onClick?: () => void,
    type?: "button" | "submit" | "reset" ,
    disabled?: boolean,
    className?: string
}

const Button = ({children, onClick, type="button", disabled=false, className} : ButtonProps) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled}  className={clsx(
        "bg-secondaryDark text-white font-bold py-2 px-4 rounded hover:bg-secondary transition-all", 
        disabled && "opacity-70 cursor-not-allowed",
        className
      )} >{children}</button> 
  )
}

export default Button