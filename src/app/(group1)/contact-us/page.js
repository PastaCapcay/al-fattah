import React from 'react'
import ContactAddress from '@/components/sections/contact/contactAddress'
import GoogleMap from '@/components/sections/contact/googleMap'
import Link from 'next/link'

export const metadata = {
    title: "Hubungi Kami | TK, KB, dan Daycare Al-Fattah",
    description: "Informasi kontak TK, KB, dan Daycare Al-Fattah: alamat, peta lokasi, dan formulir kontak.",
    alternates: {
        canonical: "/contact-us",
    },
};

const siteUrl = process.env.SITE_URL || "https://tkalfattah.sch.id";

const ContactUs = () => {
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Hubungi Kami", item: `${siteUrl}/contact-us` },
        ],
    };
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <ContactAddress />
            <GoogleMap />

            {/* Banner Pendaftaran Online */}
            <section className="lg:pt-15 lg:pb-15 pb-10 pt-10 bg-orange-50/50">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center">
                        <span className="inline-block bg-orange-100 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                            PPDB Online 2026/2027
                        </span>
                        <h2 className="text-3xl font-bold font-jost text-gray-900 mb-4">
                            Daftarkan Putra/Putri Anda Secara Online
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Proses pendaftaran kini dilakukan secara online melalui portal PPDB resmi Al-Fattah.
                            Buat akun, isi data, unggah dokumen, dan pantau status pendaftaran kapan saja dan di mana saja.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/ppdb"
                                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all duration-300"
                            >
                                🎓 Mulai Pendaftaran Online
                            </Link>
                            <a
                                href="https://wa.me/6281298465771?text=Halo%20Admin%20Al-Fattah%2C%20saya%20ingin%20menanyakan%20informasi%20pendaftaran"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all duration-300"
                            >
                                💬 Tanya via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ContactUs