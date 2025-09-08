import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const CopyRight = ({ color }) => {
    return (
        <div className="pt-[75px] overflow-x-hidden">
            <div className="flex lg:flex-row flex-col justify-between lg:items-center pt-7.5 pb-8 border-t border-t-white border-opacity-20">
                <p className={cn('wow fadeInLeft', color)} data-wow-delay=".3s">© <Link href="#">TK, KB, dan Daycare Al-Fattah</Link> 2025 | Hak Cipta Dilindungi</p>
                <ul className="flex items-center gap-7.5 wow fadeInRight" data-wow-delay=".3s">
                    <li><Link href="#" className={cn(``, color)}>Syarat & Ketentuan</Link></li>
                    <li><Link href="#" className={cn(``, color)}>Kebijakan Privasi</Link></li>
                    <li><Link href="#" className={cn(``, color)}>Hubungi Kami</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default CopyRight