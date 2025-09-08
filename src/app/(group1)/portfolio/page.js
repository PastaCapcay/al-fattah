import React from 'react'
import NewsletterOne from '@/components/sections/newsletters/newsletterOne'
import Gallery from '@/components/sections/gallery/gallery'

export const metadata = {
    title: "Galeri Kegiatan | TK, KB, dan Daycare Al-Fattah",
    description: "Dokumentasi foto dan galeri kegiatan anak di TK, KB, dan Daycare Al-Fattah.",
};

const Portfolio = () => {
    return (
        <main>
            <Gallery />
            <div className='lg:pb-15 pt-10'></div>
            <NewsletterOne />
        </main>
    )
}

export default Portfolio