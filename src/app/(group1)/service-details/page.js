import React, { Suspense } from 'react'
import ServiceArtical from '@/components/sections/services/serviceArtical'

export const metadata = {
    title: "Detail Layanan | TK, KB, dan Daycare Al-Fattah",
    description: "Penjelasan rinci layanan Kelompok Bermain, Taman Kanak-Kanak, dan Daycare di Al-Fattah.",
};

const ServiceDetails = () => {
    return (
        <main>
            <Suspense fallback={<div />}> 
                <ServiceArtical />
            </Suspense>
        </main>
    )
}

export default ServiceDetails