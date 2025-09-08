import React from 'react'
import NewsletterTwo from '@/components/sections/newsletters/newsletterTwo'
import FaqComp from '@/components/sections/faqComp'

export const metadata = {
    title: "Pertanyaan Umum (FAQ) | TK, KB, dan Daycare Al-Fattah",
    description: "Jawaban atas pertanyaan umum seputar pendaftaran, program, dan layanan Al-Fattah.",
};

const Faq = () => {
    return (
        <main>
            <FaqComp />
            <NewsletterTwo />
        </main>
    )
}

export default Faq