import { MetadataRoute } from "next";
import { getPosts } from "@/lib/microcms";

const siteUrl = "https://www.umeblog.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const blogUrls = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.id}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const latestPostDate = posts.length > 0 ? posts[0].updatedAt : "2026-03-01";

  return [
    { url: siteUrl,                    lastModified: latestPostDate,  changeFrequency: "monthly" as const, priority: 1.0 },
    { url: `${siteUrl}/about`,         lastModified: "2026-03-01",    changeFrequency: "yearly"  as const, priority: 0.8 },
    { url: `${siteUrl}/portfolio`,     lastModified: latestPostDate,  changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteUrl}/blog`,          lastModified: latestPostDate,  changeFrequency: "weekly"  as const, priority: 0.9 },
    { url: `${siteUrl}/contact`,       lastModified: "2026-03-01",    changeFrequency: "yearly"  as const, priority: 0.5 },
    ...blogUrls,
  ];
}
