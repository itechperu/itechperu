import Link from "next/link";
import { ShieldCheck, Truck, CreditCard, RefreshCw, MessageCircle, Mail, MapPin, Instagram, Facebook } from "lucide-react";

/**
 * FooterDeluxe — Footer profesional con todos los links de subpáginas.
 *
 * Estructura:
 *  - Top: badges de confianza (garantía, envío, pago, devolución)
 *  - Middle: 4 columnas de links (Tienda, Empresa, Soporte, Legal)
 *  - Bottom: marca + redes + copyright
 */
export function FooterDeluxe() {
  return (
    <footer className="mt-16 lg:mt-24 border-t border-[#E5E5E7] bg-white">
      {/* Trust badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <TrustBadge
            icon={ShieldCheck}
            title="Garantía Real"
            desc="3-6 meses en cada equipo"
            href="/garantia"
          />
          <TrustBadge
            icon={Truck}
            title="Envío Express"
            desc="24-48h en Lima, Perú"
            href="/envios"
          />
          <TrustBadge
            icon={CreditCard}
            title="Pago Seguro"
            desc="Mercado Pago + Contraentrega"
            href="/coleccion"
          />
          <TrustBadge
            icon={RefreshCw}
            title="7 días devolución"
            desc="Sin preguntas, sin letra pequeña"
            href="/preguntas-frecuentes"
          />
        </div>
      </div>

      {/* Main footer */}
      <div className="border-t border-[#E5E5E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Columna 1: Marca */}
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1D1D1F]">
                  <span className="text-[12px] font-bold tracking-tight text-[#D4AF37]">iT</span>
                </span>
                <span className="text-[16px] font-semibold tracking-tight text-[#1D1D1F]">
                  itech<span className="text-[#D4AF37]">peru</span>
                  <span className="text-[10px] font-normal text-[#86868B] ml-1">.shop</span>
                </span>
              </Link>
              <p className="text-[12px] text-[#86868B] leading-relaxed max-w-xs">
                Tecnología premium reacondicionada en Lima, Perú. iPads, MacBooks y Laptops
                corporativas verificadas con garantía real.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <a
                  href="https://wa.me/51987654321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F5F7] hover:bg-[#25D366]/10 hover:text-[#25D366] text-[#1D1D1F] transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F5F7] hover:bg-[#E1306C]/10 hover:text-[#E1306C] text-[#1D1D1F] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F5F7] hover:bg-[#1877F2]/10 hover:text-[#1877F2] text-[#1D1D1F] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Columna 2: Tienda */}
            <div>
              <h3 className="text-[12px] font-semibold uppercase tracking-wider text-[#1D1D1F] mb-3">
                Tienda
              </h3>
              <ul className="space-y-2">
                <li><FooterLink href="/coleccion">Catálogo completo</FooterLink></li>
                <li><FooterLink href="/categoria/ipads">iPads</FooterLink></li>
                <li><FooterLink href="/categoria/macbooks">MacBooks</FooterLink></li>
                <li><FooterLink href="/categoria/laptops">Laptops</FooterLink></li>
                <li><FooterLink href="/categoria/accesorios">Ropa USA</FooterLink></li>
                <li><FooterLink href="/coleccion/ofertas">Ofertas Deluxe</FooterLink></li>
              </ul>
            </div>

            {/* Columna 3: Empresa */}
            <div>
              <h3 className="text-[12px] font-semibold uppercase tracking-wider text-[#1D1D1F] mb-3">
                Empresa
              </h3>
              <ul className="space-y-2">
                <li><FooterLink href="/nosotros">Sobre nosotros</FooterLink></li>
                <li><FooterLink href="/garantia">Garantía Deluxe</FooterLink></li>
                <li><FooterLink href="/envios">Envíos y cobertura</FooterLink></li>
                <li><FooterLink href="/blog">Blog</FooterLink></li>
                <li><FooterLink href="/preguntas-frecuentes">Preguntas frecuentes</FooterLink></li>
                <li><FooterLink href="/contacto">Contacto</FooterLink></li>
              </ul>
            </div>

            {/* Columna 4: Legal + contacto */}
            <div>
              <h3 className="text-[12px] font-semibold uppercase tracking-wider text-[#1D1D1F] mb-3">
                Soporte
              </h3>
              <ul className="space-y-2">
                <li><FooterLink href="/terminos">Términos y condiciones</FooterLink></li>
                <li><FooterLink href="/privacidad">Política de privacidad</FooterLink></li>
                <li>
                  <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#86868B] hover:text-[#1D1D1F] transition-colors flex items-center gap-1.5">
                    <MessageCircle className="h-3 w-3" strokeWidth={1.5} />
                    WhatsApp VIP
                  </a>
                </li>
                <li>
                  <a href="mailto:hola@itechperu.shop" className="text-[12px] text-[#86868B] hover:text-[#1D1D1F] transition-colors flex items-center gap-1.5">
                    <Mail className="h-3 w-3" strokeWidth={1.5} />
                    hola@itechperu.shop
                  </a>
                </li>
                <li className="text-[12px] text-[#86868B] flex items-start gap-1.5 pt-1">
                  <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  Lima, Perú 🇵🇪
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E5E5E7] bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#86868B]">
            © 2026 itechperu.shop · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-4 text-[11px] text-[#86868B]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-[#10B981]" strokeWidth={1.5} />
              SSL 256-bit
            </span>
            <span className="flex items-center gap-1">
              <CreditCard className="h-3 w-3" strokeWidth={1.5} />
              Mercado Pago
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Truck className="h-3 w-3" strokeWidth={1.5} />
              Envío nacional
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TrustBadge({
  icon: Icon,
  title,
  desc,
  href,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl bg-[#F5F5F7] p-3 hover:bg-white hover:shadow-[0_4px_20px_rgb(0,0,0,0.04)] transition-all"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white group-hover:bg-[#D4AF37]/10 transition-colors">
        <Icon className="h-5 w-5 text-[#1D1D1F] group-hover:text-[#D4AF37]" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-[12px] font-semibold text-[#1D1D1F]">{title}</p>
        <p className="text-[10px] text-[#86868B]">{desc}</p>
      </div>
    </Link>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[12px] text-[#86868B] hover:text-[#1D1D1F] transition-colors"
    >
      {children}
    </Link>
  );
}
