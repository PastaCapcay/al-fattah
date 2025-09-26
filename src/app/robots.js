export default function robots() {
  const siteUrl = process.env.SITE_URL || "https://tkalfattah.sch.id";
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}


