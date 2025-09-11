import React from 'react'
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";

const TopHeader = () => {
    return (
        <div id="top-header" className="bg-destructive sm:block hidden">
            <div className="container">
                <div className="flex lg:flex-row flex-col justify-center items-center gap-2 py-[13px]">
                    <div>
                        <ul className="flex gap-5 flex-wrap justify-center text-[13px] lg:text-[14px]">
                            <li className='text-cream-foreground flex items-center gap-2'>
                                <FaPhone /> <Link href={"#"}>0812-9846-5771</Link>
                            </li>
                            <li className='text-cream-foreground flex items-center gap-2'>
                                <FaEnvelope /> <Link href={"#"}>info@alfattah.sch.id</Link>
                            </li>
                            <li className='text-cream-foreground flex items-center gap-2'>
                                <FaLocationDot /> <span title="Perum Grand Cikarang City (GCC) – Sakura Cinity, Blok F7 No.36 & Blok F19 No.36, Desa Karang Raharja, Kec. Cikarang Utara, Kab. Bekasi, Jawa Barat 17550 (dekat Kawasan Industri MM2100)" className="truncate max-w-[520px] md:max-w-[680px]">GCC – Sakura Cinity, Blok F7 & F19 No.36, Karang Raharja, Cikarang Utara, Bekasi</span>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default TopHeader