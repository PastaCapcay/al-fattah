"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { FaLocationDot, FaUser, FaPhone, FaChild, FaSchool } from 'react-icons/fa6'

import Input from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SectionName from '@/components/ui/sectionName'
import Title from '@/components/ui/title'

const ContactForm = () => {
    const [parentName, setParentName] = useState("")
    const [childName, setChildName] = useState("")
    const [tanggal, setTanggal] = useState("")
    const [program, setProgram] = useState("KB")
    const [wa, setWa] = useState("")
    const [alamat, setAlamat] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        // kirim tanpa alert; asumsikan field diisi oleh pengguna
        // normalisasi nomor WA
        const onlyDigits = wa.replace(/\D/g, '')
        const tujuan = '6289625003857'
        const phone = onlyDigits.startsWith('62') ? onlyDigits : (onlyDigits.startsWith('0') ? '62' + onlyDigits.slice(1) : '62' + onlyDigits)
        const lines = [
            'Pendaftaran Program Al-Fattah',
            `Program: ${program || '-'}`,
            `Nama Orang Tua: ${parentName}`,
            `Nama Anak: ${childName}`,
            tanggal ? `Tanggal Lahir: ${tanggal}` : null,
            `No. WA: ${phone}`,
            `Alamat: ${alamat}`,
        ].filter(Boolean)
        const text = encodeURIComponent(lines.join('\n'))
        const url = `https://api.whatsapp.com/send?phone=${tujuan}&text=${text}`
        window.location.assign(url)
    }

    return (
        <section id="pendaftaran" className="lg:pt-15 lg;pb-15 pb-10 pt-10">
            <div className="container">
                <div className="max-w-[546px] mx-auto text-center">
                    <SectionName>Pendaftaran</SectionName>
                    <Title size={"3.5xl"}>Isi formulir, lalu klik kirim untuk chat via WhatsApp.</Title>
                </div>
                <div className="mt-15">
                    <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-7.5">
                        <div className="relative">
                            <div className="absolute top-1/2 -translate-y-1/2 h-full flex flex-col justify-between">
                                <div className="mt-[68px] sm:w-full w-40 animate-up-down">
                                    <Image src={'/images/contact/contact-2.png'} width={241} height={241} alt="two-girls-img" />
                                </div>
                                <div className="bg-primary px-5 py-[18px] rounded-[10px] flex items-center gap-5 mb-7.5 animate-left-right">
                                    <div>
                                        <Image src={'/images/contact/winner.svg'} width={65} height={65} alt="img" />
                                    </div>
                                    <div>
                                        <h4 className="text-[28px] font-bold text-cream-foreground leading-[148%] font-nunito">2k+</h4>
                                        <h6 className="text-xl font-bold text-cream-foreground mt-[5px] leading-[130%]">Project Completed</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="flex lg:justify-end justify-center">
                                <Image src={'/images/contact/contact-1.png'} width={539} height={464} alt="img" />
                            </div>
                        </div>
                        <div>
                            <div className="bg-background shadow-[0px_5px_60px_0px_rgba(0,0,0,0.05)] rounded-[10px] lg:p-10 p-5">
                                <h3 className="text-[28px] font-bold leading-[148%] font-nunito">Formulir Pendaftaran</h3>
                                <form onSubmit={handleSubmit} className="mt-7">
                                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-7.5">
                                        <div className="relative">
                                            <label htmlFor="parentName" className="block mb-2 font-semibold">Nama orang tua</label>
                                            <Input required type={"text"} value={parentName} onChange={(e)=>setParentName(e.target.value)} placeholder={"Nama orang tua"} id="parentName" className={"text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5"} />
                                            <span className="absolute right-5 top-[58px]"><FaUser /></span>
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="childName" className="block mb-2 font-semibold">Nama anak</label>
                                            <Input type={"text"} value={childName} onChange={(e)=>setChildName(e.target.value)} placeholder={"Nama anak"} id="childName" className={"text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5"} />
                                            <span className="absolute right-5 top-[58px]"><FaChild /></span>
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="date" className="block mb-2 font-semibold">Tanggal lahir</label>
                                            <Input type={"date"} value={tanggal} onChange={(e)=>setTanggal(e.target.value)} placeholder={"mm/dd/yyyy"} id="date" className={"text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5"} />
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="program" className="block mb-2 font-semibold">Layanan</label>
                                            <div className="relative">
                                                <select required id="program" value={program} onChange={(e)=>setProgram(e.target.value)} className="w-full text-[#686868] border-[#F2F2F2] lg:py-[15px] px-5 rounded-[10px] outline-none">
                                                    <option value="KB">KB</option>
                                                    <option value="TK">TK</option>
                                                    <option value="Daycare">Daycare</option>
                                                </select>
                                                <span className="absolute right-5 top-1/2 -translate-y-1/2"><FaSchool /></span>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="wa" className="block mb-2 font-semibold">Nomor WhatsApp</label>
                                            <Input required type={"tel"} value={wa} onChange={(e)=>setWa(e.target.value)} placeholder={"08xxxx"} id="wa" className={"text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5"} />
                                            <span className="absolute right-5 top-[58px]"><FaPhone /></span>
                                        </div>
                                    </div>
                                    <div className="relative mt-5">
                                        <label htmlFor="address" className="block mb-2 font-semibold">Alamat lengkap</label>
                                        <Input type={"text"} value={alamat} onChange={(e)=>setAlamat(e.target.value)} placeholder={"Alamat lengkap"} id="address" className={"text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5"} />
                                        <span className="absolute right-5 top-[58px]"> <FaLocationDot /></span>
                                    </div>
                                    <Button type="submit" variant="pill" className="w-full bg-primary border-primary hover:text-primary-foreground lg:mt-10 mt-5">Kirim via WhatsApp</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm