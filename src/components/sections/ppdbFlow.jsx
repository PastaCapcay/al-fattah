"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { 
  FaUserPlus, 
  FaFileLines, 
  FaMagnifyingGlass, 
  FaIdCard, 
  FaArrowRight, 
  FaCircleCheck, 
  FaClock, 
  FaWhatsapp,
  FaShieldHalved,
  FaFileArrowUp
} from 'react-icons/fa6'

export default function PpdbFlow() {
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    {
      id: 1,
      stepNumber: "01",
      title: "Buat Akun Wali Murid",
      shortDesc: "Daftar mandiri menggunakan email dan WhatsApp aktif dalam 1 menit.",
      icon: FaUserPlus,
      color: "from-amber-500 to-orange-500",
      accentBg: "bg-amber-50 text-amber-600 border-amber-200",
      badge: "Langkah Pertama",
      details: [
        "Akses menu Pendaftaran PPDB Online.",
        "Masukkan nama lengkap, alamat email, dan nomor WhatsApp.",
        "Konfirmasi link aktivasi akun di kotak masuk email Anda.",
        "Login instan dan akses portal dashboard pendaftaran."
      ],
      tip: "Gunakan nomor WhatsApp aktif untuk menerima update status otomatis dari panitia."
    },
    {
      id: 2,
      stepNumber: "02",
      title: "Isi Biodata & Unggah Berkas",
      shortDesc: "Lengkapi data calon peserta didik dan unggah dokumen persyaratan digital.",
      icon: FaFileArrowUp,
      color: "from-orange-500 to-rose-500",
      accentBg: "bg-orange-50 text-orange-600 border-orange-200",
      badge: "Pengisian Berkas",
      details: [
        "Pilih program: Kelompok Bermain (KB), TK A / TK B, atau Daycare.",
        "Isi data lengkap calon siswa (nama, tanggal lahir, riwayat kesehatan).",
        "Lengkapi identitas orang tua / wali (nama, pekerjaan, kontak).",
        "Unggah foto jelas berkas: Pasfoto 3x4, KK, KTP Ayah & Ibu, serta Akta Lahir."
      ],
      tip: "Format file bisa berupa foto (JPG/PNG) atau PDF dengan ukuran maksimal 5 MB per berkas."
    },
    {
      id: 3,
      stepNumber: "03",
      title: "Verifikasi & Notifikasi Online",
      shortDesc: "Panitia PPDB memeriksa kelengkapan data secara transparan dan berkala.",
      icon: FaMagnifyingGlass,
      color: "from-blue-500 to-indigo-500",
      accentBg: "bg-blue-50 text-blue-600 border-blue-200",
      badge: "Pemeriksaan Berkas",
      details: [
        "Panitia meninjau keabsahan dan kelengkapan dokumen yang diunggah.",
        "Jika ada data yang buram/kurang, status berubah menjadi 'Perlu Perbaikan' disertai catatan.",
        "Jika seluruh berkas valid, status akan diperbarui menjadi 'Diterima di Al-Fattah'.",
        "Notifikasi resmi otomatis diteruskan ke nomor WhatsApp orang tua."
      ],
      tip: "Anda dapat memantau status secara real-time kapan saja melalui Dashboard Orang Tua."
    },
    {
      id: 4,
      stepNumber: "04",
      title: "Cetak Kartu & Registrasi Ulang",
      shortDesc: "Dapatkan Kartu Tanda Peserta resmi berformat PDF untuk daftar ulang fisik.",
      icon: FaIdCard,
      color: "from-emerald-500 to-teal-500",
      accentBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      badge: "Langkah Akhir",
      details: [
        "Tombol 'Cetak Kartu Peserta' akan aktif otomatis begitu status diterima.",
        "Unduh kartu berformat PDF beresolusi tinggi dengan nomor registrasi unik.",
        "Lakukan konfirmasi jadwal observasi/trial class dan daftar ulang di sekolah.",
        "Selamat bergabung menjadi bagian dari keluarga besar Al-Fattah!"
      ],
      tip: "Simpan dan cetak kartu peserta untuk ditunjukkan saat penyerahan berkas fisik di sekolah."
    }
  ]

  const currentStepData = steps.find(s => s.id === activeStep) || steps[0]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-orange-50/60 via-white to-gray-50/50 relative overflow-hidden" id="alur-ppdb">
      {/* Decorative Ornaments */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-orange-100 text-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <FaShieldHalved className="text-sm" /> Panduan PPDB 2026/2027
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 font-jost tracking-tight leading-tight">
            Alur Pendaftaran Peserta Didik Baru
          </h2>
          <p className="text-gray-600 text-sm lg:text-base mt-3 leading-relaxed">
            Proses pendaftaran di KB, TK, dan Daycare Al-Fattah kini 100% online, transparan, dan dapat dipantau langsung dari ponsel Anda.
          </p>
        </div>

        {/* Step Navigation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {steps.map((item) => {
            const Icon = item.icon
            const isActive = activeStep === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveStep(item.id)}
                type="button"
                className={`text-left p-5 rounded-2xl transition-all duration-300 relative border group ${
                  isActive
                    ? 'bg-white border-primary shadow-xl scale-[1.02] ring-2 ring-primary/20'
                    : 'bg-white/80 hover:bg-white border-gray-200/80 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-extrabold font-mono px-2.5 py-1 rounded-lg ${
                    isActive ? 'bg-primary text-white shadow-xs' : 'bg-gray-100 text-gray-600 group-hover:bg-orange-50 group-hover:text-primary'
                  }`}>
                    LANGKAH {item.stepNumber}
                  </span>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    isActive ? 'bg-primary text-white shadow-sm' : 'bg-orange-50 text-primary group-hover:bg-primary group-hover:text-white'
                  }`}>
                    <Icon className="text-sm" />
                  </div>
                </div>

                <h3 className={`font-bold text-base transition-colors ${
                  isActive ? 'text-gray-900 font-extrabold' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.shortDesc}
                </p>

                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-primary rotate-45 hidden lg:block"></div>
                )}
              </button>
            )
          })}
        </div>

        {/* Active Step Interactive Detail Box */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl p-6 sm:p-10 mb-12">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Visual Icon & Summary */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentStepData.accentBg}`}>
                    {currentStepData.badge}
                  </span>
                  <span className="text-xs font-bold text-gray-400 font-mono">
                    Tahap {currentStepData.stepNumber} dari 04
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-gray-900 font-jost mb-3">
                  {currentStepData.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {currentStepData.shortDesc}
                </p>
              </div>

              {/* Helpful Tip Card */}
              <div className="bg-orange-50/80 border border-orange-200/70 rounded-2xl p-4 mt-auto">
                <span className="text-xs font-bold text-primary block mb-1">
                  💡 Tips untuk Orang Tua:
                </span>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {currentStepData.tip}
                </p>
              </div>
            </div>

            {/* Right Column: Step Checklist */}
            <div className="lg:col-span-7">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FaCircleCheck className="text-emerald-500" /> Rincian Aktivitas Pada Tahap Ini:
              </h4>

              <div className="space-y-3">
                {currentStepData.details.map((detail, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-gray-50/70 hover:bg-orange-50/50 transition-colors border border-gray-100"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Navigation Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100">
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={activeStep === 1}
                    onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                    className="px-4 py-2 text-xs font-bold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Langkah Sebelumnya
                  </button>
                  <button
                    type="button"
                    disabled={activeStep === 4}
                    onClick={() => setActiveStep(prev => Math.min(4, prev + 1))}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-orange-100 text-primary hover:bg-orange-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Langkah Berikutnya →
                  </button>
                </div>

                <Link
                  href="/ppdb/register"
                  className="px-5 py-2.5 bg-primary hover:bg-orange-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  Daftar Sekarang <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Persyaratan Berkas Mini Accordion */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                Persyaratan Dokumen
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-jost">
                Siapkan 5 Dokumen Digital Ini Sebelum Mendaftar
              </h4>
              <p className="text-white/90 text-xs sm:text-sm mt-1 max-w-xl">
                Cukup foto jelas menggunakan kamera HP Anda dalam format JPG, PNG, atau PDF.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span className="bg-white text-primary text-xs font-bold px-3 py-2 rounded-xl shadow-xs">
                📷 Pasfoto 3x4 Anak
              </span>
              <span className="bg-white text-primary text-xs font-bold px-3 py-2 rounded-xl shadow-xs">
                📄 Kartu Keluarga (KK)
              </span>
              <span className="bg-white text-primary text-xs font-bold px-3 py-2 rounded-xl shadow-xs">
                🪪 KTP Ayah & Ibu
              </span>
              <span className="bg-white text-primary text-xs font-bold px-3 py-2 rounded-xl shadow-xs">
                📜 Akta Kelahiran
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
