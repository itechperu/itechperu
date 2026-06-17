// Catálogo Deluxe — itechperu.shop
// Mock data para Sprint 1. En producción se conecta a Prisma/SQLite.

export type ProductGrade = "A+" | "A" | "B";

export interface GradeInfo {
  grade: ProductGrade;
  label: string;
  description: string;
  priceModifier: number; // ajuste en soles respecto al precio base
  warranty: string;
}

export interface ProductSpec {
  icon: string;
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  category: "iPad" | "MacBook" | "Laptop" | "Ropa";
  brand: string;
  model: string;
  title: string;
  subtitle: string;
  basePrice: number; // precio en PEN
  condition: string;
  storage?: string;
  color?: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  images: string[];
  grades: GradeInfo[];
  specs: ProductSpec[];
  highlights: string[];
  description: string;
  includes: string[];
}

const GOLD: GradeInfo = {
  grade: "A+",
  label: "Como Nuevo",
  description: "Sin marcas de uso. Batería ≥ 95%. Caja original.",
  priceModifier: 0,
  warranty: "6 meses",
};

const SILVER: GradeInfo = {
  grade: "A",
  label: "Excelente",
  description: "Microdesgaste imperceptible. Batería ≥ 90%.",
  priceModifier: -250,
  warranty: "4 meses",
};

const BRONZE: GradeInfo = {
  grade: "B",
  label: "Muy Bueno",
  description: "Uso visible en bordes. Batería ≥ 85%. 100% funcional.",
  priceModifier: -500,
  warranty: "3 meses",
};

