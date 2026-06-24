import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { uploadImageToSanity } from "@/lib/sanity/upload";
import { isSanityConfigured } from "@/lib/sanity/client";

/**
 * POST /api/admin/upload
 *
 * Sube una imagen a Sanity y retorna la URL optimizada.
 *
 * Body (multipart/form-data):
 *   - file: archivo de imagen (jpg, png, webp)
 *   - filename: (opcional) nombre personalizado
 *
 * Response:
 *   { success: true, imageId, url, sanityUrl }
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    if (!isSanityConfigured()) {
      return NextResponse.json(
        {
          error:
            "Sanity no configurado. Configura NEXT_PUBLIC_SANITY_PROJECT_ID y SANITY_API_WRITE_TOKEN en variables de entorno.",
        },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Archivo requerido" }, { status: 400 });
    }

    // Validar tipo de archivo
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Tipo no permitido: ${file.type}. Usa JPG, PNG, WebP o AVIF.`,
        },
        { status: 400 }
      );
    }

    // Validar tamaño (máximo 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Archivo muy grande. Máximo 10MB." },
        { status: 400 }
      );
    }

    // Convertir File a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generar nombre único
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `producto-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    // Subir a Sanity
    const result = await uploadImageToSanity(buffer, filename, {
      contentType: file.type,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Error subiendo imagen" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageId: result.imageId,
      url: result.url,
      sanityUrl: result.url,
      filename,
      size: file.size,
    });
  } catch (error) {
    console.error("❌ /api/admin/upload error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Error interno",
      },
      { status: 500 }
    );
  }
}
