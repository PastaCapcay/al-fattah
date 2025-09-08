import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import Link from 'next/link'
import Image from 'next/image'



const CardThree = ({data_target}) => {
    return (
        <div className={`grid lg:gap-7.5 gap-4 grid-cols-12 sm:grid-rows-[453px] top-0 left-0 transition-all duration-500 ${data_target === "learn" ? "relative translate-y-0 visible opacity-100" : "absolute translate-y-10 invisible opacity-0"}`}>

            <div className="sm:col-start-1 sm:col-end-7 col-span-full relative max-h-[453px]">
                <Image src={'/images/portfolio/portfolio-3.png'} width={300} height={277} sizes="100vw" alt="img" className="w-full h-full max-h-[300px] sm:max-h-full object-cover rounded-[10px]" />
            </div>


            <div className="sm:col-start-7 sm:col-end-13 col-span-full relative max-h-[453px]">
                <img src={'/images/portfolio/portfolio-5.png'} width={410} height={295} sizes="100vw" alt="img" className="w-full h-full max-h-[300px] sm:max-h-full object-cover rounded-[10px]" />
            </div>

        </div>
    )
}

export default CardThree