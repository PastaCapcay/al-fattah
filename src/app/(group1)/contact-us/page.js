import React from 'react'
import ContactAddress from '@/components/sections/contact/contactAddress'
import GoogleMap from '@/components/sections/contact/googleMap'
import ContactForm from '@/components/sections/contact/contactForm'

export const metadata = {
    title: "Hubungi Kami | TK, KB, dan Daycare Al-Fattah",
    description: "Informasi kontak TK, KB, dan Daycare Al-Fattah: alamat, peta lokasi, dan formulir kontak.",
};

const ContactUs = () => {
    return (
        <main>
            <ContactAddress />
            <GoogleMap />
            <ContactForm />
        </main>
    )
}

export default ContactUs