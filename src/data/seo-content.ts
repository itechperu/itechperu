/**
 * Data layer SEO — itechperu.shop
 *
 * Categorías, colecciones, blog posts y landing pages con contenido SEO.
 * Cada entrada tiene metadata, contenido optimizado y schema data.
 */

// ============================
// CATEGORÍAS
// ============================

export interface CategorySEO {
  slug: string;
  name: string;
  shortName: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  content: string; // 400+ palabras
  keywords: string[];
  dbCategory: string; // IPAD, MACBOOK, etc.
}

export const CATEGORIES_SEO: CategorySEO[] = [
  {
    slug: "ipads",
    name: "iPads",
    shortName: "iPad",
    h1: "iPads Reacondicionados en Perú",
    metaTitle: "iPads Reacondicionados en Perú | Apple iPad Pro, Air y mini — itechperu.shop",
    metaDescription:
      "Compra iPads reacondicionados en Perú: iPad Pro, iPad Air y iPad mini verificados con garantía. Envío a todo Perú. Calidad Apple a precio inteligente.",
    keywords: ["ipad reacondicionado peru", "ipad pro lima", "ipad air peru", "ipad usada peru", "apple ipad peru"],
    dbCategory: "IPAD",
    content: `Los iPads reacondicionados de itechperu.shop ofrecen la mejor relación calidad-precio del mercado peruano. Cada iPad pasa por nuestro riguroso protocolo de 47 puntos de inspección técnica, garantizando que recibas un equipo con desempeño idéntico al de uno nuevo, pero a una fracción del precio.

Disponemos de tres modelos principales: iPad Pro con chip M2 para profesionales creativos que necesitan potencia de nivel desktop, iPad Air con chip M1 para usuarios que buscan el equilibrio perfecto entre rendimiento y portabilidad, y iPad mini para quienes priorizan la comodidad de un dispositivo ultraportátil.

Todos nuestros iPads incluyen garantía real de 3 a 6 meses según el grado de condición. El Grado A+ (Como Nuevo) ofrece 6 meses de garantía, el Grado A (Excelente) 4 meses, y el Grado B (Muy Bueno) 3 meses. Adicionalmente, contamos con 7 días de devolución sin preguntas, para que compres con total tranquilidad.

El envío es gratis en compras sobre S/1,500 a todo Lima Metropolitana, con entrega en 24 a 48 horas. Para provincias, coordinamos envíos nacionales con tiempos de 3 a 7 días hábiles según la región. Aceptamos Mercado Pago (tarjeta, Yape, PLIN, efectivo) y pago contraentrega exclusivamente en Lima.

Cada iPad viene con su cargador original, cable USB-C, y nuestra caja Deluxe itechperu con sello de garantía. Los modelos Grado A+ incluyen además accesorios premium según disponibilidad. Verificamos que la batería tenga al menos 85% de salud, que la pantalla no tenga píxeles muertos, que todos los botones funcionen correctamente, y que la conectividad Wi-Fi y Bluetooth operen sin problemas.`,
  },
  {
    slug: "macbooks",
    name: "MacBooks",
    shortName: "MacBook",
    h1: "MacBooks Reacondicionados en Perú",
    metaTitle: "MacBooks Reacondicionados en Perú | MacBook Air y Pro — itechperu.shop",
    metaDescription:
      "Compra MacBooks reacondicionados en Perú: MacBook Air M2 y MacBook Pro M3 verificados con garantía. Envío nacional. Calidad Apple garantizada.",
    keywords: ["macbook reacondicionado peru", "macbook air lima", "macbook pro peru", "macbook usada peru", "apple macbook peru"],
    dbCategory: "MACBOOK",
    content: `Los MacBooks reacondicionados de itechperu.shop son la opción inteligente para acceder a la experiencia Apple en Perú sin pagar los precios inflados de los equipos nuevos. Cada MacBook es verificado con nuestro protocolo de 47 puntos de inspección técnica, asegurando que recibas un equipo con el mismo desempeño que uno nuevo.

Ofrecemos dos líneas principales: MacBook Air, ideal para estudiantes, profesionales y nómadas digitales que valoran la portabilidad extrema y la batería de hasta 18 horas; y MacBook Pro, diseñado para creadores de contenido, desarrolladores y profesionales que requieren potencia de renderizado y edición de video en 4K u 8K.

Todos nuestros MacBooks incluyen garantía real de 3 a 6 meses. El sistema de grados te permite elegir según tu presupuesto: Grado A+ (Como Nuevo) con 6 meses de garantía y sin marcas de uso, Grado A (Excelente) con 4 meses, y Grado B (Muy Bueno) con 3 meses. En todos los casos, la batería está garantizada con al menos 85% de salud.

El envío es gratuito en Lima Metropolitana para compras superiores a S/1,500, con entrega express en 24 a 48 horas. Para provincias, ofrecemos envío nacional con tiempos de 3 a 7 días. Aceptamos Mercado Pago con opción de hasta 12 cuotas con tarjeta de crédito, además de Yape, PLIN y efectivo. En Lima también ofrecemos pago contraentrega.

Cada MacBook viene con su cargador original, cable MagSafe o USB-C según el modelo, y nuestra caja Deluxe itechperu. Verificamos cada puerto, la pantalla Liquid Retina o XDR, el teclado, el trackpad, los altavoces, los micrófonos y todas las funciones de conectividad. Garantizamos que ningún equipo tiene reporte de robo o pérdida, con verificación en SISATEC.`,
  },
  {
    slug: "laptops",
    name: "Laptops",
    shortName: "Laptop",
    h1: "Laptops Corporativas Reacondicionadas en Perú",
    metaTitle: "Laptops Corporativas Reacondicionadas en Perú | Dell, HP, Lenovo — itechperu.shop",
    metaDescription:
      "Laptops corporativas reacondicionadas en Perú: Dell Latitude, HP EliteBook, Lenovo ThinkPad verificadas con garantía. Envío nacional. Mejor precio.",
    keywords: ["laptops reacondicionadas peru", "laptop corporativa lima", "dell latitude peru", "hp elitebook peru", "lenovo thinkpad peru"],
    dbCategory: "LAPTOP",
    content: `Las laptops corporativas reacondicionadas de itechperu.shop provienen de flotas empresariales que renuevan sus equipos periódicamente. Esto significa que adquiere laptops de calidad empresarial (Dell Latitude, HP EliteBook, Lenovo ThinkPad) a precios accesibles, con la robustez y durabilidad que solo los equipos corporativos ofrecen.

A diferencia de las laptops de consumo masivo, las laptops corporativas están diseñadas para soportar uso intensivo, con chasis reforzados, teclados resistentes a derrames, y componentes de mayor calidad. Son ideales para profesionales, estudiantes universitarios, emprendedores y cualquier persona que necesite un equipo confiable para trabajo diario.

Cada laptop pasa por nuestro protocolo de 47 puntos de inspección. Verificamos procesador, memoria RAM, almacenamiento SSD, batería (mínimo 85% de salud), pantalla, teclado, trackpad, puertos USB, HDMI, conectividad Wi-Fi y Bluetooth, cámara web, micrófono y altavoces. Solo los equipos que pasan todas las pruebas se ponen a la venta.

Ofrecemos garantía real de 3 a 6 meses según el grado de condición. El Grado A+ incluye 6 meses, el Grado A 4 meses, y el Grado B 3 meses. Adicionalmente, tienes 7 días para devolver el equipo si no quedas satisfecho, sin preguntas ni letra pequeña.

El envío es gratis en Lima para compras sobre S/1,500, con entrega en 24-48 horas. Para provincias, coordinamos envíos nacionales. Aceptamos Mercado Pago (tarjeta, Yape, PLIN, efectivo) y contraentrega en Lima. También ofrecemos financing con hasta 12 cuotas sin intereses según promociones vigentes.`,
  },
  {
    slug: "accesorios",
    name: "Accesorios",
    shortName: "Accesorio",
    h1: "Accesorios para Apple y Laptops en Perú",
    metaTitle: "Accesorios Apple y Laptops en Perú | Cargadores, Fundas, Cables — itechperu.shop",
    metaDescription:
      "Accesorios originales y compatibles para Apple y laptops en Perú: cargadores, fundas, cables, teclados. Envío nacional. Calidad garantizada.",
    keywords: ["accesorios apple peru", "cargador macbook peru", "funda ipad peru", "cable usb-c peru", "teclado laptop peru"],
    dbCategory: "ACCESORIO",
    content: `En itechperu.shop ofrecemos una selección curada de accesorios originales y compatibles para tu iPad, MacBook o laptop corporativa. Cada accesorio es verificado para garantizar compatibilidad y rendimiento óptimo con tu equipo.

Nuestro catálogo incluye cargadores originales Apple de 20W, 30W, 70W y 140W según el modelo, cables USB-C trenzados de alta durabilidad, fundas protectoras de microfibra y cuero vegano, teclados Bluetooth como el Logitech MX Keys, mouses Magic Mouse y trackpads Magic Trackpad, además de adaptadores y hubs USB-C para expandir la conectividad de tu MacBook.

Todos los accesorios incluyen garantía de 3 meses contra defectos de fábrica. Los cargadores y cables originales Apple vienen en su empaque sellado. Los accesorios compatibles son seleccionados por su calidad probada, no vendemos productos genéricos de baja calidad que puedan dañar tu equipo.

El envío es gratuito en Lima Metropolitana para compras combinadas sobre S/1,500. Para accesorios individuales, el costo de envío en Lima es de S/15. Aceptamos Mercado Pago y contraentrega en Lima. Todos los accesorios se envían en empaque protector para garantizar que lleguen en perfectas condiciones.`,
  },
  {
    slug: "repuestos",
    name: "Repuestos",
    shortName: "Repuesto",
    h1: "Repuestos para MacBook y Laptops en Perú",
    metaTitle: "Repuestos para MacBook y Laptops en Perú | Pantallas, Baterías, Teclados — itechperu.shop",
    metaDescription:
      "Repuestos originales para MacBook y laptops en Perú: pantallas, baterías, teclados, SSD, memoria RAM. Servicio técnico especializado en Lima.",
    keywords: ["repuestos macbook peru", "pantalla macbook lima", "bateria laptop peru", "ssd laptop lima", "memoria ram laptop peru"],
    dbCategory: "ACCESORIO",
    content: `Los repuestos de itechperu.shop son la solución para mantener tu MacBook o laptop funcionando como nuevo. Ofrecemos repuestos originales y compatibles de alta calidad, con servicio de instalación técnica opcional en nuestro taller especializado en Lima.

Disponemos de pantallas Liquid Retina para MacBook Air y Pro, baterías originales Apple con certificación de salud, teclados completos para todas las generaciones, trackpads, pantallas para iPad Pro y Air, SSDs Samsung y Kingston para upgrades de almacenamiento, módulos de memoria RAM de marcas premium, y flex cables para reparaciones internas.

Cada repuesto incluye garantía de 3 meses contra defectos de fábrica. Si prefieres que nuestros técnicos realicen la instalación, ofrecemos servicio técnico especializado con garantía de 90 días sobre la mano de obra. El diagnóstico es gratuito y se realiza en menos de 24 horas.

Trabajamos exclusivamente con repuestos verificados. No vendemos piezas de origen dudoso que puedan comprometer la seguridad de tu equipo. Todos los repuestos son probados antes de ser despachados. Para envíos, coordinamos entrega segura en Lima Metropolitana y envíos nacionales con seguro incluido.`,
  },
  {
    slug: "monitores",
    name: "Monitores",
    shortName: "Monitor",
    h1: "Monitores Reacondicionados en Perú",
    metaTitle: "Monitores Reacondicionados en Perú | Dell, HP, LG, Samsung — itechperu.shop",
    metaDescription:
      "Monitores reacondicionados en Perú: Dell, HP, LG y Samsung verificados con garantía. Ideal para home office y gaming. Envío nacional.",
    keywords: ["monitor reacondicionado peru", "monitor dell peru", "monitor hp lima", "monitor lg peru", "monitor gaming peru"],
    dbCategory: "ACCESORIO",
    content: `Los monitores reacondicionados de itechperu.shop ofrecen calidad de visualización profesional a precios accesibles. Contamos con monitores de marcas líderes como Dell, HP, LG y Samsung, ideales para home office, diseño gráfico, programación y gaming.

Cada monitor es verificado en todos sus puertos (HDMI, DisplayPort, USB-C), se comprueba que no tenga píxeles muertos, que la retroiluminación funcione uniformemente, y que los ajustes de color y brillo operen correctamente. Solo los monitores que pasan todas las pruebas se ponen a la venta.

Disponemos de monitores desde 24 hasta 32 pulgadas, con resoluciones desde Full HD hasta 4K UHD. Incluimos opciones con panel IPS para diseño gráfico, paneles con alta tasa de refresco para gaming, y monitores ultrawide para productividad. Todos incluyen base, cable de poder y cable de video.

Los monitores incluyen garantía de 3 meses. El envío es seguro con empaque reforzado para evitar daños en transporte. En Lima, la entrega es en 24-48 horas. Para provincias, coordinamos envío con seguro. Aceptamos Mercado Pago y contraentrega en Lima Metropolitana.`,
  },
  {
    slug: "almacenamiento",
    name: "Almacenamiento",
    shortName: "SSD/HDD",
    h1: "SSD y Almacenamiento para Laptops en Perú",
    metaTitle: "SSD para Laptop en Perú | Samsung, Kingston, WD — itechperu.shop",
    metaDescription:
      "SSD y discos para laptops en Perú: Samsung 990 Pro, Kingston, WD verificados con garantía. Mejora el rendimiento de tu laptop. Envío nacional.",
    keywords: ["ssd laptop peru", "ssd samsung peru", "disco ssd lima", "almacenamiento laptop peru", "upgrade ssd peru"],
    dbCategory: "ACCESORIO",
    content: `El almacenamiento SSD es la mejora más impactante que puedes hacer a tu laptop. En itechperu.shop ofrecemos SSDs de las mejores marcas: Samsung (990 Pro, 980, 870 EVO), Kingston (KC3000, A2000), Western Digital (WD Black, WD Blue) y Crucial (P3 Plus, MX500).

Un upgrade a SSD puede multiplicar por 10 la velocidad de tu laptop. Los tiempos de arranque pasan de minutos a segundos, las aplicaciones abren instantáneamente, y la transferencia de archivos es ultra rápida. Si tu laptop aún usa disco mecánico (HDD), el cambio a SSD es obligatorio.

Disponemos de SSDs NVMe M.2 (los más rápidos, hasta 7000 MB/s) y SSDs SATA 2.5" (para laptops más antiguas). Capacidades desde 250GB hasta 4TB. Todos los SSDs son nuevos con garantía de fábrica, no vendemos SSDs reacondicionados para almacenamiento porque la vida útil de la memoria flash es crítica.

Ofrecemos servicio de instalación y migración de datos opcional. Nuestros técnicos pueden clonar tu disco actual al nuevo SSD, conservando todos tus archivos, programas y configuraciones. El servicio incluye optimización del sistema para aprovechar al máximo la velocidad del SSD. Garantía de 90 días sobre la mano de obra.`,
  },
  {
    slug: "redes",
    name: "Redes",
    shortName: "Redes",
    h1: "Equipos de Red para Empresas y Hogar en Perú",
    metaTitle: "Equipos de Red en Perú | Routers, Switches, Access Points — itechperu.shop",
    metaDescription:
      "Equipos de red reacondicionados en Perú: routers, switches y access points verificados. Cisco, TP-Link, Ubiquiti. Envío nacional.",
    keywords: ["equipos red peru", "router cisco peru", "switch tp-link lima", "access point peru", "redes empresariales peru"],
    dbCategory: "ACCESORIO",
    content: `Los equipos de red de itechperu.shop son ideales para empresas que necesitan infraestructura confiable sin invertir en equipos nuevos. Contamos con routers, switches y access points de marcas líderes como Cisco, TP-Link, Ubiquiti y MikroTik.

Cada equipo de red es reseteado a configuración de fábrica, verificado en todos sus puertos, y probado bajo carga para garantizar estabilidad. Los switches managed incluyen licencia verificada. Los access points se prueban con múltiples clientes simultáneos para verificar throughput y estabilidad.

Disponemos de switches desde 8 hasta 48 puertos, routers empresariales con VPN, access points WiFi 6, y kits de mesh para cobertura completa. Todos los equipos incluyen fuente de poder y cable de consola (si aplica). La configuración inicial es gratuita si nos proporcionas los parámetros de tu red.

Los equipos de red incluyen garantía de 3 meses. Para empresas, ofrecemos facturación electrónica y soporte técnico post-venta. El envío es seguro con empaque anti-estático. En Lima, entrega en 24-48 horas. Para provincias, coordinamos envío con seguro incluido.`,
  },
];

