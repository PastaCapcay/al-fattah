export default async function sitemap() {
  const siteUrl = process.env.SITE_URL || "https://tkalfattah.sch.id";

  // Hanya rute yang ada halaman-nya
  const paths = [
    "",
    "/about-us",
    "/services",
    "/service-details",
    "/portfolio",
    "/contact-us",
    "/faq",
  ];

  const now = new Date().toISOString();
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.7,
  }));
}


