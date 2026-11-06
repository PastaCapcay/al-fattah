import React from 'react'
import PPDBHeader from '@/components/sections/headers/ppdbHeader'

export const metadata = {
  title: "Portal PPDB Online | TK, KB, dan Daycare Al-Fattah",
  description: "Pendaftaran Peserta Didik Baru (PPDB) Online TK, KB, dan Daycare Al-Fattah.",
}

export default function PPDBLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-nunito">
      {/* Top Header Dinamis */}
      <PPDBHeader />

      {/* Main Content Area */}
      <main className="flex-1 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <div className="container">
          <p>© {new Date().getFullYear()} TK, KB, dan Daycare Al-Fattah — Yayasan Wira Mahardhika Wicaksana</p>
        </div>
      </footer>
    </div>
  )
}
