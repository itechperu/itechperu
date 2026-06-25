import type { Metadata } from "next";
import { getProducts } from "@/data/products";
import { CatalogoClient } from "./catalogo-client";

export const metadata: Metadata = {
  title: "Catálogo — iPads, MacBooks y Laptops reacondicionados en Perú | itechperu.shop",
  description:
    "Explora nuestro catálogo completo de tecnología premium reacondicionada en Perú. iPads, MacBooks y Laptops con garantía real. Envío a todo Perú.",
  alternates: { canonical: "/catalogo" },
  openGraph: {
    title: "Catálogo — itechperu.shop",
    description: "Tecnología premium reacondicionada con garantía real en Perú.",
    type: "website",
    locale: "es_PE",
  },
};

export const revalidate = 3600;

export default async function CatalogoPage() {
  const products = await getProducts();
  return <CatalogoClient products={products} />;
}
