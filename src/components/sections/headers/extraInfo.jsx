import React from 'react'
import Link from 'next/link'
import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";

const ExtraInfo = () => {
    return (
        <div className="mt-5">
            <div>
                <h4 className="text-xl font-bold text-[#385469]">Kontak</h4>
                <ul className="mt-5 flex flex-col gap-[15px]">
                    <li className='flex items-center gap-2'>
                        <FaPhone className="text-primary-foreground" /> <Link href="tel:081298465771" className="ml-2.5">0812-9846-5771</Link>
                    </li>
                    <li className='flex items-center gap-2'>
                        <FaEnvelope className="text-primary-foreground" /> <Link href="mailto:info@alfattah.sch.id" className="ml-2.5">info@alfattah.sch.id</Link>
                    </li>
                    <li className='flex items-center gap-2'>
                        <FaLocationDot className="text-primary-foreground" /> <span className="ml-2.5 max-w-[260px]">Perum Grand Cikarang City (GCC) – Sakura Cinity, Blok F7 No.36 & Blok F19 No.36, Desa Karang Raharja, Kec. Cikarang Utara, Kab. Bekasi, Jawa Barat 17550 (dekat Kawasan Industri MM2100)</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ExtraInfo