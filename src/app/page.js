import React from 'react'
import AboutOne from '@/components/sections/abouts/aboutOne'
import HeaderOne from '@/components/sections/headers/headerOne'
import HeroOne from '@/components/sections/heros/heroOne'
import SuccessProjectOne from '@/components/sections/successProjects/successProjectOne'
import Gallery from '@/components/sections/gallery/gallery'
import Programs from '@/components/sections/programs'
import FaqComp from '@/components/sections/faqComp'
import NewsletterOne from '@/components/sections/newsletters/newsletterOne'
import FooterTwo from '@/components/sections/footers/footerTwo'

export const metadata = {
  title: "Beranda | TK, KB, dan Daycare Al-Fattah",
  description: "Selamat datang di TK, KB, dan Daycare Al-Fattah. Layanan Kelompok Bermain, Taman Kanak-Kanak, dan Penitipan Anak di bawah Yayasan Wira Mahardhika Wicaksana.",
  alternates: {
    canonical: "/",
  },
};

const siteUrl = process.env.SITE_URL || "https://tkalfattah.sch.id";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: "TK, KB, dan Daycare Al-Fattah",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/images/banner/1.png`,
  description:
    "Layanan Kelompok Bermain, Taman Kanak-Kanak, dan Daycare Al-Fattah.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
  },
  sameAs: [],
};

const Home = () => {
  return (
    <>
    <HeaderOne/>
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <HeroOne />
        <SuccessProjectOne/>
        <AboutOne isAboutpage={false}/>
        <Programs/>
        <Gallery/>
        <FaqComp/>
        <NewsletterOne/>
      </main>
      <FooterTwo/>
    </>
  )
}

export default Home