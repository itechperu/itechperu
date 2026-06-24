import type { Metadata } from "next";
import { FAQClient } from "./faq-client";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes — itechperu.shop",
  description:
    "Resolvemos tus dudas sobre equipos reacondicionados, garantía, envíos, pagos y más. Todo lo que necesitas saber antes de comprar.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return <FAQClient />;
}
