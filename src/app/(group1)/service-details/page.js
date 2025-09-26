import React, { Suspense } from 'react'
import ServiceArtical from '@/components/sections/services/serviceArtical'

export const metadata = {
    title: "Detail Layanan | TK, KB, dan Daycare Al-Fattah",
    description: "Penjelasan rinci layanan Kelompok Bermain, Taman Kanak-Kanak, dan Daycare di Al-Fattah.",
    alternates: {
        canonical: "/service-details",
    },
};

const siteUrl = process.env.SITE_URL || "https://tkalfattah.sch.id";

const ServiceDetails = () => {
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Layanan", item: `${siteUrl}/services` },
            { "@type": "ListItem", position: 3, name: "Detail Layanan", item: `${siteUrl}/service-details` },
        ],
    };
    return (
        <main>
            <Suspense fallback={<div />}> 
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            </Suspense>
            <Suspense fallback={<div />}><ServiceArtical /></Suspense>
        </main>
    )
}

export default ServiceDetails