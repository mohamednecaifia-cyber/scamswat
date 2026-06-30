import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://scamswat.com";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/link-checker`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/message-analyzer`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/number-lookup`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
  ];

  const blogPosts = [
    { slug: "top-scams-2026", date: "2026-06-15" },
    { slug: "phishing-link-detection", date: "2026-06-10" },
    { slug: "whatsapp-scam-protection", date: "2026-06-05" },
    { slug: "number-spoofing-guide", date: "2026-05-28" },
    { slug: "ai-scam-trends", date: "2026-05-20" },
    { slug: "protecting-elderly-from-scams", date: "2026-05-15" },
  ];

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
