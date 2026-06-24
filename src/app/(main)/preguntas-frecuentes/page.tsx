import type { Metadata } from "next";
import { FAQClient } from "./faq-client";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes — itechperu.shop",
  description: "Resolvemos tus dudas sobre equipos reacondicionados, garantía, envíos, pagos y más.",
  alternates: { canonical: "/preguntas-frecuentes" },
};

export default function PreguntasFrecuentesPage() {
  return <FAQClient />;
}
