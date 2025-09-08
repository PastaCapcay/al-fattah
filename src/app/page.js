import React from 'react'
import AboutOne from '@/components/sections/abouts/aboutOne'
import HeaderOne from '@/components/sections/headers/headerOne'
import HeroOne from '@/components/sections/heros/heroOne'
import SuccessProjectOne from '@/components/sections/successProjects/successProjectOne'
import Gallery from '@/components/sections/gallery/gallery'
import Teams from '@/components/sections/teams/teams'
import Programs from '@/components/sections/programs'
import FaqComp from '@/components/sections/faqComp'
import NewsletterOne from '@/components/sections/newsletters/newsletterOne'
import FooterTwo from '@/components/sections/footers/footerTwo'

export const metadata = {
  title: "Beranda | TK, KB, dan Daycare Al-Fattah",
  description: "Selamat datang di TK, KB, dan Daycare Al-Fattah. Layanan Kelompok Bermain, Taman Kanak-Kanak, dan Penitipan Anak di bawah Yayasan Wira Mahardhika Wicaksana.",
};

const Home = () => {
  return (
    <>
    <HeaderOne/>
      <main>
        <HeroOne />
        <SuccessProjectOne/>
        <AboutOne isAboutpage={false}/>
        <Programs/>
        <Gallery/>
        <FaqComp/>
        <Teams/>
        <NewsletterOne/>
      </main>
      <FooterTwo/>
    </>
  )
}

export default Home