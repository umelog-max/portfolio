export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
};

export type Work = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  period: string;
};

type CategoryStyle = { label: string; bg: string; text: string; border: string };

const CATEGORY_PALETTE: CategoryStyle[] = [
  { label: "", bg: "bg-sky-50",    text: "text-sky-700",    border: "border-sky-200"    },
  { label: "", bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
  { label: "", bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  { label: "", bg: "bg-emerald-50",text: "text-emerald-700",border: "border-emerald-200"},
  { label: "", bg: "bg-rose-50",   text: "text-rose-600",   border: "border-rose-200"   },
  { label: "", bg: "bg-amber-50",  text: "text-amber-600",  border: "border-amber-200"  },
];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function getCategoryStyle(category: unknown): CategoryStyle {
  const name =
    typeof category === "string"
      ? category
      : category !== null && typeof category === "object" && "name" in category
      ? String((category as { name: unknown }).name)
      : String(category ?? "");
  const base = CATEGORY_PALETTE[hashStr(name) % CATEGORY_PALETTE.length];
  return { ...base, label: name };
}

export const posts: Post[] = [
  {
    slug: "aws-ecs-fargate-deploy",
    title: "AWS ECS Fargate で本番環境を構築した話",
    excerpt: "ECS Fargate を使ったコンテナデプロイの手順と、詰まったポイントを解説します。",
    date: "2026-02-10",
    category: "TECH",
    tags: ["AWS", "ECS", "Docker"],
  },
  {
    slug: "go-rest-api",
    title: "Go で REST API を作る最短ルート",
    excerpt: "net/http パッケージだけで本番に耐えうる REST API を構築する方法をまとめました。",
    date: "2026-01-28",
    category: "TECH",
    tags: ["Go", "API", "バックエンド"],
  },
  {
    slug: "terraform-aws-basic",
    title: "Terraform で AWS インフラをコード管理する入門",
    excerpt: "IaC 初心者向けに Terraform × AWS の基本構成をゼロから解説します。",
    date: "2026-01-15",
    category: "TECH",
    tags: ["Terraform", "AWS", "IaC"],
  },
  {
    slug: "sauna-engineer-reset",
    title: "エンジニアこそサウナに行くべき理由",
    excerpt: "ととのうことで思考がリセットされる。詰まったときの最強の解決策はサウナだった。",
    date: "2026-02-05",
    category: "LIFE",
    tags: ["サウナ", "ライフスタイル"],
  },
  {
    slug: "hobby-road-bike",
    title: "ロードバイク始めました",
    excerpt: "週末のストレス発散にロードバイクを買った話。機材選びから初ライドまで。",
    date: "2026-01-20",
    category: "LIFE",
    tags: ["ロードバイク", "趣味"],
  },
  {
    slug: "portfolio-dev-log-1",
    title: "ポートフォリオサイト開発ログ #1",
    excerpt: "Next.js + microCMS + AWS Amplify でポートフォリオサイトを作り始めた記録。",
    date: "2026-02-15",
    category: "DEV",
    tags: ["Next.js", "個人開発"],
  },
];

export const works: Work[] = [
  {
    slug: "portfolio-site",
    title: "個人ポートフォリオサイト",
    description: "Next.js + microCMS + AWS Amplify で構築した本サイト。ブログ・作品紹介・問い合わせ機能を実装。",
    tags: ["Next.js", "TypeScript", "AWS", "Tailwind CSS"],
    github: "https://github.com",
    period: "2026.02",
  },
  {
    slug: "go-api-server",
    title: "Go 製 REST API サーバー",
    description: "Go + Gin フレームワークで構築した REST API。AWS Lambda + API Gateway にデプロイ。",
    tags: ["Go", "AWS Lambda", "API Gateway", "DynamoDB"],
    github: "https://github.com",
    period: "2025.12",
  },
  {
    slug: "infra-terraform",
    title: "Terraform AWS インフラ自動化",
    description: "VPC・ECS・RDS・ALB をフルで Terraform 管理。CI/CD パイプラインも整備。",
    tags: ["Terraform", "AWS", "GitHub Actions", "Docker"],
    github: "https://github.com",
    period: "2025.10",
  },
];
