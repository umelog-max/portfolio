import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "Ume.Blog のプライバシーポリシーです。",
};

const sections = [
  {
    title: "1. 個人情報の取得について",
    body: [
      "当サイトでは、お問い合わせフォームのご利用時にお名前・メールアドレス・メッセージ内容を取得します。",
      "これらはお問い合わせへの回答のみに使用し、第三者への提供は行いません。",
    ],
  },
  {
    title: "2. アクセス解析ツールについて",
    body: [
      "当サイトでは、Google LLC が提供する Google Analytics を使用しています。",
      "Google Analytics はトラフィックデータの収集のために Cookie を使用しています。",
      "このトラフィックデータは匿名で収集されており、個人を特定するものではありません。",
      "Cookie を無効にすることでデータ収集を拒否できます。",
      "詳しくは Google のプライバシーポリシーをご確認ください。",
    ],
  },
  {
    title: "3. 広告の配信について",
    body: [
      "当サイトでは、Google LLC が提供する広告配信サービス（Google AdSense）を利用する場合があります。",
      "Google AdSense は Cookie を使用してユーザーのウェブサイト訪問履歴に基づいた広告を配信します。",
      "Cookie を無効にすることでパーソナライズ広告を無効にできます。",
      "詳しくは Google のプライバシーポリシーをご確認ください。",
    ],
  },
  {
    title: "4. Cookie（クッキー）について",
    body: [
      "Cookie とは、ウェブサイトがブラウザに保存する小さなデータファイルです。",
      "当サイトでは Google Analytics および Google AdSense の機能のために Cookie を使用することがあります。",
      "ブラウザの設定により Cookie を無効にすることが可能ですが、一部のサービスが正常に動作しなくなる場合があります。",
    ],
  },
  {
    title: "5. 免責事項",
    body: [
      "当サイトのコンテンツ・情報について、できる限り正確な情報を提供するよう努めていますが、正確性・安全性を保証するものではありません。",
      "当サイトに掲載された内容によって生じた損害については、一切の責任を負いません。",
    ],
  },
  {
    title: "6. 著作権",
    body: [
      "当サイトに掲載されている文章・画像・コードなどのコンテンツの著作権は、運営者に帰属します。",
      "無断転載・複製はお断りします。",
    ],
  },
  {
    title: "7. プライバシーポリシーの変更",
    body: [
      "本ポリシーの内容は、法令の変更やサービスの変更に伴い、予告なく改訂する場合があります。",
      "変更後のポリシーは当ページに掲載した時点から効力を生じるものとします。",
    ],
  },
  {
    title: "8. お問い合わせ",
    body: [
      "本ポリシーに関するお問い合わせは、当サイトのお問い合わせフォームよりご連絡ください。",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-black text-slate-900 tracking-tight fade-up">
        Privacy Policy
      </h1>
      <p className="mb-12 font-mono text-sm font-semibold tracking-widest text-white fade-up fade-up-delay-1">
        プライバシーポリシー
      </p>

      <div className="glass-card p-8 mb-8 fade-up fade-up-delay-2">
        <p className="text-sm text-slate-600 leading-relaxed">
          本プライバシーポリシーは、<strong>Ume.Blog</strong>（以下「当サイト」）における個人情報の取り扱いについて定めたものです。
        </p>
        <p className="text-sm text-slate-500 mt-4">
          運営者：Umeda　／　サイトURL：https://www.umeblog.com
        </p>
      </div>

      <div className="space-y-6 fade-up fade-up-delay-3">
        {sections.map((section) => (
          <section key={section.title} className="glass-card p-6">
            <h2 className="text-base font-black text-slate-900 mb-3">{section.title}</h2>
            <div className="space-y-3">
              {section.body.map((sentence, i) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed">{sentence}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 text-xs text-slate-300 text-right fade-up">
        制定日：2026年3月6日
      </p>
    </div>
  );
}