export function getCategoryBySlug(slug: string): CategorySEO | undefined {
  return CATEGORIES_SEO.find((c) => c.slug === slug);
}

// ============================
// COLECCIONES
// ============================

export interface CollectionSEO {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  filter: (p: { category: string; basePrice: number; soldCount: number; grades: { grade: string }[] }) => boolean;
}

export const COLLECTIONS_SEO: CollectionSEO[] = [
  {
    slug: "ofertas",
    name: "Ofertas Deluxe",
    h1: "Ofertas Deluxe — Tecnología Premium a Precio Inteligente",
    metaTitle: "Ofertas Deluxe en Tecnología Premium | Hasta 30% Off — itechperu.shop",
    metaDescription:
      "Aprovecha las ofertas Deluxe en iPads, MacBooks y laptops reacondicionadas en Perú. Hasta 30% de descuento con garantía real. Envío nacional.",
    content:
      "Nuestras ofertas Deluxe te permiten acceder a tecnología premium reacondicionada a precios aún más inteligentes. Cada producto en oferta mantiene la misma garantía y verificación de 47 puntos que nuestros productos regulares.",
    filter: () => true,
  },
  {
    slug: "destacados",
    name: "Destacados",
    h1: "Productos Destacados — Lo Mejor de itechperu.shop",
    metaTitle: "Productos Destacados | iPads y MacBooks Más Vendidos — itechperu.shop",
    metaDescription:
      "Descubre los productos más vendidos de itechperu.shop: iPads y MacBooks reacondicionados preferidos por nuestros clientes en Perú. Garantía real.",
    content:
      "Los productos destacados son los favoritos de nuestros clientes. Seleccionados según calificaciones, número de ventas y satisfacción post-compra. Cada destacado representa lo mejor de nuestro catálogo.",
    filter: (p) => p.soldCount > 50,
  },
  {
    slug: "nuevos-ingresos",
    name: "Nuevos Ingresos",
    h1: "Nuevos Ingresos — Lo Último en Tecnología Reacondicionada",
    metaTitle: "Nuevos Ingresos | Últimos Equipos Reacondicionados — itechperu.shop",
    metaDescription:
      "Descubre los últimos equipos reacondicionados que llegaron a itechperu.shop. iPads, MacBooks y laptops nuevos en stock. Garantía real.",
    content:
      "Nuevos ingresos cada semana. Suscríbete a nuestro WhatsApp VIP para ser el primero en enterarte de los nuevos equipos disponibles.",
    filter: () => true,
  },
  {
    slug: "grado-a-plus",
    name: "Grado A+ (Como Nuevo)",
    h1: "Grado A+ — Equipos Como Nuevo con Garantía Extendida",
    metaTitle: "Grado A+ Como Nuevo | Equipos Reacondicionados Premium — itechperu.shop",
    metaDescription:
      "Equipos reacondicionados Grado A+ (Como Nuevo) en Perú. Sin marcas de uso, batería ≥ 95%, garantía 6 meses. Calidad Apple a precio inteligente.",
    content:
      "El Grado A+ es nuestra máxima condición de reacondicionado. Equipos sin marcas de uso, batería con al menos 95% de salud, caja original incluida, y garantía extendida de 6 meses.",
    filter: (p) => p.grades.some((g) => g.grade === "A+"),
  },
];

