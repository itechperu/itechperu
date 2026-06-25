import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/seo-content";
import { BreadcrumbsDeluxe } from "@/components/deluxe/breadcrumbs-deluxe";
import { Clock, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Guías de tecnología y reparación | itechperu.shop",
  description: "Guías expertas sobre SSDs, repuestos para MacBook, baterías de laptop y más. Consejos de expertos en tecnología reacondicionada en Perú.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
      <BreadcrumbsDeluxe items={[{ name: "Inicio", href: "/" }, { name: "Blog" }]} />

      <h1 className="text-[28px] lg:text-[40px] font-bold tracking-tight text-[var(--text-primary)]">Blog itechperu</h1>
      <p className="mt-2 text-[14px] text-[var(--text-secondary)]">Guías expertas sobre tecnología, reparación y compras inteligentes en Perú</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-3xl bg-[var(--bg-primary)] border border-[var(--border-color)] overflow-hidden hover:shadow-lg transition-all">
            <div className="aspect-[16/9] bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] flex items-center justify-center">
              <span className="text-[24px] font-bold text-[#D4AF37]">{post.category}</span>
            </div>
            <div className="p-4 lg:p-5">
              <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)] mb-2">
                <span className="rounded-full bg-[#D4AF37]/10 px-2 py-0.5 font-medium text-[#D4AF37]">{post.category}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" strokeWidth={1.5} /> {post.readTime}</span>
              </div>
              <h2 className="text-[15px] lg:text-[16px] font-semibold text-[var(--text-primary)] group-hover:text-[#D4AF37] transition-colors">{post.title}</h2>
              <p className="mt-1 text-[12px] text-[var(--text-secondary)] line-clamp-2">{post.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-[var(--text-primary)] group-hover:text-[#D4AF37] transition-colors">
                Leer más <ChevronRight className="h-3 w-3" strokeWidth={2} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
