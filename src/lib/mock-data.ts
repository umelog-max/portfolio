export type PostCategory = "TECH" | "LIFE" | "DEV";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: PostCategory;
  tags: string[];
  readTime: number;
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

export const categoryStyles: Record<PostCategory, { label: string; bg: string; text: string; border: string }> = {
  TECH: {
    label: "TECH",
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
  },
  LIFE: {
    label: "LIFE",
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200",
  },
  DEV: {
    label: "DEV",
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
  },
};

export const posts: Post[] = [
  {
    slug: "aws-ecs-fargate-deploy",
    title: "AWS ECS Fargate で本番環境を構築した話",
    excerpt: "ECS Fargate を使ったコンテナデプロイの手順と、詰まったポイントを解説します。",
    date: "2026-02-10",
    category: "TECH",
    tags: ["AWS", "ECS", "Docker"],
    readTime: 8,
  },
  {
    slug: "go-rest-api",
    title: "Go で REST API を作る最短ルート",
    excerpt: "net/http パッケージだけで本番に耐えうる REST API を構築する方法をまとめました。",
    date: "2026-01-28",
    category: "TECH",
    tags: ["Go", "API", "バックエンド"],
    readTime: 6,
  },
  {
    slug: "terraform-aws-basic",
    title: "Terraform で AWS インフラをコード管理する入門",
    excerpt: "IaC 初心者向けに Terraform × AWS の基本構成をゼロから解説します。",
    date: "2026-01-15",
    category: "TECH",
    tags: ["Terraform", "AWS", "IaC"],
    readTime: 10,
  },
  {
    slug: "sauna-engineer-reset",
    title: "エンジニアこそサウナに行くべき理由",
    excerpt: "ととのうことで思考がリセットされる。詰まったときの最強の解決策はサウナだった。",
    date: "2026-02-05",
    category: "LIFE",
    tags: ["サウナ", "ライフスタイル"],
    readTime: 4,
  },
  {
    slug: "hobby-road-bike",
    title: "ロードバイク始めました",
    excerpt: "週末のストレス発散にロードバイクを買った話。機材選びから初ライドまで。",
    date: "2026-01-20",
    category: "LIFE",
    tags: ["ロードバイク", "趣味"],
    readTime: 5,
  },
  {
    slug: "portfolio-dev-log-1",
    title: "ポートフォリオサイト開発ログ #1",
    excerpt: "Next.js + microCMS + AWS Amplify でポートフォリオサイトを作り始めた記録。",
    date: "2026-02-15",
    category: "DEV",
    tags: ["Next.js", "個人開発"],
    readTime: 5,
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
