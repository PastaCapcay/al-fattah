import React from 'react'
import ContactAddress from '@/components/sections/contact/contactAddress'
import GoogleMap from '@/components/sections/contact/googleMap'
import ContactForm from '@/components/sections/contact/contactForm'

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
            <ContactForm />
        </main>
    )
}

export default ContactUs