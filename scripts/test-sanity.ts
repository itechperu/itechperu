/**
 * Test de conexión a Sanity — itechperu.shop
 *
 * Verifica que las credenciales de Sanity funcionen correctamente.
 * Ejecuta: bun run scripts/test-sanity.ts
 */
import { getSanityReadClient, getSanityWriteClient, isSanityConfigured, getSanityConfigInfo } from "../src/lib/sanity/client";

async function main() {
  console.log("🧪 Verificando configuración de Sanity...\n");

  // 1. Check env vars
  if (!isSanityConfigured()) {
    console.error("❌ Sanity NO está configurado.");
    console.error("   Faltan env vars: NEXT_PUBLIC_SANITY_PROJECT_ID o SANITY_API_WRITE_TOKEN");
    process.exit(1);
  }

  const info = getSanityConfigInfo();
  console.log("✅ Configuración detectada:");
  console.log(`   Project ID: ${info?.projectId}`);
  console.log(`   Dataset: ${info?.dataset}`);
  console.log(`   Studio: ${info?.studioUrl}`);
  console.log(`   Manage: ${info?.manageUrl}`);
  console.log(`   Token write: ${info?.hasWriteToken ? "✅ presente" : "❌ ausente"}\n`);

  // 2. Test cliente de lectura (sin token)
  console.log("📡 Test cliente de lectura (fetch datasets)...");
  try {
    const readClient = getSanityReadClient();
    const result = await readClient.fetch(`*[_type == "sanity.imageAsset"][0...1]`);
    console.log(`✅ Cliente lectura OK. Assets encontrados: ${result.length}`);
  } catch (error) {
    console.error("❌ Error cliente lectura:", error instanceof Error ? error.message : error);
  }

  // 3. Test cliente de escritura (con token)
  console.log("\n✍️ Test cliente de escritura (verificando token)...");
  try {
    const writeClient = getSanityWriteClient();
    // Hacer una consulta simple que requiere auth
    const result = await writeClient.fetch(`count(*[_type == "sanity.imageAsset"])`);
    console.log(`✅ Cliente escritura OK. Total imágenes en Sanity: ${result}`);
  } catch (error) {
    console.error("❌ Error cliente escritura:", error instanceof Error ? error.message : error);
    console.error("\n   Verifica que el token tenga permisos Read+Write.");
  }

  console.log("\n🎯 Sanity listo para subir imágenes desde /admin/productos/nuevo");
}

main().catch(console.error);
