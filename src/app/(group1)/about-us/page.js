import React from 'react'
import AboutOne from '@/components/sections/abouts/aboutOne'
import Image from 'next/image'

export const metadata = {
    title: "Tentang Kami | TK, KB, dan Daycare Al-Fattah",
    description: "Profil lembaga dan Yayasan Wira Mahardhika Wicaksana, visi, misi, dan layanan Al-Fattah.",
};

const AboutUs = () => {
    return (
        <main>
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
        </main>
    )
}

export default AboutUs