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

export type MicroCMSWork = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  description: string;
  tags: string | string[];
  period: string;
  github?: string;
  demo?: string;
  content?: string;
};

export type NormalizedWork = Omit<MicroCMSWork, "tags"> & { tags: string[] };

function normalizeWork(work: MicroCMSWork): NormalizedWork {
  return {
    ...work,
    tags: Array.isArray(work.tags)
      ? work.tags
      : work.tags.split(",").map((t) => t.trim()).filter(Boolean),
  };
}

// Works一覧を取得
export async function getWorks(): Promise<NormalizedWork[]> {
  const data = await client.getList<MicroCMSWork>({
    endpoint: "works",
    queries: {
      orders: "-publishedAt",
      limit: 100,
    },
  });
  return data.contents.map(normalizeWork);
}

// Works1件を取得
export async function getWork(contentId: string): Promise<NormalizedWork> {
  const data = await client.getListDetail<MicroCMSWork>({
    endpoint: "works",
    contentId,
  });
  return normalizeWork(data);
}
