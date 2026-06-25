import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/seo-content";
import { BreadcrumbsDeluxe } from "@/components/deluxe/breadcrumbs-deluxe";
import { Clock, Calendar, ChevronRight, MessageCircle } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      locale: "es_PE",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: { card: "summary_large_image", title: post.metaTitle, description: post.metaDescription },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "itechperu.shop" },
    keywords: post.keywords.join(", "),
  };

  // Render content (simple markdown-like: ## → h2, paragraphs)
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return <h2 key={i} className="text-[18px] font-bold text-[var(--text-primary)] mt-6 mb-2">{block.replace("## ", "")}</h2>;
      }
      if (block.startsWith("### ")) {
        return <h3 key={i} className="text-[15px] font-semibold text-[var(--text-primary)] mt-4 mb-1">{block.replace("### ", "")}</h3>;
      }
      return <p key={i} className="text-[14px] text-[var(--text-primary)]/80 leading-relaxed mb-3">{block}</p>;
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <BreadcrumbsDeluxe items={[
        { name: "Inicio", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: post.title.substring(0, 40) + "..." },
      ]} />

      <span className="inline-flex items-center rounded-full bg-[#D4AF37]/10 px-2.5 py-1 text-[10px] font-medium text-[#D4AF37] mb-3">{post.category}</span>
      <h1 className="text-[24px] lg:text-[32px] font-bold tracking-tight text-[var(--text-primary)]">{post.title}</h1>
      <div className="flex items-center gap-3 mt-2 text-[11px] text-[var(--text-secondary)]">
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" strokeWidth={1.5} /> {new Date(post.publishedAt).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" })}</span>
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" strokeWidth={1.5} /> {post.readTime}</span>
      </div>

      <article className="mt-6">{renderContent(post.content)}</article>

      {/* CTA */}
      <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] p-6 text-center">
        <h2 className="text-[16px] font-bold text-white">¿Necesitas ayuda con tu equipo?</h2>
        <p className="text-[12px] text-white/60 mt-1">Escríbenos por WhatsApp y te asesoramos</p>
        <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-3 rounded-full bg-[#D4AF37] px-5 py-2 text-[12px] font-semibold text-[var(--text-primary)]">
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> WhatsApp VIP
        </a>
      </div>

      {/* Artículos relacionados */}
      <div className="mt-8">
        <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-3">Artículos relacionados</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2).map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] p-4 hover:shadow-md transition-all">
              <span className="text-[10px] text-[#D4AF37] font-medium">{p.category}</span>
              <h3 className="text-[13px] font-semibold text-[var(--text-primary)] mt-1 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
              <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-[var(--text-secondary)]">Leer <ChevronRight className="h-3 w-3" strokeWidth={2} /></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
