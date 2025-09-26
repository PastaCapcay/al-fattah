import React from 'react'
import NewsletterOne from '@/components/sections/newsletters/newsletterOne'
import FaqComp from '@/components/sections/faqComp'

export const metadata = {
    title: "Pertanyaan Umum (FAQ) | TK, KB, dan Daycare Al-Fattah",
    description: "Jawaban atas pertanyaan umum seputar pendaftaran, program, dan layanan Al-Fattah.",
    alternates: {
        canonical: "/faq",
    },
};

const siteUrl = process.env.SITE_URL || "https://tkalfattah.sch.id";

const Faq = () => {
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "FAQ", item: `${siteUrl}/faq` },
        ],
    };
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <FaqComp />
            <NewsletterOne />
        </main>
    )
}

export default Faq