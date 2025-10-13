"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
// import { FaMapMarkerAlt, FaUser, FaPhone, FaChild, FaGraduationCap, FaEnvelope, FaBriefcase, FaHeart, FaUsers } from 'react-icons/fa'

import Input from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SectionName from '@/components/ui/sectionName'
import Title from '@/components/ui/title'

const ContactForm = () => {
    // Data Anak
    const [namaLengkapAnak, setNamaLengkapAnak] = useState("")
    const [namaPanggilan, setNamaPanggilan] = useState("")
    const [jenisKelamin, setJenisKelamin] = useState("")
    const [tempatLahir, setTempatLahir] = useState("")
    const [tanggalLahir, setTanggalLahir] = useState("")
    const [usia, setUsia] = useState("")
    const [alamatAnak, setAlamatAnak] = useState("")
    const [agama, setAgama] = useState("Islam")
    const [anakKe, setAnakKe] = useState("")
    const [totalSaudara, setTotalSaudara] = useState("")
    const [golonganDarah, setGolonganDarah] = useState("")
    const [riwayatKesehatan, setRiwayatKesehatan] = useState("")
    
    // Data Orang Tua/Wali
    const [namaAyah, setNamaAyah] = useState("")
    const [pekerjaanAyah, setPekerjaanAyah] = useState("")
    const [namaIbu, setNamaIbu] = useState("")
    const [pekerjaanIbu, setPekerjaanIbu] = useState("")
    const [wa, setWa] = useState("")
    const [email, setEmail] = useState("")
    const [alamatOrangTua, setAlamatOrangTua] = useState("")
    const [waliAnak, setWaliAnak] = useState("")
    
    // Program
    const [program, setProgram] = useState("KB")
    
    // Modal state
    const [showModal, setShowModal] = useState(false)
    const [modalData, setModalData] = useState("")

    // Fungsi untuk menghitung usia berdasarkan tanggal hari ini
    const calculateAge = (birthDate) => {
        if (!birthDate) return ""
        const birth = new Date(birthDate)
        const today = new Date()
        const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth())
        const years = Math.floor(ageInMonths / 12)
        const months = ageInMonths % 12
        if (years > 0) {
            return months > 0 ? `${years} tahun ${months} bulan` : `${years} tahun`
        } else {
            return `${months} bulan`
        }
    }

    // Update usia ketika tanggal lahir berubah
    useEffect(() => {
        if (tanggalLahir) {
            setUsia(calculateAge(tanggalLahir))
        }
    }, [tanggalLahir])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Validasi field required
        if (!namaLengkapAnak || !jenisKelamin || !tempatLahir || !tanggalLahir || !alamatAnak || !namaAyah || !namaIbu || !wa) {
            setModalData('Mohon lengkapi semua field yang wajib diisi (bertanda *)')
            setShowModal(true)
            return
        }
        
        // Normalisasi nomor WA
        const onlyDigits = wa.replace(/\D/g, '')
        const tujuan = '+6281298465771'
        const phone = onlyDigits.startsWith('62') ? onlyDigits : (onlyDigits.startsWith('0') ? '62' + onlyDigits.slice(1) : '62' + onlyDigits)
        
        // Format pesan untuk preview
        const lines = [
            '🧒 PENDAFTARAN PROGRAM AL-FATTAH 🧒',
            '',
            '📋 DATA ANAK:',
            `Nama Lengkap: ${namaLengkapAnak}`,
            namaPanggilan ? `Nama Panggilan: ${namaPanggilan}` : null,
            jenisKelamin ? `Jenis Kelamin: ${jenisKelamin}` : null,
            tempatLahir && tanggalLahir ? `Tempat, Tgl Lahir: ${tempatLahir}, ${new Date(tanggalLahir).toLocaleDateString('id-ID')}` : null,
            usia ? `Usia saat ini: ${usia}` : null,
            alamatAnak ? `Alamat: ${alamatAnak}` : null,
            agama ? `Agama: ${agama}` : null,
            anakKe && totalSaudara ? `Anak ke-${anakKe} dari ${totalSaudara} bersaudara` : null,
            golonganDarah ? `Golongan Darah: ${golonganDarah}` : null,
            riwayatKesehatan ? `Riwayat Kesehatan: ${riwayatKesehatan}` : null,
            '',
            '👨‍👩‍👧 DATA ORANG TUA/WALI:',
            `Nama Ayah: ${namaAyah}`,
            pekerjaanAyah ? `Pekerjaan Ayah: ${pekerjaanAyah}` : null,
            `Nama Ibu: ${namaIbu}`,
            pekerjaanIbu ? `Pekerjaan Ibu: ${pekerjaanIbu}` : null,
            `No. HP (WA): ${phone}`,
            email ? `Email: ${email}` : null,
            alamatOrangTua ? `Alamat: ${alamatOrangTua}` : null,
            waliAnak ? `Wali Anak: ${waliAnak}` : null,
            '',
            '🎓 PROGRAM:',
            `Program: ${program}`,
        ].filter(Boolean)
        
        // Tampilkan modal konfirmasi
        setModalData(lines.join('\n'))
        setShowModal(true)
    }

    const handleConfirmSubmit = () => {
        // Normalisasi nomor WA
        const onlyDigits = wa.replace(/\D/g, '')
        const tujuan = '+6281298465771'
        const phone = onlyDigits.startsWith('62') ? onlyDigits : (onlyDigits.startsWith('0') ? '62' + onlyDigits.slice(1) : '62' + onlyDigits)
        
        // Format pesan untuk WhatsApp
        const lines = [
            '🧒 PENDAFTARAN PROGRAM AL-FATTAH 🧒',
            '',
            '📋 DATA ANAK:',
            `Nama Lengkap: ${namaLengkapAnak}`,
            namaPanggilan ? `Nama Panggilan: ${namaPanggilan}` : null,
            jenisKelamin ? `Jenis Kelamin: ${jenisKelamin}` : null,
            tempatLahir && tanggalLahir ? `Tempat, Tgl Lahir: ${tempatLahir}, ${new Date(tanggalLahir).toLocaleDateString('id-ID')}` : null,
            usia ? `Usia saat ini: ${usia}` : null,
            alamatAnak ? `Alamat: ${alamatAnak}` : null,
            agama ? `Agama: ${agama}` : null,
            anakKe && totalSaudara ? `Anak ke-${anakKe} dari ${totalSaudara} bersaudara` : null,
            golonganDarah ? `Golongan Darah: ${golonganDarah}` : null,
            riwayatKesehatan ? `Riwayat Kesehatan: ${riwayatKesehatan}` : null,
            '',
            '👨‍👩‍👧 DATA ORANG TUA/WALI:',
            `Nama Ayah: ${namaAyah}`,
            pekerjaanAyah ? `Pekerjaan Ayah: ${pekerjaanAyah}` : null,
            `Nama Ibu: ${namaIbu}`,
            pekerjaanIbu ? `Pekerjaan Ibu: ${pekerjaanIbu}` : null,
            `No. HP (WA): ${phone}`,
            email ? `Email: ${email}` : null,
            alamatOrangTua ? `Alamat: ${alamatOrangTua}` : null,
            waliAnak ? `Wali Anak: ${waliAnak}` : null,
            '',
            '🎓 PROGRAM:',
            `Program: ${program}`,
        ].filter(Boolean)
        
        const text = encodeURIComponent(lines.join('\n'))
        const url = `https://api.whatsapp.com/send?phone=${tujuan}&text=${text}`
        window.location.assign(url)
    }

    const handleDownloadPDF = async () => {
        // Normalisasi nomor WA
        const onlyDigits = wa.replace(/\D/g, '')
        const phone = onlyDigits.startsWith('62') ? onlyDigits : (onlyDigits.startsWith('0') ? '62' + onlyDigits.slice(1) : '62' + onlyDigits)

        // Buat PDF baru
        const doc = new jsPDF()
        
        // Warna tema
        const primaryColor = [41, 128, 185] // Biru
        const secondaryColor = [52, 152, 219] // Biru muda
        const accentColor = [46, 204, 113] // Hijau
        const textColor = [44, 62, 80] // Abu-abu gelap
        const lightGray = [236, 240, 241] // Abu-abu terang
        
        // Header dengan background
        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.rect(0, 0, 210, 50, 'F')

        // Load dan tampilkan logo YAYASAN.png
        try {
            const logoResponse = await fetch('/images/logos/YAYASAN.png')
            const logoBlob = await logoResponse.blob()
            const logoUrl = URL.createObjectURL(logoBlob)
            
            // Tambahkan logo ke PDF dengan ukuran persegi
            doc.addImage(logoUrl, 'PNG', 15, 10, 25, 25)
            
            // Cleanup URL
            URL.revokeObjectURL(logoUrl)
        } catch (error) {
            // Fallback jika logo tidak bisa dimuat
            doc.setFillColor(255, 255, 255)
            doc.circle(30, 25, 8, 'F')
            doc.setFontSize(8)
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
            doc.text('LOGO', 30, 28, { align: 'center' })
        }
        
        // Judul utama
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(18)
        doc.setFont('helvetica', 'bold')
        doc.text('FORMULIR PENDAFTARAN', 105, 20, { align: 'center' })
        
        doc.setFontSize(14)
        doc.setFont('helvetica', 'normal')
        doc.text('TK, KB, DAN DAYCARE AL-FATTAH', 105, 28, { align: 'center' })
        doc.text('YAYASAN WIRA MAHARDHIKA WICAKSANA', 105, 35, { align: 'center' })
        
        // Garis pemisah dengan warna
        doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
        doc.setLineWidth(2)
        doc.line(20, 55, 190, 55)
        
        let yPosition = 70
        
        // A. DATA ANAK dengan background
        doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
        doc.rect(15, yPosition - 5, 180, 8, 'F')

        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('A. DATA ANAK', 20, yPosition)
        yPosition += 15
        
        // Area untuk tempel foto 3x4 di sebelah kanan
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.setLineWidth(1)
        doc.rect(150, yPosition, 30, 40) // 3x4 cm area di sebelah kanan
        
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold')
        doc.text('PASFOTO', 165, yPosition + 15, { align: 'center' })
        doc.text('3x4', 165, yPosition + 20, { align: 'center' })
               
        // Data anak dalam format yang lebih clean
        const dataAnak = [
            ['Nama Lengkap Anak', namaLengkapAnak || '-'],
            ['Nama Panggilan', namaPanggilan || '-'],
            ['Jenis Kelamin', jenisKelamin || '-'],
            ['Tempat, Tgl Lahir', `${tempatLahir || '-'}, ${tanggalLahir ? new Date(tanggalLahir).toLocaleDateString('id-ID') : '-'}`],
            ['Usia saat ini', usia || '-'],
            ['Alamat Lengkap', alamatAnak || '-'],
            ['Agama', agama || '-'],
            ['Anak ke-berapa', `${anakKe || '-'} dari ${totalSaudara || '-'} bersaudara`],
            ['Golongan Darah', golonganDarah || '-'],
            ['Riwayat Kesehatan', riwayatKesehatan || '-']
        ]
        
        autoTable(doc, {
            startY: yPosition,
            body: dataAnak,
            theme: 'plain',
            bodyStyles: {
                textColor: textColor,
                fontSize: 10,
                cellPadding: 3
            },
            columnStyles: {
                0: { cellWidth: 60, fontStyle: 'bold' },
                1: { cellWidth: 100 }
            },
            margin: { left: 20, right: 20 }
        })
        
        yPosition = doc.lastAutoTable.finalY + 15
        
        // B. DATA ORANG TUA/WALI
        doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
        doc.rect(15, yPosition - 5, 180, 8, 'F')
        
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('B. DATA ORANG TUA/WALI', 20, yPosition)
        yPosition += 15
        
        const dataOrangTua = [
            ['Nama Ayah', namaAyah || '-'],
            ['Pekerjaan Ayah', pekerjaanAyah || '-'],
            ['Nama Ibu', namaIbu || '-'],
            ['Pekerjaan Ibu', pekerjaanIbu || '-'],
            ['No. HP (WA)', phone || '-'],
            ['Email', email || '-'],
            ['Alamat Tempat Tinggal', alamatOrangTua || '-'],
            ['Wali Anak', waliAnak || '-']
        ]
        
        autoTable(doc, {
            startY: yPosition,
            body: dataOrangTua,
            theme: 'plain',
            bodyStyles: {
                textColor: textColor,
                fontSize: 10,
                cellPadding: 3
            },
            columnStyles: {
                0: { cellWidth: 60, fontStyle: 'bold' },
                1: { cellWidth: 100 }
            },
            margin: { left: 20, right: 20 }
        })
        
        yPosition = doc.lastAutoTable.finalY + 15
        
        // C. PROGRAM
        doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
        doc.rect(15, yPosition - 5, 180, 8, 'F')
        
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('C. PROGRAM', 20, yPosition)
        yPosition += 15
        
        const dataProgram = [
            ['Program', program || '-']
        ]
        
        autoTable(doc, {
            startY: yPosition,
            body: dataProgram,
            theme: 'plain',
            bodyStyles: {
                textColor: textColor,
                fontSize: 10,
                cellPadding: 3
            },
            columnStyles: {
                0: { cellWidth: 60, fontStyle: 'bold' },
                1: { cellWidth: 100 }
            },
            margin: { left: 20, right: 20 }
        })
        
        yPosition = doc.lastAutoTable.finalY + 20
        
        // D. DOKUMEN YANG HARUS DISERAHKAN
        doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
        doc.rect(15, yPosition - 5, 180, 8, 'F')

        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('D. DOKUMEN YANG HARUS DISERAHKAN', 20, yPosition)
        yPosition += 15

        // Instruksi dokumen yang lebih detail
        doc.setTextColor(textColor[0], textColor[1], textColor[2])
        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        
        const dokumenList = [
            '1. Pasfoto 3x4 sebanyak 4 lembar ',
            '2. Fotocopy Kartu Keluarga (KK) 2 lembar yang masih berlaku',
            '3. Fotocopy KTP Ayah dan Ibu masing-masing 2 lembar',
            '4. Fotocopy Akta Kelahiran Anak 2 lembar'
        ]
        
        dokumenList.forEach((item, index) => {
            doc.text(item, 20, yPosition)
            yPosition += 5
        })
        
        yPosition += 10
        
        // Instruksi tambahan
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.text('CATATAN PENTING:', 20, yPosition)
        yPosition += 8
        
        doc.setFontSize(8)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(textColor[0], textColor[1], textColor[2])
        const catatanList = [
            '• Semua fotocopy harus jelas dan terbaca',
            '• Pasfoto harus sesuai dengan kondisi anak saat ini',
            '• Dokumen harus lengkap sebelum proses pendaftaran',
            '• Formulir ini harus dicetak dan dibawa ke sekolah',
            '• Datang ke sekolah dengan membawa semua dokumen asli untuk verifikasi'
        ]
        
        catatanList.forEach((item, index) => {
            doc.text(item, 20, yPosition)
            yPosition += 4
        })
        
        yPosition += 10
        
        // Footer dengan kotak tanggal dan waktu
        doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
        doc.rect(15, yPosition - 5, 180, 20, 'F')

        // Kotak tanggal pendaftaran
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.setLineWidth(1)
        doc.rect(20, yPosition, 80, 12)
        
        doc.setTextColor(textColor[0], textColor[1], textColor[2])
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text('Tanggal Pendaftaran:', 25, yPosition + 8)
        
        // Kotak waktu pengisian
        doc.rect(110, yPosition, 80, 12)
        doc.text('Waktu Pengisian:', 115, yPosition + 8)
        
        // Isi kotak dengan tanggal dan waktu
        doc.setFontSize(8)
        doc.setFont('helvetica', 'normal')
        doc.text(`${new Date().toLocaleDateString('id-ID')}`, 25, yPosition + 11)
        doc.text(`${new Date().toLocaleTimeString('id-ID')}`, 115, yPosition + 11)
        
        // Download PDF
        const fileName = `Form_Pendaftaran_${namaLengkapAnak.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
        doc.save(fileName)
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
                                        <h6 className="text-xl font-bold text-cream-foreground mt-[5px] leading-[130%]">Proyek Selesai</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="flex lg:justify-end justify-center">
                                <Image src={'/images/contact/contact-1.png'} width={539} height={464} alt="img" />
                            </div>
                        </div>
                        <div>
                            <div className="bg-background shadow-[0px_5px_60px_0px_rgba(0,0,0,0.05)] rounded-[10px] lg:p-10 p-5">
                                <div className="sticky top-0 bg-background z-10 pb-4">
                                <h3 className="text-[28px] font-bold leading-[148%] font-nunito">Formulir Pendaftaran</h3>
                                </div>
                                <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                    {/* Section A: Data Anak */}
                                    <div className="mb-8">
                                        <h4 className="sticky top-0 bg-background text-xl font-bold text-primary mb-4 py-2 flex items-center gap-2 z-10">
                                            🧒 A. Data Anak
                                        </h4>
                                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-7.5">
                                        <div className="relative">
                                                <label htmlFor="namaLengkapAnak" className="block mb-2 font-semibold">Nama Lengkap Anak *</label>
                                                <Input required type="text" value={namaLengkapAnak} onChange={(e)=>setNamaLengkapAnak(e.target.value)} placeholder="Sesuai akta lahir" id="namaLengkapAnak" className="text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                            <span className="absolute right-5 top-[58px]">👤</span>
                                        </div>
                                        <div className="relative">
                                                <label htmlFor="namaPanggilan" className="block mb-2 font-semibold">Nama Panggilan</label>
                                                <Input type="text" value={namaPanggilan} onChange={(e)=>setNamaPanggilan(e.target.value)} placeholder="Nama panggilan" id="namaPanggilan" className="text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                                <span className="absolute right-5 top-[58px]">👶</span>
                                        </div>
                                        <div className="relative">
                                                <label htmlFor="jenisKelamin" className="block mb-2 font-semibold">Jenis Kelamin *</label>
                                                <select required id="jenisKelamin" value={jenisKelamin} onChange={(e)=>setJenisKelamin(e.target.value)} className="w-full text-[#686868] border-[#F2F2F2] lg:py-[15px] px-5 rounded-[10px] outline-none">
                                                    <option value="">Pilih Jenis Kelamin</option>
                                                    <option value="L">Laki-laki</option>
                                                    <option value="P">Perempuan</option>
                                                </select>
                                            </div>
                                            <div className="relative">
                                                <label htmlFor="tempatLahir" className="block mb-2 font-semibold">Tempat Lahir *</label>
                                                <Input required type="text" value={tempatLahir} onChange={(e)=>setTempatLahir(e.target.value)} placeholder="Contoh: Sleman" id="tempatLahir" className="text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                                <span className="absolute right-5 top-[58px]">📍</span>
                                            </div>
                                            <div className="relative">
                                                <label htmlFor="tanggalLahir" className="block mb-2 font-semibold">Tanggal Lahir *</label>
                                                <Input required type="date" value={tanggalLahir} onChange={(e)=>setTanggalLahir(e.target.value)} id="tanggalLahir" className="text-[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                            </div>
                                            <div className="relative">
                                                <label htmlFor="usia" className="block mb-2 font-semibold">Usia saat ini</label>
                                                <Input type="text" value={usia} readOnly placeholder="Otomatis dari tanggal lahir" id="usia" className="text-[#686868] bg-gray-50 border-[#F2F2F2] lg:py-[15px] px-5" />
                                            </div>
                                            <div className="sm:col-span-2 relative">
                                                <label htmlFor="alamatAnak" className="block mb-2 font-semibold">Alamat Lengkap *</label>
                                                <Input required type="text" value={alamatAnak} onChange={(e)=>setAlamatAnak(e.target.value)} placeholder="Termasuk RT/RW" id="alamatAnak" className="text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                                <span className="absolute right-5 top-[58px]">📍</span>
                                            </div>
                                            <div className="relative">
                                                <label htmlFor="agama" className="block mb-2 font-semibold">Agama</label>
                                                <select id="agama" value={agama} onChange={(e)=>setAgama(e.target.value)} className="w-full text-[#686868] border-[#F2F2F2] lg:py-[15px] px-5 rounded-[10px] outline-none">
                                                    <option value="Islam">Islam</option>
                                                    <option value="Kristen">Kristen</option>
                                                    <option value="Katolik">Katolik</option>
                                                    <option value="Hindu">Hindu</option>
                                                    <option value="Buddha">Buddha</option>
                                                    <option value="Konghucu">Konghucu</option>
                                                </select>
                                            </div>
                                               <div className="relative">
                                                       <label htmlFor="anakKe" className="block mb-2 font-semibold">Anak ke-berapa</label>
                                                       <Input type="number" min="1" value={anakKe} onChange={(e)=>setAnakKe(e.target.value)} placeholder="1" id="anakKe" className="text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                               </div>
                                               <div className="relative">
                                                       <label htmlFor="totalSaudara" className="block mb-2 font-semibold">Dari ... bersaudara</label>
                                                       <Input type="number" min="1" value={totalSaudara} onChange={(e)=>setTotalSaudara(e.target.value)} placeholder="2" id="totalSaudara" className="text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                               </div>
                                            <div className="relative">
                                                <label htmlFor="golonganDarah" className="block mb-2 font-semibold">Golongan Darah</label>
                                                <select id="golonganDarah" value={golonganDarah} onChange={(e)=>setGolonganDarah(e.target.value)} className="w-full text-[#686868] border-[#F2F2F2] lg:py-[15px] px-5 rounded-[10px] outline-none">
                                                    <option value="">Pilih Golongan Darah</option>
                                                    <option value="A">A</option>
                                                    <option value="B">B</option>
                                                    <option value="AB">AB</option>
                                                    <option value="O">O</option>
                                                </select>
                                            </div>
                                            <div className="sm:col-span-2 relative">
                                                <label htmlFor="riwayatKesehatan" className="block mb-2 font-semibold">Riwayat Kesehatan / Alergi</label>
                                                <textarea id="riwayatKesehatan" value={riwayatKesehatan} onChange={(e)=>setRiwayatKesehatan(e.target.value)} placeholder="Contoh: Alergi susu, asma, dll" className="w-full min-h-20 rounded-[10px] border-2 text-[#686868] border-[#F2F2F2] px-5 py-[15px] outline-none"></textarea>
                                                <span className="absolute right-5 top-[58px]">❤️</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section B: Data Orang Tua/Wali */}
                                    <div className="mb-8">
                                        <h4 className="sticky top-0 bg-background text-xl font-bold text-primary mb-4 py-2 flex items-center gap-2 z-10">
                                            👨‍👩‍👧 B. Data Orang Tua / Wali
                                        </h4>
                                        <div className="grid sm:grid-cols-2 grid-cols-1 gap-7.5">
                                            <div className="relative">
                                                <label htmlFor="namaAyah" className="block mb-2 font-semibold">Nama Ayah *</label>
                                                <Input required type="text" value={namaAyah} onChange={(e)=>setNamaAyah(e.target.value)} placeholder="Nama lengkap ayah" id="namaAyah" className="text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                                <span className="absolute right-5 top-[58px]">👤</span>
                                            </div>
                                            <div className="relative">
                                                <label htmlFor="pekerjaanAyah" className="block mb-2 font-semibold">Pekerjaan Ayah</label>
                                                <Input type="text" value={pekerjaanAyah} onChange={(e)=>setPekerjaanAyah(e.target.value)} placeholder="Pekerjaan ayah" id="pekerjaanAyah" className="text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                                <span className="absolute right-5 top-[58px]">💼</span>
                                            </div>
                                            <div className="relative">
                                                <label htmlFor="namaIbu" className="block mb-2 font-semibold">Nama Ibu *</label>
                                                <Input required type="text" value={namaIbu} onChange={(e)=>setNamaIbu(e.target.value)} placeholder="Nama lengkap ibu" id="namaIbu" className="text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                                <span className="absolute right-5 top-[58px]">👤</span>
                                            </div>
                                            <div className="relative">
                                                <label htmlFor="pekerjaanIbu" className="block mb-2 font-semibold">Pekerjaan Ibu</label>
                                                <Input type="text" value={pekerjaanIbu} onChange={(e)=>setPekerjaanIbu(e.target.value)} placeholder="Pekerjaan ibu" id="pekerjaanIbu" className="text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                                <span className="absolute right-5 top-[58px]">💼</span>
                                            </div>
                                            <div className="relative">
                                                <label htmlFor="wa" className="block mb-2 font-semibold">Nomor HP (WA Aktif) *</label>
                                                <Input required type="tel" value={wa} onChange={(e)=>setWa(e.target.value)} placeholder="08xxxx" id="wa" className="text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                                <span className="absolute right-5 top-[58px]">📞</span>
                                            </div>
                                            <div className="relative">
                                                <label htmlFor="email" className="block mb-2 font-semibold">Alamat Email</label>
                                                <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="nama@email.com" id="email" className="text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                                <span className="absolute right-5 top-[58px]">✉️</span>
                                            </div>
                                            <div className="sm:col-span-2 relative">
                                                <label htmlFor="alamatOrangTua" className="block mb-2 font-semibold">Alamat Tempat Tinggal</label>
                                                <Input type="text" value={alamatOrangTua} onChange={(e)=>setAlamatOrangTua(e.target.value)} placeholder="Jika berbeda dari alamat anak" id="alamatOrangTua" className="text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                                <span className="absolute right-5 top-[58px]">📍</span>
                                            </div>
                                            <div className="sm:col-span-2 relative">
                                                <label htmlFor="waliAnak" className="block mb-2 font-semibold">Wali Anak (jika bukan orang tua kandung)</label>
                                                <Input type="text" value={waliAnak} onChange={(e)=>setWaliAnak(e.target.value)} placeholder="Nama wali jika bukan orang tua kandung" id="waliAnak" className="text-[#686868] placeholder:[#686868] border-[#F2F2F2] lg:py-[15px] px-5" />
                                                <span className="absolute right-5 top-[58px]">👥</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section C: Program */}
                                    <div className="mb-8">
                                        <h4 className="sticky top-0 bg-background text-xl font-bold text-primary mb-4 py-2 flex items-center gap-2 z-10">
                                            🎓 C. Program
                                        </h4>
                                        <div className="relative">
                                            <label htmlFor="program" className="block mb-2 font-semibold">Pilih Program *</label>
                                            <div className="relative">
                                                <select required id="program" value={program} onChange={(e)=>setProgram(e.target.value)} className="w-full text-[#686868] border-[#F2F2F2] lg:py-[15px] px-5 rounded-[10px] outline-none">
                                                    <option value="KB">KB (Kelompok Bermain)</option>
                                                    <option value="TK">TK (Taman Kanak-Kanak)</option>
                                                    <option value="Daycare">Daycare (Penitipan Anak)</option>
                                                </select>
                                                <span className="absolute right-5 top-1/2 -translate-y-1/2">🎓</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sticky bottom-0 bg-background pt-4 border-t border-gray-200">
                                        <Button type="submit" variant="pill" className="w-full bg-primary border-primary hover:text-primary-foreground">Kirim via WhatsApp</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Modal Konfirmasi */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900">Konfirmasi Data Pendaftaran</h3>
                            <p className="text-gray-600 mt-1">Periksa kembali data yang akan dikirim ke WhatsApp</p>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-lg">
                                {modalData}
                            </pre>
                        </div>
                        <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
                            <Button 
                                onClick={() => setShowModal(false)}
                                variant="outline"
                                className="px-6"
                            >
                                Batal
                            </Button>
                            <Button 
                                onClick={handleDownloadPDF}
                                variant="outline"
                                className="px-6 border-blue-500 text-blue-600 hover:bg-blue-50"
                            >
                                📄 Unduh Form
                            </Button>
                            <Button 
                                onClick={handleConfirmSubmit}
                                className="px-6 bg-green-600 hover:bg-green-700"
                            >
                                📱 Kirim ke WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default ContactForm