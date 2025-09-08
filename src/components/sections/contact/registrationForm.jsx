"use client"
import React, { useState } from 'react'
import SectionName from '@/components/ui/sectionName'
import Title from '@/components/ui/title'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'

const RegistrationForm = () => {
    const [program, setProgram] = useState('KB')
    const [nama, setNama] = useState('')
    const [wa, setWa] = useState('')
    const [email, setEmail] = useState('')
    const [alamat, setAlamat] = useState('')
    const [usia, setUsia] = useState('')
    const [catatan, setCatatan] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const tujuan = '6281298465771' // nomor WhatsApp tujuan (Indonesia: 62)
        const lines = [
            'Pendaftaran Program Al-Fattah',
            `Program: ${program}`,
            `Nama Wali: ${nama}`,
            `No. WA: ${wa}`,
            email ? `Email: ${email}` : null,
            `Alamat: ${alamat}`,
            usia ? `Usia Anak: ${usia}` : null,
            catatan ? `Catatan: ${catatan}` : null,
        ].filter(Boolean)
        const text = encodeURIComponent(lines.join('\n'))
        const url = `https://wa.me/${tujuan}?text=${text}`
        window.open(url, '_blank')
    }

    return (
        <section id="pendaftaran" className="lg:pt-15 lg:pb-15 pt-10 pb-10">
            <div className="container">
                <div className="max-w-[640px] mx-auto text-center">
                    <SectionName>Pendaftaran</SectionName>
                    <Title size={"3.5xl"}>Daftar KB, TK, atau Daycare</Title>
                </div>
                <form onSubmit={handleSubmit} className="max-w-[760px] mx-auto bg-background rounded-[10px] shadow-[0px_5px_60px_0px_rgba(0,0,0,0.05)] lg:p-10 p-5 mt-10">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-7.5">
                        <div>
                            <label className="block mb-2 font-semibold">Pilih Layanan</label>
                            <select value={program} onChange={(e)=>setProgram(e.target.value)} className="w-full border-[#F2F2F2] border rounded-[10px] lg:py-[15px] px-5 outline-none">
                                <option>KB</option>
                                <option>TK</option>
                                <option>Daycare</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="nama" className="block mb-2 font-semibold">Nama Lengkap</label>
                            <Input id="nama" value={nama} onChange={(e)=>setNama(e.target.value)} placeholder={"Nama Lengkap"} className={"border-[#F2F2F2] lg:py-[15px] px-5"} />
                        </div>
                        <div>
                            <label htmlFor="wa" className="block mb-2 font-semibold">Nomor WhatsApp</label>
                            <Input id="wa" value={wa} onChange={(e)=>setWa(e.target.value)} placeholder={"08xxxxxxxxxx"} className={"border-[#F2F2F2] lg:py-[15px] px-5"} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 font-semibold">Email (opsional)</label>
                            <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder={"nama@email.com"} className={"border-[#F2F2F2] lg:py-[15px] px-5"} />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="alamat" className="block mb-2 font-semibold">Alamat Lengkap</label>
                            <Input id="alamat" value={alamat} onChange={(e)=>setAlamat(e.target.value)} placeholder={"Alamat Lengkap"} className={"border-[#F2F2F2] lg:py-[15px] px-5"} />
                        </div>
                        <div>
                            <label htmlFor="usia" className="block mb-2 font-semibold">Usia Anak (tahun)</label>
                            <Input id="usia" value={usia} onChange={(e)=>setUsia(e.target.value)} placeholder={"Contoh: 4"} className={"border-[#F2F2F2] lg:py-[15px] px-5"} />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="catatan" className="block mb-2 font-semibold">Catatan</label>
                            <textarea id="catatan" value={catatan} onChange={(e)=>setCatatan(e.target.value)} placeholder="Tulis pesan Anda di sini" className="w-full min-h-36 rounded-[10px] border-2 text-[#686868] border-[#F2F2F2] px-5 py-[15px] outline-none"></textarea>
                        </div>
                    </div>
                    <Button type="submit" variant="pill" className="w-full bg-primary border-primary hover:text-primary-foreground lg:mt-10 mt-5">Daftar Sekarang via WhatsApp</Button>
                </form>
            </div>
        </section>
    )
}

export default RegistrationForm


