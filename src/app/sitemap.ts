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

  return [
    { url: siteUrl,                    lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1.0 },
    { url: `${siteUrl}/about`,         lastModified: new Date(), changeFrequency: "yearly"  as const, priority: 0.8 },
    { url: `${siteUrl}/portfolio`,     lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteUrl}/blog`,          lastModified: new Date(), changeFrequency: "weekly"  as const, priority: 0.9 },
    { url: `${siteUrl}/contact`,       lastModified: new Date(), changeFrequency: "yearly"  as const, priority: 0.5 },
    ...blogUrls,
  ];
}
