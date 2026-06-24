"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, CheckCircle2, AlertCircle, ImageIcon } from "lucide-react";

interface UploadedImage {
  imageId: string;
  url: string;
  filename: string;
}

interface ImageUploaderDeluxeProps {
  /** Imágenes ya cargadas (para edición) */
  initialImages?: string[];
  /** Callback cuando cambian las imágenes */
  onChange: (images: string[]) => void;
  /** Máximo número de imágenes */
  maxImages?: number;
  /** Label del campo */
  label?: string;
}

/**
 * ImageUploaderDeluxe — Componente reutilizable para subir imágenes a Sanity.
 *
 * Features:
 *  - Drag & drop + click para seleccionar
 *  - Preview en miniatura con botón eliminar
 *  - Reordenar (drag para mover) — próximamente
 *  - Validación de tipo y tamaño
 *  - Loading state por imagen
 *  - Errores por imagen individual
 *  - Auto-optimización (Sanity CDN)
 */
export function ImageUploaderDeluxe({
  initialImages = [],
  onChange,
  maxImages = 6,
  label = "Imágenes del producto",
}: ImageUploaderDeluxeProps) {
  const [images, setImages] = useState<UploadedImage[]>(
    initialImages.map((url, i) => ({
      imageId: url,
      url,
      filename: `existing-${i}`,
    }))
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const notifyChange = useCallback(
    (newImages: UploadedImage[]) => {
      onChange(newImages.map((img) => img.url));
    },
    [onChange]
  );

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (images.length + files.length > maxImages) {
      setError(`Máximo ${maxImages} imágenes`);
      return;
    }

    setError(null);
    setUploading(true);

    const newImages: UploadedImage[] = [...images];

    for (const file of Array.from(files)) {
      // Validar tipo
      if (!file.type.startsWith("image/")) {
        setError(`${file.name} no es una imagen válida`);
        continue;
      }

      // Validar tamaño (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError(`${file.name} excede 10MB`);
        continue;
      }

      // Subir a Sanity via API
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.success) {
          newImages.push({
            imageId: data.imageId,
            url: data.url,
            filename: data.filename,
          });
        } else {
          setError(data.error || `Error subiendo ${file.name}`);
        }
      } catch {
        setError(`Error de conexión subiendo ${file.name}`);
      }
    }

    setImages(newImages);
    notifyChange(newImages);
    setUploading(false);
  };

  const handleDelete = (idx: number) => {
    const newImages = images.filter((_, i) => i !== idx);
    setImages(newImages);
    notifyChange(newImages);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  return (
    <div className="space-y-3">
      <label className="block text-[12px] font-medium text-[#1D1D1F]/80">
        {label}{" "}
        <span className="text-[#86868B] font-normal">
          ({images.length}/{maxImages})
        </span>
      </label>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          dragActive
            ? "border-[#D4AF37] bg-[#FFFBEB]"
            : "border-[#E5E5E7] hover:border-[#D4AF37]/40 hover:bg-[#F5F5F7]"
        } ${uploading ? "pointer-events-none opacity-60" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 text-[#D4AF37] animate-spin" strokeWidth={1.5} />
            <p className="text-[12px] text-[#86868B]">Subiendo a Sanity…</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F7]">
              <Upload className="h-5 w-5 text-[#86868B]" strokeWidth={1.5} />
            </div>
            <p className="text-[13px] font-medium text-[#1D1D1F]">
              Arrastra imágenes aquí o click para seleccionar
            </p>
            <p className="text-[10px] text-[#86868B]">
              JPG, PNG, WebP, AVIF · Máximo 10MB c/u
            </p>
          </div>
        )}
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-2 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 px-3 py-2 text-[11px] text-[#EF4444]"
          >
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={2} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview de imágenes */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          <AnimatePresence>
            {images.map((img, idx) => (
              <motion.div
                key={img.imageId + idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group relative aspect-square rounded-xl overflow-hidden bg-[#F5F5F7] border border-[#E5E5E7]"
              >
                <img
                  src={img.url}
                  alt={img.filename}
                  className="h-full w-full object-cover"
                />

                {/* Overlay con acciones */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(idx);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex h-7 w-7 items-center justify-center rounded-full bg-white/90 hover:bg-white"
                    aria-label="Eliminar imagen"
                  >
                    <X className="h-4 w-4 text-[#EF4444]" strokeWidth={2} />
                  </button>
                </div>

                {/* Badge de orden */}
                {idx === 0 && (
                  <span className="absolute top-1 left-1 inline-flex items-center rounded-full bg-[#D4AF37] px-1.5 py-0.5 text-[8px] font-bold text-white">
                    PORTADA
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {images.length === 0 && !uploading && (
        <div className="flex items-center gap-2 text-[11px] text-[#86868B]">
          <ImageIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
          Aún no hay imágenes. La primera será la portada del producto.
        </div>
      )}
    </div>
  );
}
