import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const Logo = ({ className }) => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <img src={'/images/logo.png'} width={40} height={40} alt="Logo Al-Fattah" />
      <span className={cn("font-bold text-3xl", className)}>Al-Fattah</span>
    </Link>
  )
}

export default Logo