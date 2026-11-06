"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaPhone, FaArrowLeft } from 'react-icons/fa6'

export default function PPDBHeader() {
  const pathname = usePathname()
  const isInsideDashboard = pathname === '/ppdb/dashboard'

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container py-3.5 flex justify-between items-center gap-3">
        {/* Branding Kiri */}
        <div className="flex items-center gap-3">
          <Link href={isInsideDashboard ? "/ppdb/dashboard" : "/"} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-orange-600 transition-colors">
              AF
            </div>
            <div>
              <h1 className="font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                Portal PPDB Online
              </h1>
              <span className="text-xs text-gray-500">TK, KB, & Daycare Al-Fattah</span>
            </div>
          </Link>
        </div>

        {/* Navigasi Kanan */}
        <div className="flex items-center gap-2.5 sm:gap-4 text-sm font-semibold">
          {/* Tombol Kembali ke Beranda Utama - Hanya tampil jika BUKAN di dalam dashboard */}
          {!isInsideDashboard && (
            <Link 
              href="/" 
              className="flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors text-xs sm:text-sm font-bold px-2.5 py-1.5 rounded-xl hover:bg-gray-100"
            >
              <FaArrowLeft className="text-xs" />
              <span>Ke Beranda Web</span>
            </Link>
          )}

          {/* Bantuan WhatsApp */}
          <a 
            href="https://wa.me/6281298465771?text=Halo%20Admin%20Al-Fattah%2C%20saya%20butuh%20bantuan%20seputar%20pendaftaran%20PPDB" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl hover:bg-emerald-100 transition-colors text-xs sm:text-sm font-bold shadow-sm"
          >
            <FaPhone className="text-xs" />
            <span className="hidden sm:inline">Bantuan WA</span>
          </a>
        </div>
      </div>
    </header>
  )
}

