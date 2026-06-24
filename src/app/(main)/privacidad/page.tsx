import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — itechperu.shop",
  description:
    "Política de privacidad y protección de datos personales en itechperu.shop. Cumplimos con la Ley 29733 de Protección de Datos Personales del Perú.",
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-[24px] lg:text-[32px] font-bold tracking-tight text-[#1D1D1F]">
        Política de Privacidad
      </h1>
      <p className="text-[12px] text-[#86868B]">Última actualización: Junio 2026</p>

      <div className="prose prose-sm max-w-none space-y-4 text-[13px] text-[#1D1D1F]/80 leading-relaxed">
        <section>
          <h2 className="text-[16px] font-bold text-[#1D1D1F] mb-2">1. Responsable</h2>
          <p>
            itechperu.shop es responsable del tratamiento de tus datos personales. Nos
            comprometemos a proteger tu privacidad conforme a la Ley N° 29733 — Ley de
            Protección de Datos Personales del Perú y su reglamento.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[#1D1D1F] mb-2">2. Datos que recopilamos</h2>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Nombre completo</li>
            <li>Correo electrónico</li>
            <li>Número de celular (WhatsApp)</li>
            <li>Dirección de envío (solo para pedidos)</li>
            <li>Datos de pago (procesados por Mercado Pago, no los almacenamos)</li>
            <li>Historial de pedidos y favoritos</li>
            <li>Datos de navegación (cookies anónimas)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[#1D1D1F] mb-2">3. Finalidad</h2>
          <p>Usamos tus datos para:</p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
            <li>Procesar y enviar tus pedidos</li>
            <li>Notificarte el estado de tus compras</li>
            <li>Brindar soporte al cliente</li>
            <li>Enviar ofertas y promociones (solo si te suscribes)</li>
            <li>Cumplir obligaciones legales (SUNAT, facturación)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[#1D1D1F] mb-2">4. Base Legal</h2>
          <p>
            Tratamos tus datos con tu consentimiento (al crear cuenta o hacer un pedido) y
            para ejecutar contratos de compra-venta. No compartimos tus datos con terceros
            excepto cuando sea necesario para cumplir la ley o procesar pagos.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[#1D1D1F] mb-2">5. Proveedores tercerizados</h2>
          <p>Usamos estos servicios que pueden acceder a tus datos:</p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
            <li><strong>Mercado Pago</strong> — procesamiento de pagos (no vemos tus datos de tarjeta)</li>
            <li><strong>Google</strong> — autenticación OAuth (si inicias sesión con Google)</li>
            <li><strong>Supabase</strong> — base de datos (servidor en São Paulo, Brasil)</li>
            <li><strong>Sanity</strong> — almacenamiento de imágenes de productos</li>
            <li><strong>Vercel</strong> — hosting del sitio (servidor en USA)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[#1D1D1F] mb-2">6. Cookies</h2>
          <p>
            Usamos cookies esenciales para el funcionamiento del sitio (sesión, carrito de
            compras) y cookies analíticas anónimas para mejorar el servicio. No vendemos
            datos a terceros. Puedes deshabilitar cookies en tu navegador, pero algunas
            funciones no funcionarán.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[#1D1D1F] mb-2">7. Tus derechos (ARCO)</h2>
          <p>Tienes derecho a:</p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
            <li><strong>Acceso</strong>: saber qué datos tenemos de ti</li>
            <li><strong>Rectificación</strong>: corregir datos incorrectos</li>
            <li><strong>Cancelación</strong>: solicitar eliminación de tus datos</li>
            <li><strong>Oposición</strong>: pedir que no usemos tus datos para marketing</li>
          </ul>
          <p className="mt-2">
            Para ejercer estos derechos, escríbenos a hola@itechperu.shop con asunto
            "Derechos ARCO".
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[#1D1D1F] mb-2">8. Seguridad</h2>
          <p>
            Implementamos medidas técnicas y organizativas para proteger tus datos: SSL
            256-bit, cifrado de contraseñas con bcrypt, accesos restringidos, backups
            automáticos. Nunca almacenamos datos de tarjetas de crédito (los procesa
            Mercado Pago directamente).
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-[#1D1D1F] mb-2">9. Contacto</h2>
          <p>
            Para consultas sobre privacidad: hola@itechperu.shop o WhatsApp +51 987 654 321.
          </p>
        </section>
      </div>
    </div>
  );
}
