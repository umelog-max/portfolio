import { MetadataRoute } from "next";
import { getPosts, getWorks } from "@/lib/microcms";

const siteUrl = "https://www.umeblog.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    posts = await getPosts();
  } catch {
    // microCMS が取得できなくてもサイトマップ自体は返す
  }

  let works: Awaited<ReturnType<typeof getWorks>> = [];
  try {
    works = await getWorks();
  } catch {
    // 同上
  }

  const portfolioUrls = works.map((work) => ({
    url: `${siteUrl}/portfolio/${work.id}`,
    lastModified: work.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

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
    { url: `${siteUrl}/privacy`,       lastModified: "2026-03-06",    changeFrequency: "yearly"  as const, priority: 0.3 },
    ...portfolioUrls,
    ...blogUrls,
  ];
}
