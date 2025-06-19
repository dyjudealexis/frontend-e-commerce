// scripts/generate-sitemap.ts
import fs from "fs";
import path from "path";

// Base URL for your e‑commerce site
const baseUrl = "https://e-commerce.jude-alexis-dy.site";

// List all your static pages
const staticPages = [
  "/",
  "/about",
  "/shop",
  "/shop/checkout",
  "/shop/thank-you",
  "/shop/cart",
  "/contact-me",
  "/login",
  "/register",
  "/profile",
  "/profile/edit",
  "/profile/orders",
  "/profile/orders/completed",
];

// Dynamically generate product detail URLs (from 1 to 12)
const getProductUrls = (): string[] => {
  const urls: string[] = [];
  for (let id = 1; id <= 12; id++) {
    urls.push(`/shop/details?id=${id}`);
  }
  return urls;
};

const generateSitemap = (): void => {
  const dynamicPages = getProductUrls();
  const allPages = [...staticPages, ...dynamicPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  const outDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemapXml);
  console.log("✅ sitemap.xml generated.");
};

const generateRobots = (): void => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
  const outDir = path.join(process.cwd(), "public");
  fs.writeFileSync(path.join(outDir, "robots.txt"), robotsTxt);
  console.log("✅ robots.txt generated.");
};

// Run both generators
(() => {
  generateSitemap();
  generateRobots();
})();
