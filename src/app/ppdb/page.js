import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaUserPlus, FaRightToBracket } from 'react-icons/fa6'
import PpdbFlow from '@/components/sections/ppdbFlow'

export const metadata = {
  title: "Portal PPDB Online | TK, KB, dan Daycare Al-Fattah",
  description: "Daftar sekarang di TK, KB, dan Daycare Al-Fattah secara online.",
}

export default function PPDBHomePage() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-10 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block mb-3">
            Penerimaan Peserta Didik Baru
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-jost mb-4">
            Selamat Datang di PPDB Online Al-Fattah
          </h1>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-8">
            Layanan pendaftaran mudah dan terintegrasi untuk program Kelompok Bermain (KB), Taman Kanak-Kanak (TK), dan Daycare di bawah naungan Yayasan Wira Mahardhika Wicaksana.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/ppdb/register" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
            >
              <FaUserPlus /> Buat Akun Pendaftar
            </Link>
            <Link 
              href="/ppdb/login" 
              className="w-full sm:w-auto px-8 py-4 bg-orange-600/80 hover:bg-orange-600 text-white font-bold rounded-xl border border-white/30 transition-all flex items-center justify-center gap-2"
            >
              <FaRightToBracket /> Masuk ke Akun
            </Link>
          </div>
        </div>
      </div>

      {/* Alur Pendaftaran Interaktif */}
      <PpdbFlow />
    </div>
  )
}

