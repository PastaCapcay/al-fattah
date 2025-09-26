import React from 'react'
import ServicesTwo from '@/components/sections/services/servicesTwo'

export const metadata = {
    title: "Layanan Kami | TK, KB, dan Daycare Al-Fattah",
    description: "Layanan Kelompok Bermain (KB), Taman Kanak-Kanak (TK), dan Daycare (Penitipan Anak) di Al-Fattah.",
    alternates: {
        canonical: "/services",
    },
};

const siteUrl = process.env.SITE_URL || "https://tkalfattah.sch.id";

const Services = () => {
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Layanan", item: `${siteUrl}/services` },
        ],
    };
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <ServicesTwo />
        </main>
    )
}

export default Services