import React from 'react'
import NewsletterOne from '@/components/sections/newsletters/newsletterOne'
import Gallery from '@/components/sections/gallery/gallery'

export const metadata = {
    title: "Galeri Kegiatan | TK, KB, dan Daycare Al-Fattah",
    description: "Dokumentasi foto dan galeri kegiatan anak di TK, KB, dan Daycare Al-Fattah.",
    alternates: {
        canonical: "/portfolio",
    },
};

const siteUrl = process.env.SITE_URL || "https://tkalfattah.sch.id";

const Portfolio = () => {
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Galeri Kegiatan", item: `${siteUrl}/portfolio` },
        ],
    };
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <Gallery />
            <div className='lg:pb-15 pt-10'></div>
            <NewsletterOne />
        </main>
    )
}

export default Portfolio