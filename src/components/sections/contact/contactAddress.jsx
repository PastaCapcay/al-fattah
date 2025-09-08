import SlideUp from '@/lib/animations/slideUp'
import React from 'react'
import { FaEnvelope, FaLocationDot, FaPhone, FaClock } from 'react-icons/fa6'

const ContactAddress = () => {
    return (
        <div className="lg:pb-15 lg:pt-15 pb-10 pt-10">
            <div className="container">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7.5">
                    <SlideUp delay={2}>
                        <div className="bg-background rounded-md shadow-3xl pt-5 pb-7.5 px-7.5 text-center flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full flex justify-center items-center bg-green">
                                <span className="text-cream-foreground text-[28px]"><FaLocationDot /> </span>
                            </div>
                            <h5 className="font-bold text-xl mt-5 pb-2.5">Lokasi</h5>
                            <p>Perum Grand Cikarang City, Sakura F.7 No.36, Karangraharja, Kec. Cikarang Utara, Kab. Bekasi, Jawa Barat 17550</p>
                        </div>
                    </SlideUp>

                    <SlideUp delay={3}>
                        <div className="bg-background rounded-md shadow-3xl pt-5 pb-7.5 px-7.5 text-center flex flex-col items-center ">
                            <div className="w-16 h-16 rounded-full flex justify-center items-center bg-green">
                                <span className="text-cream-foreground text-[28px]"><FaEnvelope /> </span>
                            </div>
                            <h5 className="font-bold text-xl mt-5 pb-2.5">Email</h5>
                            <p><a href="">info@alfattah.sch.id</a></p>
                        </div>
                    </SlideUp>

                    <SlideUp delay={4}>
                        <div className="bg-background rounded-md shadow-3xl pt-5 pb-7.5 px-7.5 text-center flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full flex justify-center items-center bg-green">
                                <span className="text-cream-foreground text-[28px]"><FaPhone /> </span>
                            </div>
                            <h5 className="font-bold text-xl mt-5 pb-2.5">Kontak</h5>
                            <p><a href="">0812-9846-5771</a></p>
                        </div>
                    </SlideUp>

                    <SlideUp delay={5}>
                        <div className="bg-background rounded-md shadow-3xl pt-5 pb-7.5 px-7.5 text-center flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full flex justify-center items-center bg-green">
                                <span className="text-cream-foreground text-[28px]"><FaClock /> </span>
                            </div>
                            <h5 className="font-bold text-xl mt-5 pb-2.5">Jam Operasional</h5>
                            <div className="text-[#686868] leading-[170%]">
                                <p>Senin–Jumat: 07.00–17.00</p>
                                <p>Sabtu: Tutup</p>
                                <p>Minggu: Tutup</p>
                            </div>
                        </div>
                    </SlideUp>

                </div>
            </div>
        </div>
    )
}

export default ContactAddress