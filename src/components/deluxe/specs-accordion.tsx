"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Battery, Cpu, Monitor, HardDrive, Camera, Wifi, MemoryStick, Weight, Cable, ShieldCheck, Wrench } from "lucide-react";
import type { ProductSpec } from "@/data/products";

const ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  battery: Battery,
  cpu: Cpu,
  display: Monitor,
  storage: HardDrive,
  camera: Camera,
  wifi: Wifi,
  memory: MemoryStick,
  weight: Weight,
  ports: Cable,
};

const SPEC_CATEGORIES: { title: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; match: string[] }[] = [
  { title: "Pantalla", icon: Monitor, match: ["display"] },
  { title: "Procesador", icon: Cpu, match: ["cpu"] },
  { title: "Memoria y almacenamiento", icon: HardDrive, match: ["storage", "memory"] },
  { title: "Batería y energía", icon: Battery, match: ["battery"] },
  { title: "Cámara", icon: Camera, match: ["camera"] },
  { title: "Conectividad y puertos", icon: Wifi, match: ["wifi", "ports"] },
  { title: "Físico", icon: Weight, match: ["weight"] },
];

/**
 * SpecsAccordion — Ficha técnica en accordion inteligente.
 * Agrupa specs por categoría, colapsable para ahorrar espacio.
 */
export function SpecsAccordion({ specs }: { specs: ProductSpec[] }) {
  // Agrupar specs por categoría
  const grouped = SPEC_CATEGORIES.map((cat) => ({
    ...cat,
    items: specs.filter((s) => cat.match.includes(s.icon)),
  })).filter((c) => c.items.length > 0);

  // Specs que no entran en ninguna categoría
  const uncategorized = specs.filter(
    (s) => !SPEC_CATEGORIES.some((c) => c.match.includes(s.icon))
  );

  const sections = [
    ...grouped.map((g) => ({ id: g.title, title: g.title, icon: g.icon, items: g.items })),
    ...(uncategorized.length > 0
      ? [{ id: "otros", title: "Otros", icon: Wrench, items: uncategorized }]
      : []),
    {
      id: "garantia",
      title: "Garantía y condición",
      icon: ShieldCheck,
      items: [
        { icon: "shield", label: "Condición", value: "Reacondicionado Certificado" },
        { icon: "shield", label: "Garantía", value: "3-6 meses según grado" },
        { icon: "shield", label: "Verificación", value: "47 puntos de inspección" },
        { icon: "shield", label: "Devolución", value: "7 días sin preguntas" },
      ],
    },
  ];

  return (
    <Accordion type="single" collapsible defaultValue="pantalla" className="w-full">
      {sections.map((section) => (
        <AccordionItem
          key={section.id}
          value={section.id.toLowerCase()}
          className="border-b border-[#E5E5E7] last:border-0"
        >
          <AccordionTrigger className="hover:no-underline py-4 group">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F5F5F7] group-hover:bg-[#D4AF37]/10 transition-colors">
                <section.icon className="h-3.5 w-3.5 text-[#1D1D1F] group-hover:text-[#D4AF37] transition-colors" strokeWidth={1.5} />
              </div>
              <span className="text-[14px] font-semibold text-[#1D1D1F]">{section.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="grid sm:grid-cols-2 gap-2 pl-9">
              {section.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-2 py-1">
                  <span className="text-[12px] text-[#86868B]">{item.label}</span>
                  <span className="text-[12px] font-medium text-[#1D1D1F] text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
