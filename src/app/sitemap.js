export default async function sitemap() {
  const siteUrl = process.env.SITE_URL || "https://tkalfattah.sch.id";

  const routes = [
    "",
    "/about-us",
    "/services",
    "/service-details",
    "/portfolio",
    "/blog",
    "/blog-details",
    "/contact-us",
    "/faq",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.7,
  }));

  return routes;
}


