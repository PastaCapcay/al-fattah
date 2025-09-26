
import "./globals.css";
import Script from "next/script";

const siteUrl = process.env.SITE_URL || "https://tkalfattah.sch.id";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TK, KB, dan Daycare Al-Fattah",
    template: "%s | Al-Fattah",
  },
  description:
    "Profil resmi TK, KB, dan Daycare Al-Fattah di bawah Yayasan Wira Mahardhika Wicaksana. Tumbuh dalam kasih, belajar dengan gembira.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TK, KB, dan Daycare Al-Fattah",
    description:
      "Profil resmi TK, KB, dan Daycare Al-Fattah di bawah Yayasan Wira Mahardhika Wicaksana.",
    url: siteUrl,
    siteName: "Al-Fattah",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 800,
        height: 800,
        alt: "Logo Al-Fattah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TK, KB, dan Daycare Al-Fattah",
    description:
      "Profil resmi TK, KB, dan Daycare Al-Fattah di bawah Yayasan Wira Mahardhika Wicaksana.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HQPYQLTXRW"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HQPYQLTXRW');
          `}
        </Script>
        <Script id="website-ld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: siteUrl,
            name: "TK, KB, dan Daycare Al-Fattah",
          })}
        </Script>
        <Script id="org-ld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "TK, KB, dan Daycare Al-Fattah",
            url: siteUrl,
            logo: `${siteUrl}/logo.png`,
            email: "info@tkalfattah.sch.id",
            telephone: "+62-812-9846-5771",
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer support",
                telephone: "+62-812-9846-5771",
                email: "info@tkalfattah.sch.id",
                areaServed: "ID",
                availableLanguage: ["id"],
              },
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Perum Grand Cikarang City (GCC) – Sakura Cinity, Blok F7 No.36 & Blok F19 No.36, Desa Karang Raharja",
              addressLocality: "Cikarang Utara",
              addressRegion: "Jawa Barat",
              postalCode: "17550",
              addressCountry: "ID",
            },
            sameAs: [],
          })}
        </Script>
        {children}
      </body>
    </html>
  );
}
