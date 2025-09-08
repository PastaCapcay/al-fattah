"use client"
import React from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { servicesDataTwo } from '@/lib/fackdata/servicesDataTwo'
import { FaAngleRight, FaAnglesRight } from 'react-icons/fa6'
import Car from '../../../../public/icons/car'
import Toys from '../../../../public/icons/toys'
import Feeder from '../../../../public/icons/feeder'
import SlideUp from '@/lib/animations/slideUp'
import Link from 'next/link'

const ServiceArtical = () => {
    const searchParams = useSearchParams()
    const key = searchParams.get('s')
    const current = servicesDataTwo.find(s => s.slug === key)
    const renderIcon = (icon) => {
        switch (icon) {
            case 'car':
                return <Car />
            case 'toys':
                return <Toys />
            case 'feeder':
                return <Feeder />

            default:
                break;
        }
    }
    return (
        <section className="lg:pt-15 pt-10">
            <div className="container">
                <SlideUp>
                    <div className="relative">
                        <Image src={'/images/services/service-details-1.png'} width={1280} height={562} sizes='100vw' priority={true} alt="details" />
                        <div className="absolute left-5 top-5 flex items-center gap-3 bg-white/90 backdrop-blur px-3 py-2 rounded">
                            <Image src={key === 'kb' ? '/images/logos/KB.png' : key === 'tk' ? '/images/logos/TK.png' : key === 'daycare' ? '/images/logos/DAYCARE.png' : '/images/logos/YAYASAN.png'} width={28} height={28} alt="Logo Program" className="object-contain h-6 w-auto" />
                            <span className="text-sm font-medium">{current?.service_name || 'Layanan'}</span>
                        </div>
                    </div>
                </SlideUp>
                <SlideUp delay={2}>
                    <div className="lg:pt-7.5 pt-5 ">
                        <h4 className="lg:text-3xl text-2xl lg:leading-[148%] leading-[130%] font-bold  font-nunito">{current?.service_name || 'Layanan'}</h4>
                        <p className="lg:pt-7 pt-4">{current?.long_description || current?.service_details || 'Informasi layanan tidak tersedia.'}</p>
                        
                        
                        
                    </div>
                </SlideUp>
                <div className="pt-10">
                    <SlideUp delay={3}>
                        <div className="max-w-[790px]">
                            <h4 className="text-2xl font-semibold leading-[140%]">Rincian Program</h4>
                            <p className="mt-[18px]">Berikut gambaran kurikulum, kegiatan, fasilitas, dan capaian perkembangan pada program {current?.service_name?.toLowerCase() || 'ini'}.</p>
                        </div>
                    </SlideUp>
                    <SlideUp delay={4}>
                        <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-7.5 lg:pt-7.5 pt-5">
                            <ul className="flex lg:gap-y-7.5 gap-y-5 flex-col">
                                <li className="flex items-center gap-[15px] text-[#686868]"><i className="text-secondary-foreground"> <FaAnglesRight /> </i> <span>Rentang Usia: {current?.age_range || '-'}</span> </li>
                                <li className="flex items-center gap-[15px] text-[#686868]"><i className="text-secondary-foreground"> <FaAnglesRight /> </i> <span>Jadwal: {current?.schedule || '-'}</span> </li>
                                <li className="flex items-center gap-[15px] text-[#686868]"><i className="text-secondary-foreground"> <FaAnglesRight /> </i> <span>Kurikulum: {(current?.curriculum || []).join(', ')}</span> </li>
                                <li className="flex items-center gap-[15px] text-[#686868]"><i className="text-secondary-foreground"> <FaAnglesRight /> </i> <span>Kegiatan: {(current?.activities || []).join(', ')}</span> </li>
                            </ul>
                            <div>
                                <Image src={'/images/services/service-details-5.png'} width={625} height={288} alt="service-details-5" />
                            </div>
                        </div>
                    </SlideUp>
                    <SlideUp delay={5}>
                        <div className="grid lg:grid-cols-2 grid-cols-1 items-start gap-7.5 lg:pt-7.5 pt-5">
                            <div>
                                <h5 className="text-xl font-semibold">Fasilitas</h5>
                                <ul className="list-disc pl-5 mt-2 text-[#686868]">
                                    {(current?.facilities || []).map((f,i) => <li key={i}>{f}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-xl font-semibold">Capaian Perkembangan</h5>
                                <ul className="list-disc pl-5 mt-2 text-[#686868]">
                                    {(current?.outcomes || []).map((o,i) => <li key={i}>{o}</li>)}
                                </ul>
                            </div>
                        </div>
                    </SlideUp>
                </div>
            </div>
        </section>
    )
}

export default ServiceArtical