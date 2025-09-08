
import "./globals.css";

export const metadata = {
  title: "TK, KB, dan Daycare Al-Fattah",
  description: "Profil resmi TK, KB, dan Daycare Al-Fattah di bawah Yayasan Wira Mahardhika Wicaksana. Tumbuh dalam kasih, belajar dengan gembira.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
