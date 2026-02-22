import { createClient } from "microcms-js-sdk";
import type { PostCategory } from "./mock-data";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

export type MicroCMSPost = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  category: PostCategory;
  tags: string;
  excerpt: string;
  content: string;
  readTime: number;
};

// 記事一覧を取得
export async function getPosts() {
  const data = await client.getList<MicroCMSPost>({
    endpoint: "blog",
    queries: {
      orders: "-publishedAt",
      limit: 100,
    },
  });
  return data.contents;
}

// 記事1件を取得
export async function getPost(contentId: string) {
  const data = await client.getListDetail<MicroCMSPost>({
    endpoint: "blog",
    contentId,
  });
  return data;
}