export function getCollectionBySlug(slug: string): CollectionSEO | undefined {
  return COLLECTIONS_SEO.find((c) => c.slug === slug);
}

// ============================
// BLOG POSTS
// ============================

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  keywords: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "como-elegir-un-ssd",
    title: "Cómo elegir un SSD para tu laptop en Perú",
    metaTitle: "Cómo Elegir un SSD para tu Laptop en Perú | Guía 2026 — itechperu.shop",
    metaDescription:
      "Guía completa para elegir el SSD correcto para tu laptop en Perú. Tipos NVMe vs SATA, capacidades, marcas recomendadas y precios actualizados.",
    excerpt:
      "Aprende a elegir el SSD correcto para tu laptop: NVMe vs SATA, capacidades, marcas recomendadas y cómo instalarlo.",
    category: "Guías de compra",
    author: "Equipo itechperu",
    publishedAt: "2026-06-15",
    readTime: "8 min",
    keywords: ["ssd peru", "como elegir ssd", "ssd nvme peru", "upgrade laptop peru"],
    content: `Elegir el SSD correcto para tu laptop puede marcar una diferencia enorme en el rendimiento. En esta guía te explicamos todo lo que necesitas saber.

## ¿Por qué actualizar a un SSD?

Si tu laptop todavía usa un disco duro mecánico (HDD), cambiarlo por un SSD es la mejora más impactante que puedes hacer. Los beneficios son inmediatos: arranque en segundos, aplicaciones que abren instantáneamente, y transferencia de archivos ultra rápida.

## Tipos de SSD

### SSD NVMe M.2
Los SSDs NVMe son los más rápidos del mercado, con velocidades de hasta 7000 MB/s. Se conectan directamente a la placa base mediante un slot M.2. Son ideales para laptops modernas (2018 en adelante).

### SSD SATA 2.5"
Los SSDs SATA son más lentos (hasta 550 MB/s) pero compatibles con prácticamente cualquier laptop. Tienen formato de 2.5 pulgadas, igual que los HDD tradicionales.

## Capacidades recomendadas

- 250GB: Mínimo para uso básico (ofimática, navegación)
- 500GB: Recomendado para la mayoría de usuarios
- 1TB: Ideal si guardas muchos archivos multimedia
- 2TB+: Para profesionales de video/foto

## Marcas recomendadas

1. Samsung (990 Pro, 980, 870 EVO) — La mejor calidad
2. Kingston (KC3000, A2000) — Excelente relación calidad-precio
3. Western Digital (WD Black, WD Blue) — Muy confiables
4. Crucial (P3 Plus, MX500) — Buena opción económica

## Instalación

En itechperu.shop ofrecemos servicio de instalación con migración de datos incluida. Nuestros técnicos clonan tu disco actual al nuevo SSD, conservando todos tus archivos y programas.`,
  },
  {
    slug: "repuestos-originales-vs-genericos",
    title: "Repuestos originales vs genéricos: ¿vale la pena?",
    metaTitle: "Repuestos Originales vs Genéricos para MacBook | Guía — itechperu.shop",
    metaDescription:
      "Repuestos originales vs genéricos para MacBook y laptops en Perú. Análisis de calidad, precio y riesgos. Recomendaciones de expertos.",
    excerpt:
      "¿Repuestos originales o genéricos? Analizamos calidad, precio y riesgos para que tomes la mejor decisión.",
    category: "Guías de compra",
    author: "Equipo itechperu",
    publishedAt: "2026-06-10",
    readTime: "6 min",
    keywords: ["repuestos originales peru", "repuestos genericos macbook", "repuestos laptop peru"],
    content: `La eterna duda al reparar tu MacBook o laptop: ¿usar repuestos originales o genéricos? En esta guía analizamos pros, contras y cuándo vale la pena cada opción.

## Repuestos originales

Los repuestos originales (OEM) son fabricados por la misma marca del equipo (Apple, Dell, HP). Garantizan compatibilidad total, calidad de fabricación y durabilidad óptima.

**Ventajas:**
- Compatibilidad 100% garantizada
- Calidad de fabricación superior
- Durabilidad probada
- Mantienen la garantía del equipo

**Desventajas:**
- Precio más alto (2x a 5x vs genéricos)
- Disponibilidad limitada
- Tiempos de importación

## Repuestos genéricos

Los repuestos genéricos (aftermarket) son fabricados por terceros. Hay mucha variación en calidad: algunos son excelentes, otros son peligrosos.

**Ventajas:**
- Precio significativamente menor
- Disponibilidad inmediata
- Variedad de opciones

**Desventajas:**
- Calidad variable
- Pueden dañar el equipo
- Sin garantía del fabricante

## Nuestra recomendación

Para pantallas y baterías: SIEMPRE originales. Un repuesto genérico de pantalla puede tener colores incorrectos, y una batería genérica puede ser peligrosa.

Para SSDs y RAM: genéricos de marcas reconocidas (Samsung, Kingston, Crucial) son perfectamente seguros.

Para cables y adaptadores: genéricos certificados son aceptables.`,
  },
  {
    slug: "cuando-cambiar-bateria-laptop",
    title: "¿Cuándo cambiar la batería de tu laptop?",
    metaTitle: "Cuándo Cambiar la Batería de tu Laptop | Señales — itechperu.shop",
    metaDescription:
      "Señales claras de que necesitas cambiar la batería de tu laptop o MacBook. Cómo verificar la salud de la batería y cuándo reemplazarla.",
    excerpt:
      "Señales de que tu batería necesita reemplazo, cómo verificar su salud y cuándo es momento de cambiarla.",
    category: "Mantenimiento",
    author: "Equipo itechperu",
    publishedAt: "2026-06-05",
    readTime: "5 min",
    keywords: ["cambiar bateria laptop", "bateria macbook peru", "salud bateria laptop"],
    content: `La batería es uno de los componentes que más se degrada con el uso. Te explicamos cuándo es momento de cambiarla.

## Señales de que necesitas cambiar la batería

1. La batería no dura más de 2-3 horas
2. El porcentaje baja bruscamente (de 40% a 5% en minutos)
3. La laptop se apaga sin avisar
4. La batería se hincha (¡peligroso!)
5. El sistema muestra "Servicio recomendado"

## Cómo verificar la salud de la batería

### En Mac
- Option + click en el ícono de batería
- O: Información del Sistema → Energía → Ciclos y condición

### En Windows
- Abre CMD como administrador
- Ejecuta: powercfg /batteryreport
- Abre el archivo HTML generado

## ¿Cuántos ciclos dura una batería?

- MacBook: 1000 ciclos (hasta 80% de capacidad)
- Laptops Windows: 500-1000 ciclos según fabricante

## Reemplazo en itechperu.shop

Ofrecemos baterías originales Apple y compatibles de alta calidad para laptops. Servicio de instalación con garantía de 90 días sobre la mano de obra.`,
  },
  {
    slug: "mejores-laptops-para-negocios",
    title: "Mejores laptops para negocios en Perú 2026",
    metaTitle: "Mejores Laptops para Negocios en Perú 2026 | Ranking — itechperu.shop",
    metaDescription:
      "Ranking de las mejores laptops para negocios en Perú 2026: MacBook Air, Dell Latitude, HP EliteBook, Lenovo ThinkPad. Comparativa y precios.",
    excerpt:
      "Ranking actualizado de las mejores laptops para negocios en Perú. Comparativa de modelos, precios y recomendaciones.",
    category: "Guías de compra",
    author: "Equipo itechperu",
    publishedAt: "2026-06-01",
    readTime: "10 min",
    keywords: ["mejores laptops negocios peru", "laptop empresarial lima", "laptop trabajo peru"],
    content: `Seleccionamos las mejores laptops para negocios disponibles en Perú en 2026, considerando rendimiento, durabilidad, soporte y relación calidad-precio.

## 1. MacBook Air M2 — El todo-terreno

El MacBook Air M2 es la laptop perfecta para la mayoría de profesionales. Batería de 18 horas, silencioso (sin ventilador), y potencia suficiente para cualquier tarea de oficina.

## 2. Dell Latitude 7430 — La corporativa

Las Dell Latitude son el estándar empresarial. Construcción robusta, teclado excelente, y soporte extendido. Ideales para empresas que necesitan flotas de equipos.

## 3. HP EliteBook 840 — La versátil

Las HP EliteBook ofrecen excelente relación calidad-precio. Pantalla brillante, buen audio, y seguridad empresarial integrada.

## 4. Lenovo ThinkPad T14 — La indestructible

Los ThinkPad son legendarios por su durabilidad. Teclado mecánico superior, chasis reforzado, y soporte para Linux.

## ¿Reacondicionada o nueva?

Para negocios, las laptops reacondicionadas corporativas son la opción más inteligente: misma calidad, menor precio, y garantía real. En itechperu.shop verificamos cada equipo con 47 puntos de inspección.`,
  },
  {
    slug: "errores-comunes-al-comprar-macbook-usada",
    title: "Errores comunes al comprar una MacBook usada",
    metaTitle: "Errores Comunes al Comprar MacBook Usada | Guía — itechperu.shop",
    metaDescription:
      "Los 7 errores más comunes al comprar una MacBook usada en Perú y cómo evitarlos. Verificación de IMEI, batería, pantalla y más.",
    excerpt:
      "Evita estos 7 errores al comprar una MacBook usada en Perú. Guía completa de verificación.",
    category: "Guías de compra",
    author: "Equipo itechperu",
    publishedAt: "2026-05-28",
    readTime: "7 min",
    keywords: ["comprar macbook usada peru", "errores macbook usada", "verificar macbook usada"],
    content: `Comprar una MacBook usada puede ser una excelente inversión... o un dolor de cabeza. Estos son los errores más comunes y cómo evitarlos.

## Error 1: No verificar el reporte de robo

Siempre verifica el número de serie en SISATEC (Perú) y en el sitio de Apple. Una MacBook reportada como robada no se puede activar.

## Error 2: Ignorar la salud de la batería

Una batería con menos de 80% de salud necesita reemplazo pronto ($100-$200 adicionales). Verifica los ciclos de carga.

## Error 3: No revisar la pantalla

Busca píxeles muertos, manchas, y problemas de retroiluminación. Una pantalla de MacBook cuesta $400-$800 reemplazar.

## Error 4: Comprar sin garantía

Una MacBook usada sin garantía es una lotería. Solo compra a vendedores que ofrezcan garantía escrita de al menos 3 meses.

## Error 5: No verificar el iCloud Lock

Si la MacBook tiene Activation Lock (Find My Mac activado), NO la compres. No podrás usarla sin la contraseña del anterior dueño.

## Error 6: Ignorar los puertos

Prueba TODOS los puertos: USB-C, HDMI, audio. Un puerto dañado significa problemas futuros.

## Error 7: Pagar demasiado

Compara precios. Una MacBook reacondicionada verificada con garantía debería costar 40-60% menos que nueva.

## La solución segura

En itechperu.shop hacemos toda esta verificación por ti. 47 puntos de inspección, garantía real de 3-6 meses, y 7 días de devolución.`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

// ============================
// LANDING PAGES SEO TRANSACCIONALES
// ============================

export interface LandingPage {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  keywords: string[];
  faqs: { q: string; a: string }[];
  relatedCategories: string[];
}

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "repuestos-macbook-peru",
    title: "Repuestos para MacBook en Perú",
    h1: "Repuestos para MacBook en Perú — Originales y Garantizados",
    metaTitle: "Repuestos para MacBook en Perú | Pantallas, Baterías, Teclados — itechperu.shop",
    metaDescription:
      "Repuestos originales para MacBook en Perú: pantallas Liquid Retina, baterías Apple, teclados, trackpads. Servicio técnico especializado en Lima. Garantía real.",
    keywords: ["repuestos macbook peru", "pantalla macbook lima", "bateria macbook peru", "teclado macbook peru", "servicio tecnico macbook lima"],
    relatedCategories: ["repuestos", "macbooks"],
    content: `¿Buscas repuestos para tu MacBook en Perú? En itechperu.shop ofrecemos repuestos originales y compatibles de alta calidad, con servicio técnico especializado en Lima.

## Repuestos disponibles para MacBook

### Pantallas para MacBook
Disponemos de pantallas Liquid Retina para MacBook Air (M1, M2, M3) y MacBook Pro (13", 14", 16"). Todas las pantallas son verificadas para garantizar que no tengan píxeles muertos, que la retroiluminación funcione correctamente, y que True Tone esté operativo.

### Baterías para MacBook
Ofrecemos baterías originales Apple con certificación de salud. Cada batería es probada para verificar que mantenga al menos 90% de capacidad. Incluimos baterías para MacBook Air (2018-2024) y MacBook Pro (2016-2024).

### Teclados para MacBook
Teclados completos para MacBook, incluyendo el mecanismo Magic Keyboard (2020+) y Butterfly (2016-2019). Repuestos originales que restauran la experiencia de escritura de fábrica.

### Trackpads para MacBook
Trackpads Force Touch originales para MacBook Air y Pro. Si tu trackpad no responde correctamente o tiene zonas muertas, podemos reemplazarlo.

### SSDs para MacBook
Upgrades de almacenamiento para MacBook: SSDs originales Apple y compatibles de alta velocidad. Aumenta tu MacBook de 256GB a 1TB o 2TB.

## Servicio técnico especializado

Contamos con taller técnico especializado en reparación de MacBook en Lima. Nuestros técnicos están certificados y utilizan herramientas especializadas para cada modelo.

### Proceso de reparación
1. Diagnóstico gratuito (24 horas)
2. Cotización detallada con repuestos
3. Aprobación del cliente
4. Reparación con repuestos originales
5. Pruebas de funcionamiento
6. Entrega con garantía de 90 días

## Garantía

Todos los repuestos incluyen garantía de 3 meses contra defectos de fábrica. La mano de obra tiene garantía de 90 días. Si el problema se repite dentro del período de garantía, lo reparamos sin costo.

## ¿Por qué elegir itechperu.shop?

- Repuestos originales verificados
- Técnicos certificados
- Garantía real por escrito
- Precios transparentes
- 7 días de devolución
- Más de 500 clientes satisfechos
- Calificación 4.9/5

## Cobertura

Atendemos en todo Lima Metropolitana. Para provincias, coordinamos envío de repuestos con seguro incluido. El servicio técnico (instalación) está disponible únicamente en Lima.`,
    faqs: [
      {
        q: "¿Los repuestos para MacBook son originales?",
        a: "Sí, ofrecemos repuestos originales Apple y compatibles de alta calidad claramente identificados. Los repuestos críticos (pantallas, baterías) son siempre originales.",
      },
      {
        q: "¿Cuánto cuesta cambiar la pantalla de un MacBook?",
        a: "El costo varía según el modelo. MacBook Air: desde S/1,200. MacBook Pro 14\": desde S/1,800. Incluye pantalla original, instalación y garantía de 90 días.",
      },
      {
        q: "¿Hacen servicio técnico en provincias?",
        a: "El servicio técnico (instalación) está disponible solo en Lima. Para provincias, enviamos los repuestos con guía de instalación o puedes enviar tu equipo a Lima.",
      },
      {
        q: "¿Cuánto tiempo toma una reparación de MacBook?",
        a: "La mayoría de reparaciones (pantalla, batería, teclado) toman 24-48 horas. Reparaciones complejas pueden tomar 3-5 días hábiles.",
      },
      {
        q: "¿Qué garantía tienen los repuestos?",
        a: "Los repuestos tienen 3 meses de garantía contra defectos de fábrica. La mano de obra tiene 90 días de garantía.",
      },
    ],
  },
  {
    slug: "repuestos-laptop-hp-peru",
    title: "Repuestos para Laptop HP en Perú",
    h1: "Repuestos para Laptop HP en Perú — EliteBook, Pavilion, ProBook",
    metaTitle: "Repuestos para Laptop HP en Perú | Pantallas, Baterías, Teclados — itechperu.shop",
    metaDescription:
      "Repuestos para laptop HP en Perú: EliteBook, Pavilion, ProBook. Pantallas, baterías, teclados, SSD. Servicio técnico en Lima. Garantía real.",
    keywords: ["repuestos hp peru", "pantalla hp lima", "bateria hp peru", "teclado hp peru", "servicio tecnico hp lima"],
    relatedCategories: ["repuestos", "laptops"],
    content: `¿Necesitas repuestos para tu laptop HP en Perú? En itechperu.shop tenemos repuestos originales y compatibles para todas las líneas HP: EliteBook, Pavilion, ProBook, Envy y Omen.

## Repuestos disponibles para HP

### Pantallas para laptop HP
Pantallas LCD y LED para HP EliteBook, Pavilion y ProBook. Disponibles en 14", 15.6" y 17.3" con resoluciones HD, Full HD y 4K. Todas verificadas sin píxeles muertos.

### Baterías para laptop HP
Baterías originales HP y compatibles de alta calidad. Modelos disponibles para EliteBook 840, 1040, Pavilion 15, ProBook 450 y más. Garantía de 6 meses.

### Teclados para laptop HP
Teclados completos con retroiluminación para HP EliteBook y Pavilion. Disponibles en layout español e inglés. Instalación profesional incluida.

### SSDs para laptop HP
Upgrades de SSD para HP: Samsung 990 Pro, Kingston KC3000, WD Black. Mejora la velocidad de tu HP hasta 10x. Migración de datos incluida.

### Memoria RAM para HP
Módulos de RAM DDR4 y DDR5 para HP EliteBook y ProBook. Aumenta tu RAM de 8GB a 16GB o 32GB para mejor multitarea.

## Modelos HP compatibles

- HP EliteBook 840 G7, G8, G9, G10
- HP EliteBook 1040 G7, G8
- HP ProBook 450 G8, G9
- HP Pavilion 15 (todas las generaciones)
- HP Envy 13, 14, 15
- HP Omen 15, 16 (gaming)

## Servicio técnico HP en Lima

Nuestro taller en Lima está especializado en reparación de laptops HP. Diagnóstico gratuito en 24 horas, repuestos originales, y garantía de 90 días sobre la mano de obra.

## ¿Por qué elegir itechperu.shop para tu HP?

- Especialistas en línea corporativa HP (EliteBook, ProBook)
- Repuestos originales verificados
- Técnicos con experiencia en HP
- Garantía real por escrito
- Precios 40-60% menores que el servicio oficial
- Más de 500 clientes satisfechos`,
    faqs: [
      {
        q: "¿Tienen repuestos para HP EliteBook 840 G8?",
        a: "Sí, tenemos pantallas, baterías, teclados, SSDs y RAM para HP EliteBook 840 G8. Todos los repuestos son originales o compatibles de alta calidad.",
      },
      {
        q: "¿Cuánto cuesta cambiar la batería de una HP Pavilion?",
        a: "El cambio de batería para HP Pavilion cuesta entre S/180 y S/350 según el modelo, incluyendo batería original e instalación.",
      },
      {
        q: "¿Hacen upgrade de SSD en laptops HP?",
        a: "Sí, realizamos upgrades de SSD para todas las laptops HP. Incluye migración de datos del disco anterior al nuevo SSD.",
      },
      {
        q: "¿La garantía cubre problemas posteriores?",
        a: "Sí, los repuestos tienen 3 meses de garantía y la mano de obra 90 días. Si el problema se repite, lo reparamos sin costo.",
      },
    ],
  },
  {
    slug: "baterias-para-laptop-lima",
    title: "Baterías para Laptop en Lima",
    h1: "Baterías para Laptop en Lima — Originales y Compatibles",
    metaTitle: "Baterías para Laptop en Lima | Apple, Dell, HP, Lenovo — itechperu.shop",
    metaDescription:
      "Baterías para laptop en Lima: Apple, Dell, HP, Lenovo, Acer. Originales y compatibles con garantía. Instalación profesional. 24-48h.",
    keywords: ["baterias laptop lima", "bateria macbook peru", "bateria dell lima", "bateria hp peru", "bateria lenovo peru"],
    relatedCategories: ["repuestos"],
    content: `¿La batería de tu laptop ya no dura? En itechperu.shop ofrecemos baterías originales y compatibles para todas las marcas en Lima, con instalación profesional y garantía.

## Baterías disponibles por marca

### Baterías para MacBook
Baterías originales Apple para MacBook Air (M1, M2, M3) y MacBook Pro (todas las generaciones desde 2016). Garantía de 6 meses.

### Baterías para Dell
Baterías para Dell Latitude (5420, 7420, 7430, 9430), Dell XPS 13 y 15, Dell Inspiron. Originales y compatibles premium.

### Baterías para HP
Baterías para HP EliteBook (840, 1040), HP ProBook (450, 650), HP Pavilion, HP Envy. Todas las generaciones disponibles.

### Baterías para Lenovo
Baterías para Lenovo ThinkPad (T14, T490, X1 Carbon), Lenovo IdeaPad, Lenovo Yoga. Originales y compatibles.

### Baterías para Acer y Asus
Baterías para Acer Aspire, Acer Swift, Asus ZenBook, Asus VivoBook. Disponibilidad según modelo.

## ¿Cómo saber si necesitas cambiar la batería?

Señales de que tu batería necesita reemplazo:
- Duración menor a 2 horas con uso normal
- El porcentaje baja bruscamente
- La laptop se apaga sin avisar
- Mensaje del sistema: "Recomendación de servicio"
- La batería está hinchada (¡urgente!)

## Verificación de salud de batería

En Mac: Option + click en el ícono de batería, o Información del Sistema → Energía.
En Windows: Ejecuta powercfg /batteryreport en CMD.

Si tu batería tiene menos de 80% de capacidad o más de 500 ciclos, es momento de cambiarla.

## Instalación profesional

Ofrecemos servicio de instalación profesional en nuestro taller de Lima. El proceso toma 1-2 horas e incluye:
- Diagnóstico de la batería actual
- Instalación de la nueva batería
- Calibración de la batería
- Pruebas de funcionamiento
- Limpieza interior del equipo

## Garantía

Todas las baterías incluyen garantía de 3 a 6 meses según el tipo. La instalación tiene garantía de 90 días sobre la mano de obra.

## Cobertura

Atendemos en toda Lima Metropolitana con entrega en 24-48 horas. Diagnóstico gratuito. Para provincias, coordinamos envío de la batería con guía de instalación.`,
    faqs: [
      {
        q: "¿Cuánto cuesta cambiar la batería de una laptop en Lima?",
        a: "El costo varía según la marca y modelo: MacBook desde S/350, Dell/HP/Lenovo desde S/180. Incluye batería e instalación.",
      },
      {
        q: "¿Las baterías son originales?",
        a: "Ofrecemos baterías originales Apple, Dell, HP y Lenovo. También tenemos compatibles premium de alta calidad, claramente identificados.",
      },
      {
        q: "¿Cuánto tiempo toma el cambio de batería?",
        a: "La mayoría de cambios de batería toman 1-2 horas en nuestro taller de Lima. Algunos modelos requieren desarme completo y pueden tomar 24 horas.",
      },
      {
        q: "¿Hacen envíos de baterías a provincias?",
        a: "Sí, enviamos baterías a todo Perú con seguro incluido. Incluimos guía de instalación. El servicio de instalación solo está disponible en Lima.",
      },
    ],
  },
  {
    slug: "pantallas-para-macbook-peru",
    title: "Pantallas para MacBook en Perú",
    h1: "Pantallas para MacBook en Perú — Liquid Retina Original",
    metaTitle: "Pantallas para MacBook en Perú | Liquid Retina Original — itechperu.shop",
    metaDescription:
      "Pantallas originales para MacBook en Perú: Air M1/M2/M3 y Pro 13/14/16. Liquid Retina verificada. Instalación profesional en Lima.",
    keywords: ["pantalla macbook peru", "pantalla macbook air lima", "pantalla macbook pro peru", "cambiar pantalla macbook"],
    relatedCategories: ["repuestos", "macbooks"],
    content: `¿Se te rompió la pantalla de tu MacBook? En itechperu.shop ofrecemos pantallas Liquid Retina originales para todos los modelos de MacBook en Perú, con instalación profesional.

## Pantallas disponibles por modelo

### MacBook Air M1 (2020)
Pantalla Liquid Retina 13.6" original. Resolución 2560x1664, True Tone, P3 wide color.

### MacBook Air M2 (2022-2023)
Pantalla Liquid Retina 13.6" original. Resolución 2560x1664, True Tone, 500 nits.

### MacBook Air M3 (2024)
Pantalla Liquid Retina 13.6" original. Resolución 2560x1664, True Tone.

### MacBook Pro 14" M1 Pro/Max, M2 Pro/Max, M3 Pro/Max
Pantalla Liquid Retina XDR 14.2" original. Resolución 3024x1964, ProMotion, HDR, 1000 nits.

### MacBook Pro 16" M1 Max, M2 Max, M3 Max
Pantalla Liquid Retina XDR 16.2" original. Resolución 3456x2234, ProMotion, HDR.

### MacBook Pro 13" M1/M2 (2020-2022)
Pantalla Retina 13.3" original. Resolución 2560x1600, True Tone.

## Causas comunes de rotura de pantalla

- Caídas accidentales
- Golpes con objetos
- Cierre con objeto en medio
- Presión excesiva
- Defectos de fabricación (píxeles muertos)

## Proceso de reemplazo

1. **Diagnóstico gratuito**: Evaluamos el daño y verificamos si solo es la pantalla o hay otros componentes afectados.
2. **Cotización**: Te damos el precio exacto con pantalla original e instalación.
3. **Reparación**: Nuestros técnicos certificados reemplazan la pantalla con herramientas especializadas.
4. **Pruebas**: Verificamos todos los píxeles, retroiluminación, True Tone y touch (si aplica).
5. **Entrega**: Entregamos tu MacBook con garantía de 90 días.

## ¿Pantalla original o compatible?

Para MacBook recomendamos SIEMPRE pantallas originales Apple. Las pantallas compatibles pueden tener:
- Colores incorrectos (sin P3 wide color)
- Menor brillo
- True Tone no funcional
- Problemas de compatibilidad con macOS

En itechperu.shop solo usamos pantallas originales Apple para MacBook.

## Tiempo de reparación

La mayoría de reemplazos de pantalla toman 24-48 horas. Si la pantalla no está en stock, puede tomar 3-5 días hábiles para importación.

## Garantía

Todas las pantallas incluyen garantía de 3 meses contra defectos de fábrica. La instalación tiene garantía de 90 días sobre la mano de obra.`,
    faqs: [
      {
        q: "¿Cuánto cuesta cambiar la pantalla de un MacBook Air?",
        a: "El reemplazo de pantalla para MacBook Air M1/M2/M3 cuesta entre S/1,200 y S/1,500, incluyendo pantalla Liquid Retina original e instalación.",
      },
      {
        q: "¿Cuánto cuesta cambiar la pantalla de un MacBook Pro 14\"?",
        a: "El reemplazo de pantalla Liquid Retina XDR para MacBook Pro 14\" cuesta entre S/1,800 y S/2,200, incluyendo pantalla original e instalación.",
      },
      {
        q: "¿Las pantallas son originales Apple?",
        a: "Sí, exclusivamente usamos pantallas originales Apple para MacBook. Las pantallas compatibles no garantizan True Tone, P3 color ni brillo correcto.",
      },
      {
        q: "¿Cuánto tiempo toma el cambio de pantalla?",
        a: "Si la pantalla está en stock, la reparación toma 24-48 horas. Si necesita importación, puede tomar 3-5 días hábiles.",
      },
    ],
  },
  {
    slug: "cargadores-originales-laptop",
    title: "Cargadores Originales para Laptop en Perú",
    h1: "Cargadores Originales para Laptop en Perú — Apple, Dell, HP, Lenovo",
    metaTitle: "Cargadores Originales para Laptop en Perú | Apple, Dell, HP — itechperu.shop",
    metaDescription:
      "Cargadores originales para laptop en Perú: Apple 20W-140W, Dell, HP, Lenovo. USB-C y MagSafe. Envío nacional. Garantía 3 meses.",
    keywords: ["cargadores laptop peru", "cargador macbook peru", "cargador original apple lima", "cargador usb-c peru", "magsafe peru"],
    relatedCategories: ["accesorios"],
    content: `¿Perdiste o se dañó tu cargador de laptop? En itechperu.shop ofrecemos cargadores originales para todas las marcas en Perú, con garantía y envío nacional.

## Cargadores disponibles por marca

### Cargadores Apple
- Cargador USB-C de 20W (iPad)
- Cargador USB-C de 30W (MacBook Air)
- Cargador USB-C de 35W dual (MacBook Air M2)
- Cargador USB-C de 67W (MacBook Pro 14")
- Cargador USB-C de 70W (MacBook Pro 14" M3)
- Cargador USB-C de 96W (MacBook Pro 16")
- Cargador USB-C de 140W (MacBook Pro 16" M1/M2 Max)
- Cargador MagSafe 3 (MacBook Air/Pro 2021+)

### Cargadores Dell
- Cargador USB-C 65W (Latitude, XPS 13)
- Cargador USB-C 90W (Latitude, XPS 15)
- Cargador USB-C 130W (Precision)
- Cargador barrel 65W/90W (modelos antiguos)

### Cargadores HP
- Cargador USB-C 65W (EliteBook, Pavilion)
- Cargador USB-C 90W (EliteBook, ZBook)
- Cargador Smart 65W/90W (modelos antiguos)

### Cargadores Lenovo
- Cargador USB-C 65W (ThinkPad T, X)
- Cargador USB-C 90W/135W (ThinkPad P)
- Cargador Slim 65W (IdeaPad)

## ¿Por qué usar cargadores originales?

Los cargadores originales garantizan:
- Carga segura sin dañar la batería
- Velocidad de carga óptima
- Compatibilidad total con tu equipo
- Protección contra sobrecarga
- Certificación de seguridad eléctrica

Los cargadores genéricos baratos pueden:
- Dañar la batería permanentemente
- No cargar a la velocidad correcta
- Sobrecalentarse y causar incendios
- Invalidar la garantía del equipo

## ¿Cómo elegir el cargador correcto?

1. Verifica la potencia (W) en tu cargador original
2. Confirma el tipo de conector (USB-C, MagSafe, barrel)
3. Revisa el voltaje (V) y amperaje (A)
4. Compra siempre original o certificado

## Garantía

Todos los cargadores incluyen garantía de 3 meses contra defectos de fábrica. Los cargadores Apple son nuevos en empaque sellado.

## Envío

Envío gratis en Lima para compras sobre S/300. Para provincias, coordinamos envío con seguro. Aceptamos Mercado Pago y contraentrega en Lima.`,
    faqs: [
      {
        q: "¿Los cargadores son originales?",
        a: "Sí, todos nuestros cargadores son originales Apple, Dell, HP y Lenovo. Los cargadores Apple vienen en empaque sellado de fábrica.",
      },
      {
        q: "¿Puedo usar un cargador de más watiaje?",
        a: "Sí, puedes usar un cargador de mayor watiaje sin problema. Tu laptop solo tomará la energía que necesita. No daña la batería.",
      },
      {
        q: "¿Hacen envíos de cargadores a provincias?",
        a: "Sí, enviamos a todo Perú. Los cargadores son livianos, el envío es económico. Aceptamos Mercado Pago para provincias.",
      },
      {
        q: "¿Qué garantía tienen los cargadores?",
        a: "Todos los cargadores incluyen 3 meses de garantía contra defectos de fábrica. Si el cargador falla, lo reemplazamos sin costo.",
      },
    ],
  },
  {
    slug: "ssd-para-laptop-peru",
    title: "SSD para Laptop en Perú",
    h1: "SSD para Laptop en Perú — Samsung, Kingston, WD, Crucial",
    metaTitle: "SSD para Laptop en Perú | Samsung 990 Pro, Kingston, WD — itechperu.shop",
    metaDescription:
      "SSD para laptop en Perú: Samsung 990 Pro, Kingston KC3000, WD Black, Crucial. NVMe y SATA. Instalación con migración de datos. Garantía.",
    keywords: ["ssd laptop peru", "ssd samsung peru", "ssd kingston lima", "ssd nvme peru", "upgrade ssd peru"],
    relatedCategories: ["almacenamiento"],
    content: `El SSD es la mejora más impactante que puedes hacer a tu laptop. En itechperu.shop ofrecemos las mejores marcas de SSD en Perú con instalación profesional.

## Mejores SSDs para laptop en Perú

### Samsung 990 Pro (NVMe M.2)
El SSD más rápido del mercado. Velocidades de hasta 7450 MB/s lectura. Ideal para profesionales de video, diseño y desarrollo. Capacidades: 250GB, 500GB, 1TB, 2TB, 4TB.

### Samsung 980 (NVMe M.2)
Excelente relación calidad-precio. Velocidades de hasta 3500 MB/s. Ideal para la mayoría de usuarios. Capacidades: 250GB, 500GB, 1TB.

### Kingston KC3000 (NVMe M.2)
SSD de alto rendimiento con disipador. Velocidades de hasta 7000 MB/s. Gen 4. Capacidades: 512GB, 1TB, 2TB, 4TB.

### WD Black SN850X (NVMe M.2)
Pensado para gaming. Velocidades de hasta 7300 MB/s. Baja latencia. Capacidades: 1TB, 2TB, 4TB.

### Crucial P3 Plus (NVMe M.2)
Opción económica de calidad. Velocidades de hasta 5000 MB/s. Gen 4. Capacidades: 250GB, 500GB, 1TB, 2TB, 4TB.

### Samsung 870 EVO (SATA 2.5")
SSD SATA para laptops antiguas sin slot M.2. Velocidades de hasta 560 MB/s. Capacidades: 250GB, 500GB, 1TB, 2TB, 4TB.

## NVMe vs SATA: ¿cuál necesito?

### SSD NVMe M.2
- Más rápidos (hasta 7000 MB/s)
- Formato pequeño (se conecta directo a la placa)
- Requiere slot M.2 en tu laptop
- Recomendado para laptops 2018+

### SSD SATA 2.5"
- Más lentos (hasta 560 MB/s)
- Formato de 2.5 pulgadas (como los HDD)
- Compatible con cualquier laptop
- Recomendado para laptops antiguas

## ¿Cómo saber qué SSD necesito?

1. Revisa si tu laptop tiene slot M.2 (manual del fabricante)
2. Verifica el tipo de SSD que tiene actualmente
3. Confirma la capacidad máxima soportada
4. Si no estás seguro, contáctanos por WhatsApp

## Servicio de instalación con migración

Ofrecemos servicio completo de upgrade a SSD que incluye:
- Diagnóstico de tu laptop
- Selección del SSD correcto
- Clonación de tu disco actual al SSD nuevo
- Instalación física del SSD
- Optimización del sistema
- Pruebas de rendimiento
- Garantía de 90 días sobre la mano de obra

Tus archivos, programas y configuraciones se conservan intactos. No necesitas reinstalar nada.

## ¿Cuánto mejora un SSD?

Un upgrade de HDD a SSD puede:
- Reducir el tiempo de arranque de 60s a 10s
- Abrir aplicaciones 10x más rápido
- Transferir archivos 5-10x más rápido
- Mejorar la batería (menos consumo que HDD)
- Reducir el ruido (sin partes móviles)

## Garantía

Todos los SSDs son nuevos con garantía de fábrica del fabricante (3-5 años según marca). La instalación tiene garantía de 90 días.`,
    faqs: [
      {
        q: "¿Cuánto cuesta instalar un SSD en mi laptop?",
        a: "El SSD varía según capacidad y marca (desde S/180 para 500GB). La instalación con migración de datos cuesta S/80 adicional. Total desde S/260.",
      },
      {
        q: "¿Migran mis archivos al nuevo SSD?",
        a: "Sí, clonamos tu disco actual al nuevo SSD. Tus archivos, programas y configuraciones se conservan intactos. No necesitas reinstalar nada.",
      },
      {
        q: "¿Cómo sé si mi laptop soporta SSD NVMe?",
        a: "Las laptops 2018+ generalmente soportan NVMe. Para confirmar, revisa el manual del fabricante o escríbenos por WhatsApp con el modelo de tu laptop.",
      },
      {
        q: "¿Cuánto mejora el rendimiento con un SSD?",
        a: "El arranque pasa de 60s a 10s, las aplicaciones abren 10x más rápido, y la transferencia de archivos es 5-10x más rápida. Es la mejora más impactante.",
      },
    ],
  },
  {
    slug: "memoria-ram-laptop-lima",
    title: "Memoria RAM para Laptop en Lima",
    h1: "Memoria RAM para Laptop en Lima — DDR4, DDR5, DDR3",
    metaTitle: "Memoria RAM para Laptop en Lima | DDR4, DDR5, DDR3 — itechperu.shop",
    metaDescription:
      "Memoria RAM para laptop en Lima: DDR4, DDR5, DDR3 SODIMM. Kingston, Crucial, Samsung. Instalación profesional. Mejora el multitarea.",
    keywords: ["memoria ram laptop lima", "ram ddr4 peru", "ram ddr5 lima", "upgrade ram laptop peru", "ram kingston peru"],
    relatedCategories: ["almacenamiento"],
    content: `¿Tu laptop va lenta con varias aplicaciones abiertas? Aumentar la memoria RAM es la solución. En itechperu.shop ofrecemos RAM para laptop en Lima con instalación profesional.

## Tipos de RAM para laptop

### DDR5 SODIMM (2022+)
La última generación. Velocidades desde 4800 MHz hasta 6400 MHz. Compatible con laptops con procesadores Intel 12ª gen+ y AMD Ryzen 7000+.

### DDR4 SODIMM (2016-2024)
El estándar actual. Velocidades desde 2400 MHz hasta 3200 MHz. Compatible con la mayoría de laptops de los últimos 8 años.

### DDR3/DDR3L SODIMM (2012-2018)
Para laptops antiguas. Velocidades 1600 MHz. Voltaje 1.35V (DDR3L) o 1.5V (DDR3).

## Marcas disponibles

### Kingston
La marca más confiable en RAM. Modelo Fury Impact para laptops. Garantía de por vida.

### Crucial
Excelente relación calidad-precio. Compatible con prácticamente cualquier laptop. Garantía de por vida.

### Samsung
RAM original de fábrica. La que traen las laptops Dell y HP de fábrica. Máxima compatibilidad.

### Corsair
Para entusiastas y gaming. Modelos Vengeance con disipador. Alto rendimiento.

## ¿Cuánta RAM necesitas?

- **4GB**: Mínimo absoluto. Solo ofimática básica. No recomendado en 2026.
- **8GB**: Mínimo recomendado. Ofimática, navegación, streaming.
- **16GB**: Recomendado para la mayoría. Multitarea, photo editing, desarrollo.
- **32GB**: Para profesionales. Video editing, virtualización, CAD.
- **64GB**: Solo para workstations. Renderizado 3D, IA, data science.

## ¿Cómo saber qué RAM necesita tu laptop?

1. Verifica el tipo (DDR3, DDR4, DDR5) en el manual
2. Confirma la velocidad soportada
3. Revisa cuántos slots tiene tu laptop
4. Verifica la capacidad máxima por slot

Si no estás seguro, contáctanos por WhatsApp con el modelo exacto de tu laptop y te asesoramos.

## Instalación profesional

Ofrecemos instalación de RAM en nuestro taller de Lima:
- Diagnóstico de compatibilidad
- Instalación física del módulo
- Pruebas de estabilidad (MemTest)
- Verificación de reconocimiento del sistema
- Garantía de 90 días sobre la mano de obra

La instalación toma 30-60 minutos. Es la upgrade más rápida y segura.

## ¿Se puede aumentar RAM en MacBook?

Los MacBook Air y Pro desde 2020 (M1, M2, M3) NO tienen RAM ampliable. La RAM está integrada en el chip. Si necesitas más RAM, debes comprar un MacBook con más RAM desde el inicio.

Los MacBook anteriores a 2020 (Intel) sí permiten upgrade de RAM en algunos modelos. Contáctanos para verificar.`,
    faqs: [
      {
        q: "¿Cuánto cuesta aumentar la RAM de mi laptop?",
        a: "Depende del tipo y capacidad. DDR4 8GB desde S/120, DDR4 16GB desde S/200, DDR5 16GB desde S/250. Instalación S/50.",
      },
      {
        q: "¿Se puede aumentar RAM en MacBook Air M2?",
        a: "No, los MacBook con chip Apple Silicon (M1, M2, M3) tienen RAM integrada no ampliable. Debes comprar el modelo con la RAM que necesitas.",
      },
      {
        q: "¿Cómo sé qué RAM necesita mi laptop?",
        a: "Escríbenos por WhatsApp con el modelo exacto de tu laptop. Verificamos compatibilidad y te recomendamos la mejor opción.",
      },
      {
        q: "¿La instalación de RAM tiene garantía?",
        a: "Sí, la instalación tiene 90 días de garantía. Los módulos de RAM tienen garantía de por vida del fabricante (Kingston, Crucial).",
      },
    ],
  },
  {
    slug: "servicio-tecnico-macbook-lima",
    title: "Servicio Técnico MacBook en Lima",
    h1: "Servicio Técnico MacBook en Lima — Reparación Especializada",
    metaTitle: "Servicio Técnico MacBook en Lima | Reparación Especializada — itechperu.shop",
    metaDescription:
      "Servicio técnico MacBook en Lima: cambio de pantalla, batería, teclado, SSD. Técnicos certificados. Diagnóstico gratis. Garantía 90 días.",
    keywords: ["servicio tecnico macbook lima", "reparacion macbook peru", "reparar macbook lima", "tecnico apple lima", "soporte macbook peru"],
    relatedCategories: ["repuestos", "macbooks"],
    content: `¿Tu MacBook necesita reparación? En itechperu.shop ofrecemos servicio técnico especializado para MacBook en Lima, con técnicos certificados, repuestos originales y garantía real.

## Servicios de reparación para MacBook

### Cambio de pantalla
Reemplazo de pantallas Liquid Retina y Liquid Retina XDR para MacBook Air y Pro. Solo usamos pantallas originales Apple. Garantía de 90 días.

### Cambio de batería
Reemplazo de baterías originales Apple para MacBook Air (M1, M2, M3) y MacBook Pro (todas las generaciones). Batería con 100% de salud. Garantía de 6 meses.

### Cambio de teclado
Reemplazo de teclados completos para MacBook, incluyendo el mecanismo Magic Keyboard (2020+) y Butterfly (2016-2019). Garantía de 90 días.

### Cambio de trackpad
Reemplazo de trackpads Force Touch originales. Si tu trackpad no responde o tiene zonas muertas, lo reemplazamos. Garantía de 90 días.

### Upgrade de SSD
Aumento de almacenamiento para MacBook. Cambio de SSD de 256GB a 1TB o 2TB. Incluye migración de datos. Garantía de 90 días.

### Limpieza interna
Limpieza profunda del interior de tu MacBook: remoción de polvo, cambio de pasta térmica, limpieza de ventiladores. Reduce temperatura y mejora rendimiento.

### Diagnóstico de hardware
Diagnóstico completo de todos los componentes de tu MacBook. Identificamos cualquier problema antes de que sea grave. Gratuito.

### Reparación de motherboard
Reparación a nivel de componente de la placa base. Cortocircuitos, chips dañados, problemas de alimentación. Servicio especializado.

## Modelos de MacBook que reparamos

- MacBook Air M1 (2020)
- MacBook Air M2 (2022-2023)
- MacBook Air M3 (2024)
- MacBook Pro 13" M1/M2 (2020-2022)
- MacBook Pro 14" M1 Pro/Max, M2 Pro/Max, M3 Pro/Max (2021-2024)
- MacBook Pro 16" M1 Max, M2 Max, M3 Max (2021-2024)
- MacBook Pro Intel (2016-2020)
- MacBook Air Intel (2018-2020)

## Proceso de reparación

1. **Diagnóstico gratuito** (24 horas): Evaluamos tu MacBook y identificamos el problema.
2. **Cotización detallada**: Te damos el precio exacto con repuestos originales y mano de obra.
3. **Aprobación**: Tú decides si proceder. Sin sorpresas, sin costos ocultos.
4. **Reparación**: Nuestros técnicos certificados realizan la reparación con herramientas especializadas.
5. **Pruebas**: Verificamos que todo funcione correctamente.
6. **Entrega**: Entregamos tu MacBook con garantía de 90 días.

## ¿Por qué elegir itechperu.shop?

- Técnicos certificados con experiencia en Apple
- Repuestos originales Apple
- Garantía real por escrito (90 días)
- Diagnóstico gratuito
- Precios 40-60% menores que Apple Store
- Más de 500 clientes satisfechos
- Calificación 4.9/5
- 7 días de devolución si no quedas satisfecho

## Tiempos de reparación

- Diagnóstico: 24 horas
- Cambio de batería: 1-2 horas
- Cambio de pantalla: 24-48 horas
- Cambio de teclado: 24-48 horas
- Upgrade de SSD: 2-4 horas
- Reparación de motherboard: 3-7 días

## Ubicación

Atendemos en toda Lima Metropolitana. Puedes traer tu MacBook a nuestro taller o coordinar recojo a domicilio (servicio premium con costo adicional).`,
    faqs: [
      {
        q: "¿El diagnóstico de MacBook es gratuito?",
        a: "Sí, el diagnóstico es completamente gratuito. Evaluamos tu MacBook y te damos una cotización detallada sin compromiso.",
      },
      {
        q: "¿Usan repuestos originales Apple?",
        a: "Sí, para pantallas y baterías usamos exclusivamente repuestos originales Apple. Para SSDs usamos marcas premium (Samsung, Kingston) que son superiores al stock Apple.",
      },
      {
        q: "¿Cuánto cuesta reparar un MacBook en Lima?",
        a: "Depende del problema: batería desde S/350, pantalla desde S/1,200, teclado desde S/400, SSD upgrade desde S/260. Diagnóstico gratuito.",
      },
      {
        q: "¿Qué garantía tienen las reparaciones?",
        a: "Todas las reparaciones incluyen 90 días de garantía sobre la mano de obra. Los repuestos tienen 3 meses de garantía contra defectos de fábrica.",
      },
    ],
  },
  {
    slug: "repuestos-lenovo-peru",
    title: "Repuestos para Lenovo en Perú",
    h1: "Repuestos para Lenovo en Perú — ThinkPad, IdeaPad, Yoga",
    metaTitle: "Repuestos para Lenovo en Perú | ThinkPad, IdeaPad — itechperu.shop",
    metaDescription:
      "Repuestos para laptop Lenovo en Perú: ThinkPad, IdeaPad, Yoga. Pantallas, baterías, teclados, SSD. Servicio técnico en Lima. Garantía.",
    keywords: ["repuestos lenovo peru", "repuestos thinkpad lima", "bateria lenovo peru", "pantalla lenovo lima", "teclado thinkpad peru"],
    relatedCategories: ["repuestos", "laptops"],
    content: `¿Buscas repuestos para tu laptop Lenovo en Perú? En itechperu.shop tenemos repuestos originales y compatibles para ThinkPad, IdeaPad, Yoga y Legion.

## Repuestos disponibles para Lenovo

### Pantallas para Lenovo
Pantallas para ThinkPad (T14, T490, X1 Carbon), IdeaPad (3, 5, 7), Yoga (7i, 9i), Legion (5, 7). Disponibles en 13.3", 14", 15.6" y 16".

### Baterías para Lenovo
Baterías originales Lenovo para ThinkPad, IdeaPad y Yoga. Modelos con batería interna y externa. Garantía de 6 meses.

### Teclados para Lenovo
Teclados para ThinkPad (con el legendario TrackPoint), IdeaPad y Legion. Layouts español e inglés. Retroiluminación disponible.

### SSDs para Lenovo
Upgrades de SSD para Lenovo: Samsung 990 Pro, Kingston KC3000. ThinkPad e IdeaPad con slot M.2 NVMe. Mejora la velocidad hasta 10x.

### Memoria RAM para Lenovo
Módulos de RAM DDR4 y DDR5 para ThinkPad e IdeaPad. Aumenta de 8GB a 16GB, 32GB o 64GB según el modelo.

## Modelos Lenovo compatibles

### ThinkPad (Corporativa)
- ThinkPad T14 Gen 1, 2, 3, 4
- ThinkPad T490, T495
- ThinkPad X1 Carbon Gen 7, 8, 9, 10, 11
- ThinkPad P14s, P1
- ThinkPad L14, L15

### IdeaPad (Consumo)
- IdeaPad 3, 5, 7 (14", 15.6", 16")
- IdeaPad Flex 5, 7
- IdeaPad Gaming 3

### Yoga (Convertibles)
- Yoga 7i, 9i (13", 14", 15")
- Yoga C940, C740

### Legion (Gaming)
- Legion 5, 5 Pro (15.6", 16")
- Legion 7, 7i

## Servicio técnico Lenovo en Lima

Taller especializado en reparación de laptops Lenovo en Lima. Técnicos con experiencia en línea ThinkPad (corporativa) y IdeaPad (consumo).

### Especialidad ThinkPad
Los ThinkPad son laptops corporativas legendarias por su durabilidad. Tenemos experiencia en:
- Reparación de motherboard ThinkPad
- Cambio de teclado con TrackPoint
- Upgrade de SSD y RAM
- Reparación de hinges (bisagras)

## ¿Por qué elegir itechperu.shop para tu Lenovo?

- Especialistas en línea ThinkPad
- Repuestos originales Lenovo verificados
- Técnicos con experiencia corporativa
- Garantía real por escrito
- Precios 40-60% menores que servicio oficial
- Diagnóstico gratuito en 24 horas

## Garantía

Todos los repuestos incluyen garantía de 3 meses. La mano de obra tiene garantía de 90 días. Diagnóstico gratuito sin compromiso.`,
    faqs: [
      {
        q: "¿Tienen repuestos para ThinkPad X1 Carbon?",
        a: "Sí, tenemos repuestos para ThinkPad X1 Carbon Gen 7 al Gen 11: pantallas, baterías, teclados, SSDs y RAM.",
      },
      {
        q: "¿Pueden reparar la bisagra de mi ThinkPad?",
        a: "Sí, reparamos hinges (bisagras) de ThinkPad. Es una reparación común en modelos con varios años de uso.",
      },
      {
        q: "¿Hacen upgrade de SSD en laptops Lenovo?",
        a: "Sí, realizamos upgrades de SSD para ThinkPad e IdeaPad. Incluye migración de datos del disco anterior al nuevo SSD.",
      },
      {
        q: "¿La garantía cubre problemas posteriores?",
        a: "Sí, los repuestos tienen 3 meses de garantía y la mano de obra 90 días. Si el problema se repite, lo reparamos sin costo.",
      },
    ],
  },
  {
    slug: "repuestos-dell-peru",
    title: "Repuestos para Dell en Perú",
    h1: "Repuestos para Dell en Perú — Latitude, XPS, Inspiron",
    metaTitle: "Repuestos para Dell en Perú | Latitude, XPS, Inspiron — itechperu.shop",
    metaDescription:
      "Repuestos para laptop Dell en Perú: Latitude, XPS, Inspiron. Pantallas, baterías, teclados, SSD. Servicio técnico en Lima. Garantía real.",
    keywords: ["repuestos dell peru", "repuestos latitude lima", "bateria dell peru", "pantalla xps lima", "teclado dell peru"],
    relatedCategories: ["repuestos", "laptops"],
    content: `¿Necesitas repuestos para tu laptop Dell en Perú? En itechperu.shop ofrecemos repuestos originales y compatibles para Latitude, XPS, Inspiron, Vostro y Precision.

## Repuestos disponibles para Dell

### Pantallas para Dell
Pantallas para Dell Latitude (5420, 7420, 7430, 9430), XPS 13 y 15, Inspiron, Vostro, Precision. Disponibles en 13.3", 14", 15.6" y 17".

### Baterías para Dell
Baterías originales Dell para Latitude, XPS, Inspiron y Vostro. Modelos con batería interna y externa. Garantía de 6 meses.

### Teclados para Dell
Teclados para Dell Latitude (backlight y no backlight), XPS (con teclado de cristal), Inspiron. Layouts español e inglés.

### SSDs para Dell
Upgrades de SSD para Dell: Samsung 990 Pro, Kingston KC3000. Latitude, XPS e Inspiron con slot M.2 NVMe.

### Memoria RAM para Dell
Módulos de RAM DDR4 y DDR5 para Latitude, XPS, Precision. Aumenta de 8GB a 16GB, 32GB o 64GB.

### Cargadores para Dell
Cargadores originales Dell USB-C 65W, 90W, 130W. También cargadores barrel para modelos antiguos.

## Modelos Dell compatibles

### Latitude (Corporativa)
- Latitude 5420, 5430, 5440
- Latitude 7420, 7430, 7440
- Latitude 9420, 9430, 9440
- Latitude 3320, 3420

### XPS (Premium)
- XPS 13 (9315, 9320, 9320 Plus)
- XPS 15 (9520, 9530)
- XPS 17 (9720, 9730)

### Inspiron (Consumo)
- Inspiron 14, 15, 16
- Inspiron 2-in-1

### Vostro (Pymes)
- Vostro 3420, 3520
- Vostro 5620

### Precision (Workstation)
- Precision 3570, 3580
- Precision 5570, 5770

## Servicio técnico Dell en Lima

Taller especializado en reparación de laptops Dell en Lima. Especialistas en línea corporativa Latitude y línea premium XPS.

### Especialidad Latitude
Las Dell Latitude son el estándar empresarial en Perú. Tenemos amplia experiencia en:
- Reparación de motherboard Latitude
- Cambio de pantallas táctiles y no táctiles
- Upgrade de SSD y RAM
- Reparación de conectores de carga

### Especialidad XPS
Las Dell XPS son laptops premium con pantallas InfinityEdge. Experiencia en:
- Cambio de pantallas InfinityEdge
- Reparación de teclados de cristal
- Limpieza de ventiladores

## ¿Por qué elegir itechperu.shop para tu Dell?

- Especialistas en línea Latitude (corporativa)
- Experiencia con XPS (premium)
- Repuestos originales Dell verificados
- Garantía real por escrito
- Precios 40-60% menores que Dell oficial
- Diagnóstico gratuito en 24 horas
- 7 días de devolución

## Garantía

Todos los repuestos incluyen garantía de 3 meses. La mano de obra tiene garantía de 90 días. Diagnóstico gratuito sin compromiso.`,
    faqs: [
      {
        q: "¿Tienen repuestos para Dell Latitude 7430?",
        a: "Sí, tenemos pantallas, baterías, teclados, SSDs, RAM y cargadores para Dell Latitude 7430. Todos originales o compatibles premium.",
      },
      {
        q: "¿Pueden reparar la pantalla InfinityEdge del XPS 13?",
        a: "Sí, reemplazamos pantallas InfinityEdge para XPS 13 (9315, 9320). Pantallas originales Dell con garantía de 3 meses.",
      },
      {
        q: "¿Hacen upgrade de SSD en Dell Latitude?",
        a: "Sí, realizamos upgrades de SSD para todas las Dell Latitude. Incluye migración de datos del disco anterior.",
      },
      {
        q: "¿La garantía cubre problemas posteriores?",
        a: "Sí, los repuestos tienen 3 meses de garantía y la mano de obra 90 días. Si el problema se repite, lo reparamos sin costo.",
      },
    ],
  },
];

export function getLandingPageBySlug(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((p) => p.slug === slug);
}
