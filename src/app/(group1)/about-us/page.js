import React from 'react'
import AboutOne from '@/components/sections/abouts/aboutOne'
import Image from 'next/image'

export const metadata = {
    title: "Tentang Kami | TK, KB, dan Daycare Al-Fattah",
    description: "Profil lembaga dan Yayasan Wira Mahardhika Wicaksana, visi, misi, dan layanan Al-Fattah.",
    alternates: {
        canonical: "/about-us",
    },
};

const siteUrl = process.env.SITE_URL || "https://tkalfattah.sch.id";

const AboutUs = () => {
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Tentang Kami", item: `${siteUrl}/about-us` },
        ],
    };
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <AboutOne gridClass={"lg:grid-cols-2"} isAboutpage={true} />
            <section className="lg:pt-15 pt-10 lg:pb-15 pb-10">
                <div className="container">
                    <div className="text-center max-w-[760px] mx-auto">
                        <h3 className="text-2xl font-semibold">Identitas & Afiliasi</h3>
                        <p className="mt-3 text-[#686868]">Al-Fattah berada di bawah Yayasan Wira Mahardhika Wicaksana dan menaungi tiga unit layanan pendidikan.</p>
                    </div>
                    <div className="mt-7.5 grid sm:grid-cols-4 grid-cols-2 gap-6 items-center justify-items-center">
                        <div className="text-center">
                            <Image src={'/images/logos/YAYASAN.png'} width={80} height={80} alt="Logo Yayasan" className="object-contain h-12 w-auto mx-auto" />
                            <p className="mt-2 text-sm">Yayasan</p>
                        </div>
                        <div className="text-center">
                            <Image src={'/images/logos/KB.png'} width={80} height={80} alt="Logo KB" className="object-contain h-12 w-auto mx-auto" />
                            <p className="mt-2 text-sm">Kelompok Bermain</p>
                        </div>
                        <div className="text-center">
                            <Image src={'/images/logos/TK.png'} width={80} height={80} alt="Logo TK" className="object-contain h-12 w-auto mx-auto" />
                            <p className="mt-2 text-sm">Taman Kanak-Kanak</p>
                        </div>
                        <div className="text-center">
                            <Image src={'/images/logos/DAYCARE.png'} width={80} height={80} alt="Logo Daycare" className="object-contain h-12 w-auto mx-auto" />
                            <p className="mt-2 text-sm">Daycare</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="lg:pt-15 pt-10 lg:pb-15 pb-10">
                <div className="container">
                    <div className="max-w-[900px] mx-auto">
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold">Profil Sekolah</h3>
                        </div>
                        <div className="mt-6 space-y-8 text-[#686868]">
                            <div>
                                <h4 className="text-xl font-semibold">🌸 Tentang Kami</h4>
                                <p className="mt-3">TK, Kelompok Bermain, dan Daycare Al-Fattah hadir sebagai lembaga pendidikan dan pengasuhan anak usia dini di bawah naungan Yayasan Wira Mahardhika Wicaksana. Berlokasi strategis di Perum Grand Cikarang City (GCC) – Sakura Cinity, Blok F7 No. 36 dan Blok F19 No. 36, Desa Karang Raharja, Kecamatan Cikarang Utara, Kabupaten Bekasi, dekat Kawasan Industri MM2100 Cikarang Barat. Kami berkomitmen menjadi solusi tempat pendidikan dan pengasuhan anak dengan pendidikan Islam bagi keluarga, khususnya para pekerja industri.</p>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold">🌟 Keunggulan</h4>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li>Berbasis nilai Islami (doa, hafalan surat pendek, adab sehari-hari)</li>
                                    <li>Menekankan kemandirian & pembentukan karakter</li>
                                    <li>Sosialisasi positif dengan teman sebaya</li>
                                    <li>Fasilitas aman & nyaman</li>
                                    <li>Lokasi strategis dekat kawasan industri</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold">🧒 Unit Layanan</h4>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li><span className="font-medium">Kelompok Bermain (usia 2–4 tahun)</span>: stimulasi dini, bermain sambil belajar dengan metode fun learning</li>
                                    <li><span className="font-medium">TK (usia 4–6 tahun)</span>: pendidikan karakter, kreatif, dan Islami</li>
                                    <li><span className="font-medium">Daycare (usia 1–6 tahun)</span>: pengasuhan penuh kasih sayang, aman untuk anak orang tua pekerja</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold">🎯 Visi</h4>
                                <p className="mt-3">Mencetak generasi muslim yang mandiri, berkarakter, serta mampu bersosialisasi dengan baik melalui pengasuhan dan pendidikan Islami.</p>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold">🕌 Misi</h4>
                                <ol className="list-decimal pl-6 mt-3 space-y-2">
                                    <li>Menyelenggarakan pendidikan anak usia dini dengan menitikberatkan pada pembentukan karakter islami.</li>
                                    <li>Mengembangkan kemandirian anak sejak dini melalui pembiasaan sehari-hari.</li>
                                    <li>Membimbing anak bersosialisasi secara positif dalam suasana islami.</li>
                                    <li>Menyediakan daycare yang aman, nyaman, dan mendukung kebutuhan orang tua pekerja.</li>
                                    <li>Menanamkan dasar aqidah, akhlak, dan ibadah sejak usia dini.</li>
                                </ol>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold">🌟 Keunggulan Kami</h4>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li><span className="font-medium">Islami & Berkarakter</span>: membiasakan doa, ibadah, hafalan, dan akhlak mulia.</li>
                                    <li><span className="font-medium">Kemandirian & Percaya Diri</span>: melatih anak bertanggung jawab, berani, dan mandiri.</li>
                                    <li><span className="font-medium">Sosialisasi Sehat</span>: mengajarkan kerjasama, berbagi, dan saling menghargai.</li>
                                    <li><span className="font-medium">Lingkungan Aman & Nyaman</span>: ruang bermain dan belajar yang ramah anak.</li>
                                    <li><span className="font-medium">Dekat Kawasan Industri</span>: memudahkan akses bagi orang tua pekerja.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AboutUs