import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Title from '@/components/ui/title'
import { Button } from '@/components/ui/button'
import SectionName from '@/components/ui/sectionName'
import SlideUp from '@/lib/animations/slideUp'
import SectionDescription from '@/components/ui/sectionDescription'
import { cn } from '@/lib/utils'

const AboutOne = ({ gridClass, isAboutpage }) => {
    // 'gridClass' and 'isAboutpage' props come frome about-us and home-1 page
    return (
        <section className="lg:pt-15 pt-10 lg:pb-15 pb-10">
            <div className="container">
                <div className={cn("grid lg:grid-cols-[60%_40%] grid-cols-1 items-center", gridClass)}>
                    <div className="relative">
                        <div className="flex sm:flex-row flex-col sm:items-end gap-6">
                            <SlideUp>
                                <div className="relative">
                                    <div>
                                        <Image src={'/images/about/shap-1.png'} width={61} height={47} alt="shap" />
                                    </div>
                                    <div className="ml-9">
                                        <Image src={'/images/about/about-1.png'} width={320} height={417} alt="about-bg" className="w-full" />
                                    </div>
                                    <div className="absolute -bottom-12.5 left-0 bg-primary rounded-[10px] py-4 px-[22px] flex items-center gap-3">
                                        <div className="bg-background w-11 h-11 rounded-full flex justify-center items-center">
                                            <Image src={'/images/about/customer.png'} width={37} height={24} alt="customer" />
                                        </div>
                                        <div>
                                            <h6 className="text-cream-foreground font-bold text-2xl">5,000+</h6>
                                            <p className="text-cream-foreground">Orang Tua Puas</p>
                                        </div>
                                    </div>
                                </div>
                            </SlideUp>
                            <div className="flex sm:flex-col gap-8">
                                <div className="bg-warm max-w=[212px] rounded-[11px] px-5 pt-[22px] pb-6 flex flex-col items-center justify-center text-center">
                                    <Image src={'/images/about/icreement.png'} width={46} height={46} alt="icreement" />
                                    <h6 className="text-xl font-bold">Akademik</h6>
                                    <p>Al-Fattah</p>
                                </div>
                                <div className="bg-background max-w-[212px] rounded-[11px] px-5 pt-[22px] pb-6 flex flex-col justify-center drop-shadow-[0px_4.8px_24.4px_rgba(19,16,34,0.10)]">
                                    <h6 className="text-[32px] font-bold text-secondary-foreground">10+</h6>
                                    <p>Tahun Pengalaman</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- right side start --> */}
                    <div className={`${isAboutpage ? "" : "lg:max-w-[439px]"} pt-7.5`}>
                        <SectionName>Tentang Kami</SectionName>
                        <Title size={"3.5xl"} className={"pb-5"}>Menggali Potensi Anak, Satu Langkah Setiap Hari</Title>
                        <SectionDescription>Al-Fattah berkomitmen menghadirkan lingkungan belajar yang aman, hangat, dan menyenangkan untuk menumbuhkan karakter, kemandirian, dan kreativitas.</SectionDescription>
                        <div className='lg:mt-10 mt-7'>
                            <Button asChild variant="outline">
                                <Link href="/about-us">Minta Informasi</Link>
                            </Button>
                        </div>

                    </div>
                    {/* <!-- right side end --> */}
                </div>
            </div>
        </section>
    )
}

export default AboutOne