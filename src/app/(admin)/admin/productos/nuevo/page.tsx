"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { InputDeluxe } from "@/components/auth/input-deluxe";
import { ImageUploaderDeluxe } from "@/components/admin/image-uploader-deluxe";

type Category = "IPAD" | "MACBOOK" | "LAPTOP" | "ROPA" | "ACCESORIO";

export default function NuevoProductoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Campos del formulario
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [brand, setBrand] = useState("Apple");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState<Category>("IPAD");
  const [basePrice, setBasePrice] = useState(""); // en soles
  const [condition, setCondition] = useState("Reacondicionado Certificado");
  const [storage, setStorage] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("10");
  const [highlights, setHighlights] = useState(""); // separados por |
  const [includes, setIncludes] = useState(""); // separados por |
  const [images, setImages] = useState<string[]>([]);

  // Generar slug automático desde el título
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // quitar acentos
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const payload = {
        slug: slug || generateSlug(title),
        title,
        brand,
        model: model || title,
        category,
        basePrice: parseFloat(basePrice) || 0,
        condition,
        storage: storage || null,
        color: color || null,
        description,
        stock: parseInt(stock, 10) || 10,
        highlights: highlights.split("|").map((s) => s.trim()).filter(Boolean),
        includes: includes.split("|").map((s) => s.trim()).filter(Boolean),
        images, // URLs de Sanity
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al crear producto");
        setSaving(false);
        return;
      }

      setSaved(true);
      setTimeout(() => {
        router.push("/admin/productos");
      }, 1500);
    } catch {
      setError("Error de conexión");
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors mb-4"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Volver a productos
      </Link>

      <h1 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#1D1D1F]">
        Nuevo Producto
      </h1>
      <p className="text-[13px] text-[#86868B] mt-1">
        Completa los datos. Las imágenes se suben a Sanity (100GB gratis).
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-3xl space-y-5">
        {/* Imágenes */}
        <section className="rounded-2xl bg-white border border-[#E5E5E7] p-5">
          <h2 className="text-[14px] font-semibold tracking-tight text-[#1D1D1F] mb-3">
            Imágenes del producto
          </h2>
          <ImageUploaderDeluxe
            initialImages={images}
            onChange={setImages}
            maxImages={6}
            label="Fotos del producto"
          />
        </section>

        {/* Datos básicos */}
        <section className="rounded-2xl bg-white border border-[#E5E5E7] p-5 space-y-4">
          <h2 className="text-[14px] font-semibold tracking-tight text-[#1D1D1F]">
            Datos básicos
          </h2>

          <InputDeluxe
            label="Título del producto"
            placeholder="iPad Pro 12.9” M2 Wi-Fi 256GB"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slug) setSlug(generateSlug(e.target.value));
            }}
            required
          />

          <div className="grid sm:grid-cols-2 gap-3">
            <InputDeluxe
              label="Slug (URL)"
              placeholder="ipad-pro-12-9-m2"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              hint="Se genera automáticamente si lo dejas vacío"
              required
            />
            <div>
              <label className="block text-[12px] font-medium text-[#1D1D1F]/80 mb-1.5">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-4 py-3 text-[14px] text-[#1D1D1F] bg-[#F5F5F7] border-2 border-[#E5E5E7] rounded-2xl focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all"
              >
                <option value="IPAD">iPad</option>
                <option value="MACBOOK">MacBook</option>
                <option value="LAPTOP">Laptop</option>
                <option value="ROPA">Ropa</option>
                <option value="ACCESORIO">Accesorio</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <InputDeluxe
              label="Marca"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
            <InputDeluxe
              label="Modelo"
              placeholder="iPad Pro 12.9” M2 (2022)"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>

          <InputDeluxe
            label="Descripción"
            placeholder="Descripción detallada del producto…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </section>

        {/* Precio y stock */}
        <section className="rounded-2xl bg-white border border-[#E5E5E7] p-5 space-y-4">
          <h2 className="text-[14px] font-semibold tracking-tight text-[#1D1D1F]">
            Precio y stock
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            <InputDeluxe
              label="Precio base (S/)"
              type="number"
              placeholder="3499"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              hint="En soles. Ej: 3499 = S/ 3,499"
              required
            />
            <InputDeluxe
              label="Stock disponible"
              type="number"
              placeholder="10"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <InputDeluxe
            label="Condición"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />

          <div className="grid sm:grid-cols-2 gap-3">
            <InputDeluxe
              label="Almacenamiento"
              placeholder="256 GB"
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
            />
            <InputDeluxe
              label="Color"
              placeholder="Space Gray"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </section>

        {/* Highlights e includes */}
        <section className="rounded-2xl bg-white border border-[#E5E5E7] p-5 space-y-4">
          <h2 className="text-[14px] font-semibold tracking-tight text-[#1D1D1F]">
            Detalles Deluxe
          </h2>

          <InputDeluxe
            label="Highlights (separados por |)"
            placeholder="Pantalla mini-LED | Chip M2 | Compatible con Apple Pencil"
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
            hint="Cada | separa un highlight"
          />

          <InputDeluxe
            label="Incluye (separados por |)"
            placeholder="Cable USB-C | Cargador 20W | Manual"
            value={includes}
            onChange={(e) => setIncludes(e.target.value)}
            hint="Cada | separa un item incluido en la caja"
          />
        </section>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/30 px-4 py-2.5 text-[12px] text-[#EF4444]">
            <AlertCircle className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
            {error}
          </div>
        )}

        {/* Success */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 px-4 py-2.5 text-[12px] text-[#10B981]"
          >
            <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
            Producto creado. Redirigiendo…
          </motion.div>
        )}

        {/* Submit */}
        <div className="flex gap-3">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={saving || saved}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#1D1D1F] px-4 py-3.5 text-[14px] font-semibold text-white disabled:opacity-70 hover:bg-[#1D1D1F]/90 transition-colors"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                Guardando…
              </>
            ) : (
              <>
                <Save className="h-4 w-4" strokeWidth={1.5} />
                Crear producto
              </>
            )}
          </motion.button>

          <Link
            href="/admin/productos"
            className="flex items-center justify-center rounded-2xl border-2 border-[#E5E5E7] px-6 py-3.5 text-[14px] font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