export const products: Product[] = [
  {
    id: "1",
    slug: "ipad-pro-129-m2-2022",
    category: "iPad",
    brand: "Apple",
    model: "iPad Pro 12.9” M2 (2022)",
    title: "iPad Pro 12.9” M2 Wi-Fi 256GB",
    subtitle: "Pantalla Liquid Retina XDR · 2022 · Space Gray",
    basePrice: 3499,
    condition: "Reacondicionado Certificado",
    storage: "256 GB",
    color: "Space Gray",
    rating: 4.9,
    reviewCount: 127,
    soldCount: 84,
    images: [
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80",
    ],
    grades: [GOLD, SILVER, BRONZE],
    specs: [
      { icon: "battery", label: "Batería", value: "95% · 10,728 mAh" },
      { icon: "cpu", label: "Procesador", value: "Apple M2 · 8 núcleos" },
      { icon: "display", label: "Pantalla", value: "12.9” Liquid Retina XDR" },
      { icon: "storage", label: "Almacenamiento", value: "256 GB SSD" },
      { icon: "camera", label: "Cámara", value: "12 MP + 10 MP LiDAR" },
      { icon: "wifi", label: "Conectividad", value: "Wi-Fi 6E · USB-C" },
    ],
    highlights: [
      "Pantalla mini-LED con 1,600 nits de brillo pico",
      "Chip M2 con Neural Engine de 16 núcleos",
      "Compatible con Apple Pencil 2 y Magic Keyboard",
      "Verificado por técnicos Apple Certificados",
    ],
    description:
      "El iPad Pro 12.9” con chip M2 redefine lo que una tablet puede hacer. Su pantalla Liquid Retina XDR con tecnología mini-LED entrega negros profundos y brillo deslumbrante, ideal para edición de foto y video, diseño 3D o maratones de streaming en alta dinámica. Cada unidad pasa por nuestro protocolo de 47 puntos de inspección en Lima, garantizando desempeño idéntico al de un equipo nuevo. Incluye Apple Pencil 2 de regalo en grado A+.",
    includes: [
      "iPad Pro 12.9” M2",
      "Cable USB-C trenzado de 1m",
      "Cargador 20W original",
      "Manual Deluxe itechperu",
      "Caja premium con sello de garantía",
    ],
  },
  {
    id: "2",
    slug: "macbook-air-m2-2022",
    category: "MacBook",
    brand: "Apple",
    model: "MacBook Air M2 (2022)",
    title: "MacBook Air 13.6” M2 8/256GB",
    subtitle: "Midnight · 2022 · Sin ventilador",
    basePrice: 4299,
    condition: "Reacondicionado Certificado",
    storage: "256 GB",
    color: "Midnight",
    rating: 4.8,
    reviewCount: 89,
    soldCount: 52,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    ],
    grades: [GOLD, SILVER, BRONZE],
    specs: [
      { icon: "battery", label: "Batería", value: "92% · 18 hrs reproducción" },
      { icon: "cpu", label: "Procesador", value: "Apple M2 · 8 núcleos" },
      { icon: "display", label: "Pantalla", value: "13.6” Liquid Retina" },
      { icon: "storage", label: "Almacenamiento", value: "256 GB SSD" },
      { icon: "memory", label: "Memoria RAM", value: "8 GB unificada" },
      { icon: "weight", label: "Peso", value: "1.24 kg · 11.3 mm" },
    ],
    highlights: [
      "Diseño ultradelgado sin ventilador, totalmente silencioso",
      "Hasta 18 horas de batería real para jornada laboral completa",
      "Cámara FaceTime HD 1080p con procesamiento neuronal",
      "MagSafe 3 para carga segura y rápida",
    ],
    description:
      "El MacBook Air M2 combina potencia de nivel profesional con un chasis de 1.24 kg que desaparece en la mochila. Su chip M2 ejecuta edición en 4K, desarrollo de software y multitarea pesada sin sudar. La pantalla Liquid Retina de 13.6 pulgadas cubre P3 wide color, perfecta para diseñadores y creadores de contenido. Reacondicionado en Lima con piezas originales Apple y protocolo de 47 puntos.",
    includes: [
      "MacBook Air 13.6” M2",
      "Cargador USB-C 30W + cable MagSafe 3",
      "Funda protectora de microfibra",
      "Manual Deluxe itechperu",
    ],
  },
  {
    id: "3",
    slug: "ipad-air-5-m1-2022",
    category: "iPad",
    brand: "Apple",
    model: "iPad Air 5 M1 (2022)",
    title: "iPad Air 5 10.9” M1 64GB Wi-Fi",
    subtitle: "Starlight · 2022 · Touch ID",
    basePrice: 2199,
    condition: "Reacondicionado Certificado",
    storage: "64 GB",
    color: "Starlight",
    rating: 4.7,
    reviewCount: 203,
    soldCount: 141,
    images: [
      "https://images.unsplash.com/photo-1527068689036-79c0dea7d47d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511034104901-a16e0854c2ca?auto=format&fit=crop&w=1200&q=80",
    ],
    grades: [GOLD, SILVER, BRONZE],
    specs: [
      { icon: "battery", label: "Batería", value: "97% · 28Wh" },
      { icon: "cpu", label: "Procesador", value: "Apple M1 · 8 núcleos" },
      { icon: "display", label: "Pantalla", value: "10.9” Liquid Retina" },
      { icon: "storage", label: "Almacenamiento", value: "64 GB" },
      { icon: "camera", label: "Cámara", value: "12 MP gran angular" },
      { icon: "weight", label: "Peso", value: "461 g · 6.1 mm" },
    ],
    highlights: [
      "Chip M1 desktop-class en un cuerpo de 6.1 mm",
      "Compatible con Apple Pencil 2 y Magic Keyboard",
      "Touch ID integrado en botón superior",
      "Carga USB-C rápida",
    ],
    description:
      "El iPad Air 5 trae el poder del chip M1 al formato más versátil de Apple. Perfecto para estudiantes, profesionales creativos y cualquiera que necesite una máquina de productividad portátil. La pantalla de 10.9 pulgadas ofrece espacio amplio para multitarea con Stage Manager. Cada unidad es verificada en Lima con protocolo de 47 puntos.",
    includes: [
      "iPad Air 5 10.9” M1",
      "Cable USB-C de 1m",
      "Cargador 20W USB-C",
      "Manual Deluxe itechperu",
    ],
  },
  {
    id: "4",
    slug: "macbook-pro-14-m3-pro-2023",
    category: "MacBook",
    brand: "Apple",
    model: "MacBook Pro 14” M3 Pro (2023)",
    title: "MacBook Pro 14” M3 Pro 18/512GB",
    subtitle: "Space Black · 2023 · Pantalla XDR",
    basePrice: 8499,
    condition: "Reacondicionado Premium",
    storage: "512 GB",
    color: "Space Black",
    rating: 5.0,
    reviewCount: 34,
    soldCount: 19,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1200&q=80",
    ],
    grades: [GOLD, SILVER, BRONZE],
    specs: [
      { icon: "battery", label: "Batería", value: "94% · 12 hrs vídeo" },
      { icon: "cpu", label: "Procesador", value: "Apple M3 Pro · 12 núcleos" },
      { icon: "display", label: "Pantalla", value: "14.2” Liquid Retina XDR" },
      { icon: "storage", label: "Almacenamiento", value: "512 GB SSD" },
      { icon: "memory", label: "Memoria RAM", value: "18 GB unificada" },
      { icon: "ports", label: "Puertos", value: "3× USB-C HDMI SDXC MagSafe" },
    ],
    highlights: [
      "Rendimiento pro para edición 8K y renderizado 3D",
      "Pantalla XDR con 1,600 nits HDR y negros OLED",
      "Sistema de 6 parlantes con audio espacial",
      "Cuerpo de aluminio reciclado Space Black exclusivo",
    ],
    description:
      "El MacBook Pro 14” con M3 Pro es la herramienta definitiva para profesionales del audio, vídeo y desarrollo. Su pantalla Liquid Retina XDR reproduce HDR con precisión de estudio, y los 18 GB de memoria unificada manejan flujos de trabajo intensivos sin pestañear. Reacondicionado en Lima con estándares de joyería técnica, inspección de 47 puntos y garantía extendida.",
    includes: [
      "MacBook Pro 14” M3 Pro Space Black",
      "Cargador USB-C 70W + cable MagSafe 3",
      "Funda premium de cuero vegano",
      "Manual Deluxe itechperu",
      "Póliza de garantía física",
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id || p.slug === id);
}

export function getRelatedProducts(currentId: string, limit = 3): Product[] {
  return products.filter((p) => p.id !== currentId).slice(0, limit);
}

export function formatPEN(value: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
