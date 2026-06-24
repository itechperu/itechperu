import Link from "next/link";
import { BreadcrumbsDeluxe } from "@/components/deluxe/breadcrumbs-deluxe";
import { getProducts, formatPEN } from "@/data/products";
import { getLandingPageBySlug, CATEGORIES_SEO } from "@/data/seo-content";
import { ShieldCheck, ChevronRight, MessageCircle, CheckCircle2 } from "lucide-react";

/**
 * LandingPageTemplate — Template para landing pages SEO transaccionales.
 *
 * Renderiza contenido SEO de 1000-2000 palabras, FAQ Schema,
 * internal linking, productos relacionados y CTA WhatsApp.
 */
export async function LandingPageView({ slug }: { slug: string }) {
  const page = getLandingPageBySlug(slug);
  if (!page) return null;

  const allProducts = await getProducts();
  const relatedProducts = allProducts.slice(0, 4);

  // FAQ Schema
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  // Render content
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) return <h2 key={i} className="text-[20px] lg:text-[22px] font-bold text-[#1D1D1F] mt-8 mb-3">{block.replace("## ", "")}</h2>;
      if (block.startsWith("### ")) return <h3 key={i} className="text-[16px] font-semibold text-[#1D1D1F] mt-5 mb-2">{block.replace("### ", "")}</h3>;
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter((l) => l.startsWith("- "));
        return <ul key={i} className="list-disc list-inside space-y-1 mb-3">{items.map((item, j) => <li key={j} className="text-[14px] text-[#1D1D1F]/80">{item.replace("- ", "")}</li>)}</ul>;
      }
      if (/^\d+\.\s/.test(block)) {
        const items = block.split("\n").filter((l) => /^\d+\.\s/.test(l));
        return <ol key={i} className="list-decimal list-inside space-y-1 mb-3">{items.map((item, j) => <li key={j} className="text-[14px] text-[#1D1D1F]/80">{item.replace(/^\d+\.\s/, "")}</li>)}</ol>;
      }
      return <p key={i} className="text-[14px] lg:text-[15px] text-[#1D1D1F]/80 leading-relaxed mb-3">{block}</p>;
    });
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <BreadcrumbsDeluxe items={[
        { name: "Inicio", href: "/" },
        { name: page.title },
      ]} />

      {/* Hero */}
      <div className="max-w-3xl">
        <h1 className="text-[28px] lg:text-[44px] font-bold tracking-tight text-[#1D1D1F]">{page.h1}</h1>
        <p className="mt-3 text-[15px] lg:text-[17px] text-[#86868B] leading-relaxed">{page.metaDescription}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] px-5 py-2.5 text-[13px] font-semibold text-white">
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> Consultar por WhatsApp
          </a>
          <Link href="/coleccion" className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#E5E5E7] px-5 py-2.5 text-[13px] font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors">
            Ver catálogo <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>

      {/* Contenido SEO */}
      <article className="mt-10 max-w-3xl">
        {renderContent(page.content)}
      </article>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-[20px] lg:text-[24px] font-bold text-[#1D1D1F] mb-4">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {page.faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl bg-white border border-[#E5E5E7] p-4">
              <h3 className="text-[14px] font-semibold text-[#1D1D1F] flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                {faq.q}
              </h3>
              <p className="mt-2 ml-6 text-[13px] text-[#1D1D1F]/70 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Productos relacionados */}
      <section className="mt-12">
        <h2 className="text-[18px] lg:text-[22px] font-bold text-[#1D1D1F] mb-4">Productos relacionados</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
          {relatedProducts.map((p) => (
            <Link key={p.id} href={`/producto/${p.slug}`} className="group rounded-2xl bg-white border border-[#E5E5E7] overflow-hidden hover:shadow-md transition-all">
              <div className="aspect-square overflow-hidden bg-[#F5F5F7]">
                <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-2.5">
                <p className="text-[11px] font-medium text-[#1D1D1F] line-clamp-2">{p.title}</p>
                <p className="text-[13px] font-bold text-[#D4AF37] mt-1">{formatPEN(p.basePrice)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Internal linking */}
      <section className="mt-10 rounded-2xl bg-[#F5F5F7] p-5">
        <h3 className="text-[14px] font-semibold text-[#1D1D1F] mb-2">Explora más categorías</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES_SEO.slice(0, 5).map((cat) => (
            <Link key={cat.slug} href={`/categoria/${cat.slug}`} className="rounded-full bg-white border border-[#E5E5E7] px-3 py-1.5 text-[12px] font-medium text-[#1D1D1F] hover:border-[#D4AF37]/30 transition-colors">
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mt-8 rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] p-6 lg:p-8 text-center">
        <ShieldCheck className="h-8 w-8 text-[#D4AF37] mx-auto" strokeWidth={1.5} />
        <h2 className="mt-3 text-[18px] lg:text-[20px] font-bold text-white">¿Listo para comprar con confianza?</h2>
        <p className="text-[13px] text-white/60 mt-1">Garantía real · 47 puntos de inspección · Envío a todo Perú</p>
        <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 rounded-full bg-[#D4AF37] px-6 py-3 text-[14px] font-semibold text-[#1D1D1F]">
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> WhatsApp VIP
        </a>
      </section>
    </div>
  );
}
