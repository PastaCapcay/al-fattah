import { cn } from '@/lib/utils'
import React from 'react'

const Input = ({ id, type = 'text', placeholder, className, ...rest }) => {
    return (
        <input
            {...rest}
            type={type}
            id={id}
            placeholder={placeholder}
            className={cn(`rounded-[10px] border border-black pl-6 lg:py-7 py-4 max-h-20 w-full outline-none`, className)}
        />
    )
}

export default Input