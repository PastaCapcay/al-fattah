import React from 'react'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa6'
import Link from 'next/link'

const CardOne = ({ data_target }) => {
    return (
        <div className={`grid lg:gap-7.5 gap-4 grid-cols-12 grid-rows-[277px] top-0 left-0 transition-all duration-500  ${(data_target === "education" || data_target === "coaching") ? "relative translate-y-0 visible opacity-100" : "absolute translate-y-10 invisible opacity-0"}`}>

            <div className="sm:col-start-1 md:col-end-5 sm:col-end-7 col-span-full sm:row-span-2 relative">
                <Image src={'/images/kegiatan-baru/kegiatan-1.jpeg'} width={410} height={602} alt="Kegiatan Al-Fattah" className="w-full h-full max-h-[300px] sm:max-h-full object-cover rounded-[10px]" style={{ width: '100%', height: '100%' }} />
                
            </div>


            <div className="md:col-start-5 md:col-end-10 sm:col-start-7 sm:col-end-13 col-span-full relative">
                <Image src={'/images/kegiatan-baru/kegiatan-2.jpeg'} width={520} height={277} alt="Kegiatan Al-Fattah" className="w-full h-full max-h-[300px] sm:max-h-full object-cover rounded-[10px]" style={{ width: '100%', height: '100%' }} />
                
            </div>


            <div className="md:col-start-10 sm:col-start-7 sm:col-end-13 col-span-full relative">
                <Image src={'/images/kegiatan-baru/kegiatan-3.jpeg'} width={300} height={277} alt="Kegiatan Al-Fattah" className="w-full h-full max-h-[300px] sm:max-h-full object-cover rounded-[10px]" style={{ width: '100%', height: '100%' }} />
                
            </div>


            <div className="md:col-start-5 md:col-end-9 sm:col-start-1 sm:col-end-7 col-span-full relative">
                <Image src={'/images/kegiatan-baru/kegiatan-4.jpeg'} width={410} height={295} alt="Kegiatan Al-Fattah" className="w-full h-full max-h-[300px] sm:max-h-full object-cover rounded-[10px]" style={{ width: '100%', height: '100%' }} />
                
            </div>


            <div className="md:col-start-9 sm:col-span-6 sm:col-end-13 col-span-full relative">
                <Image src={'/images/kegiatan-baru/kegiatan-5.jpeg'} width={410} height={295} alt="Kegiatan Al-Fattah" className="w-full h-full max-h-[300px] sm:max-h-full object-cover rounded-[10px]" style={{ width: '100%', height: '100%' }} />

            </div>

            {/* Additional portfolio images */}
            <div className="md:col-start-1 sm:col-start-1 sm:col-end-4 col-span-full relative">
                <Image src={'/images/kegiatan-baru/kegiatan-6.jpeg'} width={300} height={277} alt="Kegiatan Al-Fattah" className="w-full h-full max-h-[300px] sm:max-h-full object-cover rounded-[10px]" style={{ width: '100%', height: '100%' }} />

            </div>

            <div className="md:col-start-4 md:col-end-7 sm:col-start-4 sm:col-end-7 col-span-full relative">
                <Image src={'/images/kegiatan-baru/kegiatan-7.jpeg'} width={300} height={277} alt="Kegiatan Al-Fattah" className="w-full h-full max-h-[300px] sm:max-h-full object-cover rounded-[10px]" style={{ width: '100%', height: '100%' }} />

            </div>

            <div className="md:col-start-7 md:col-end-10 sm:col-start-7 sm:col-end-10 col-span-full relative">
                <Image src={'/images/kegiatan-baru/kegiatan-8.jpeg'} width={300} height={277} alt="Kegiatan Al-Fattah" className="w-full h-full max-h-[300px] sm:max-h-full object-cover rounded-[10px]" style={{ width: '100%', height: '100%' }} />

            </div>

            <div className="md:col-start-10 sm:col-start-10 sm:col-end-13 col-span-full relative">
                <Image src={'/images/kegiatan-baru/kegiatan-9.jpeg'} width={300} height={277} alt="Kegiatan Al-Fattah" className="w-full h-full max-h-[300px] sm:max-h-full object-cover rounded-[10px]" style={{ width: '100%', height: '100%' }} />

            </div>

        </div>
    )
}

export default CardOne