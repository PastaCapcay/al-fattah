"use client"
import React, { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa6'

const FloatingWhatsApp = () => {
    const [isHovered, setIsHovered] = useState(false)
    const phoneNumber = "6281298465771"
    const defaultMessage = encodeURIComponent("Halo Admin Al-Fattah, saya ingin bertanya seputar informasi program dan pendaftaran.")
    const waUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`

    return (
        <aside aria-label="Kontak Cepat WhatsApp" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
            {/* Tooltip / Label saat hover atau di desktop */}
            <div 
                className={`hidden md:flex items-center bg-white text-gray-800 text-sm font-medium py-2 px-3.5 rounded-full shadow-lg border border-gray-100 transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
                }`}
            >
                <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Chat Admin Al-Fattah
            </div>

            {/* Tombol Utama WhatsApp */}
            <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label="Hubungi kami via WhatsApp"
                className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_30px_rgba(37,211,102,0.65)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
                {/* Ping ring animation */}
                <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" style={{ animationDuration: '3s' }}></span>

                {/* WhatsApp Icon */}
                <FaWhatsapp className="text-3xl relative z-10 transition-transform duration-300 group-hover:rotate-12" />
            </a>
        </aside>
    )
}

export default FloatingWhatsApp

