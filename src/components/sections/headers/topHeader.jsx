import React from 'react'
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";

const TopHeader = () => {
    return (
        <div id="top-header" className="bg-destructive sm:block hidden">
            <div className="container">
                <div className="flex lg:flex-row flex-col justify-center items-center gap-2 py-[13px]">
                    <div>
                        <ul className="flex gap-7.5">
                            <li className='text-cream-foreground flex items-center gap-4'>
                                <FaPhone /> <Link href={"#"}>0812-9846-5771</Link>
                            </li>
                            <li className='text-cream-foreground flex items-center gap-4'>
                                <FaEnvelope /> <Link href={"#"}>info@alfattah.sch.id</Link>
                            </li>
                            <li className='text-cream-foreground flex items-center gap-4'>
                                <FaLocationDot /> <span>Perum Grand Cikarang City, Sakura F.7 No.36, Karangraharja, Kec. Cikarang Utara, Kab. Bekasi, Jawa Barat 17550</span>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default TopHeader