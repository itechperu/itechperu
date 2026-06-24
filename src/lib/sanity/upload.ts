import { sanityWriteClient } from "./client";

/**
 * Upload de imágenes a Sanity — itechperu.shop
 *
 * Sube una imagen a Sanity y retorna el ID del asset creado.
 * Ese ID se guarda en la DB (campo images del producto) y se usa
 * para generar URLs optimizadas via getSanityImageUrl().
 */

export interface UploadResult {
  success: boolean;
  imageId?: string; // ID del asset en Sanity (ej: "image-abc123-800x600-jpg")
  url?: string; // URL pública del CDN
  error?: string;
}

/**
 * Sube un Buffer o base64 a Sanity como asset de imagen.
 *
 * @param buffer - Buffer de la imagen (Node Buffer) o base64 string
 * @param filename - Nombre del archivo (ej: "ipad-pro.jpg")
 * @param options - { contentType }
 * @returns UploadResult con el imageId
 */
export async function uploadImageToSanity(
  buffer: Buffer | string,
  filename: string,
  options: { contentType?: string } = {}
): Promise<UploadResult> {
  try {
    const { contentType = "image/jpeg" } = options;
    const actualBuffer = typeof buffer === "string"
      ? Buffer.from(buffer, "base64")
      : buffer;

    // Subir a Sanity como asset
    const asset = await sanityWriteClient.assets.upload(
      "image",
      actualBuffer,
      {
        filename,
        contentType,
      }
    );

    return {
      success: true,
      imageId: asset._id, // ej: "image-abc123-800x600-jpg"
      url: asset.url,
    };
  } catch (error) {
    console.error("❌ Sanity upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error subiendo imagen",
    };
  }
}

/**
 * Elimina una imagen de Sanity por su asset ID.
 * Útil cuando se reemplaza una imagen en un producto.
 */
export async function deleteImageFromSanity(imageId: string): Promise<boolean> {
  try {
    await sanityWriteClient.delete(imageId);
    return true;
  } catch (error) {
    console.error("❌ Sanity delete error:", error);
    return false;
  }
}
