import React from 'react'
import Link from 'next/link'
import { FaArrowRight, FaEnvelope, FaLocationDot, FaPhone } from 'react-icons/fa6'
import Logo from '@/components/ui/logo'
import CopyRight from './copyRight'
import ScrollUp from './scrollUp'
import Input from '@/components/ui/input'
import SlideUp from '@/lib/animations/slideUp'
import Image from 'next/image'

const FooterTwo = () => {
    return (
        <footer className="pt-20 bg-[#0A6375] relative">
            <div className="container">
                <div className="grid lg:grid-cols-[300px_auto_auto] sm:grid-cols-2 grid-cols-1 gap-x-7.5 gap-y-10 justify-between">

                    <SlideUp delay={2}>
                        <Logo className="text-cream-foreground" />
                        <div className="mt-10">
                            <p className=" text-cream-foreground opacity-80">TK, KB, dan Daycare Al-Fattah. Tumbuh dalam kasih, belajar dengan gembira.</p>
                        </div>
                        <div className="mt-6 flex items-center gap-5 flex-wrap">
                            <Image src={'/images/logos/YAYASAN.png'} width={72} height={72} alt="Logo Yayasan" className="object-contain h-[48px] w-auto" />
                            <Image src={'/images/logos/KB.png'} width={72} height={72} alt="Logo KB" className="object-contain h-[48px] w-auto" />
                            <Image src={'/images/logos/TK.png'} width={72} height={72} alt="Logo TK" className="object-contain h-[48px] w-auto" />
                            <Image src={'/images/logos/DAYCARE.png'} width={72} height={72} alt="Logo Daycare" className="object-contain h-[48px] w-auto" />
                        </div>
                    </SlideUp>

                    <SlideUp delay={3}>
                        <div className="inline-block">
                            <h3 className="text-2xl font-semibold text-cream-foreground inline-block">Halaman</h3>
                            <span className="block w-[130%] h-[1px] mt-2 bg-background relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-background after:h-1.5 after:w-1.5 after:rounded-full"></span>
                        </div>
                        <ul className="flex flex-col lg:gap-[15px] gap-2.5 lg:pt-7.5 pt-5 min-w-[215px]">
                            <li><Link href="/about-us" className="text-cream-foreground transition-all duration-500 hover:ml-[5px] hover:text-primary-foreground">Tentang Kami</Link></li>
                            <li><Link href="/services" className="text-cream-foreground transition-all duration-500 hover:ml-[5px] hover:text-primary-foreground">Layanan Kami</Link></li>
                            </ul>
                    </SlideUp>

                    <SlideUp delay={4}>
                        <div className="inline-block">
                            <h3 className="text-2xl font-semibold text-cream-foreground">Kontak</h3>
                            <span className="block w-[130%] h-[1px] mt-2 bg-background relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-background after:h-1.5 after:w-1.5 after:rounded-full"></span>
                        </div>

                        <ul className="flex flex-col lg:gap-[15px] gap-2.5 lg:pt-7.5 pt-5">
                            <li className="text-cream-foreground flex gap-4">
                                <FaLocationDot className='mt-1.5' /> <span className="max-w-[168px]">Perum Grand Cikarang City (GCC) – Sakura Cinity, Blok F7 No.36 & Blok F19 No.36, Desa Karang Raharja, Kec. Cikarang Utara, Kab. Bekasi, Jawa Barat 17550 (dekat Kawasan Industri MM2100)</span>
                            </li>
                            <li className="text-cream-foreground flex gap-4">
                                <FaEnvelope className='mt-1.5' /> <Link href="#">info@alfattah.sch.id</Link>
                            </li>
                            <li className="text-cream-foreground flex gap-4">
                                <FaPhone className='mt-1.5' /> <Link href="#">0812-9846-5771</Link>
                            </li>
                        </ul>
                    </SlideUp>

                    
                    {/* <!-- Newsletter end --> */}
                </div>
                <CopyRight color={"text-cream-foreground opacity-80"} />
            </div>
            <ScrollUp />
            <div>
                <div className="absolute right-[68px] top-[40%] animate-up-down">
                    <Image src={'/images/shapes/apple.svg'} width={99} height={99} alt="img" />
                </div>
                <div className="absolute left-[45%] lg:top-1/2 top-[40%]">
                    <Image src={'/images/shapes/scissors.svg'} width={77} height={77} alt="img" />
                </div>
            </div>
        </footer>
    )
}

export default FooterTwo