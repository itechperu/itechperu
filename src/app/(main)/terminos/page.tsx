import type { Metadata } from "next";
import { BackButton } from "@/components/deluxe/back-button";

export const metadata: Metadata = {
  title: "Términos y Condiciones — itechperu.shop",
  description:
    "Términos y condiciones de uso de itechperu.shop. Compras, garantías, devoluciones, envíos y pagos.",
  alternates: { canonical: "/terminos" },
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <BackButton />
      <h1 className="text-[24px] lg:text-[32px] font-bold tracking-tight text-[var(--text-primary)]">
        Términos y Condiciones
      </h1>
      <p className="text-[12px] text-[var(--text-secondary)]">Última actualización: Junio 2026</p>

      <div className="prose prose-sm max-w-none space-y-4 text-[13px] text-[var(--text-primary)]/80 leading-relaxed">
        <BackButton />
    <section>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">1. Aceptación</h2>
          <p>
            Al acceder y utilizar itechperu.shop, aceptas estos Términos y Condiciones en su
            totalidad. Si no estás de acuerdo, por favor no uses nuestro sitio.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">2. Productos</h2>
          <p>
            Todos nuestros productos son reacondicionados y verificados con nuestro protocolo
            de 47 puntos de inspección. El estado real de cada equipo se describe en su ficha
            técnica (Grado A+, A o B). Las imágenes son referenciales; el equipo real puede
            tener variaciones menores.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">3. Precios y Pagos</h2>
          <p>
            Los precios están en Soles peruanos (PEN) y pueden cambiar sin previo aviso.
            Aceptamos Mercado Pago (tarjeta, Yape, PLIN, efectivo) y pago contraentrega en
            Lima Metropolitana. El pago contraentrega está sujeto a verificación de zona.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">4. Envíos</h2>
          <p>
            Los envíos en Lima Metropolitana se realizan en 24-48 horas hábiles. Para
            provincias, el tiempo es de 3-7 días hábiles según la región. El envío es
            gratis en compras sobre S/1,500. Los tiempos pueden variar por factores
            externos (clima, festivos, transporte).
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">5. Garantía</h2>
          <p>
            Todos los equipos incluyen garantía real según su grado: A+ (6 meses),
            A (4 meses), B (3 meses). La garantía cubre defectos de fábrica y funcionamiento.
            No cubre daños por mal uso (caídas, líquidos, modificaciones). Ver nuestra
            página de Garantía para detalles completos.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">6. Devoluciones</h2>
          <p>
            Tienes 7 días calendario desde la recepción para devolver el equipo si no quedas
            satisfecho. El equipo debe estar en las mismas condiciones recibidas. Reembolso
            completo del producto (los gastos de envío no son reembolsables).
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">7. Cuenta de Usuario</h2>
          <p>
            Para comprar necesitas crear una cuenta con tu correo electrónico. Eres
            responsable de mantener la confidencialidad de tu cuenta. No compartas tu
            contraseña con terceros.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">8. Propiedad Intelectual</h2>
          <p>
            Todo el contenido de itechperu.shop (textos, imágenes, logos, diseño) es propiedad
            de itechperu.shop y está protegido por leyes de propiedad intelectual. No está
            permitido copiar, distribuir o usar sin autorización.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">9. Ley Aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República del Perú. Cualquier disputa
            será resuelta en los tribunales de Lima, Perú.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">10. Contacto</h2>
          <p>
            Para consultas sobre estos términos, escríbenos a hola@itechperu.shop o por
            WhatsApp al +51 987 654 321.
          </p>
        </section>
      </div>
    </div>
  );
}
