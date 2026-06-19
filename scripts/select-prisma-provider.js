/**
 * select-prisma-provider.js
 *
 * Detecta el provider correcto para Prisma según DATABASE_URL:
 *   - Si empieza con "file:" → SQLite (desarrollo local)
 *   - Si empieza con "postgres" → PostgreSQL (Supabase/Neon en producción)
 *
 * Modifica prisma/schema.prisma in-place antes de `prisma generate` y `prisma db push`.
 * Esto permite tener un solo schema.prisma que funcione en ambos entornos
 * sin necesidad de cambiar manualmente el provider.
 *
 * Uso (en package.json):
 *   "prebuild:prisma": "node scripts/select-prisma-provider.js",
 *   "predev": "node scripts/select-prisma-provider.js",
 *   "db:push": "node scripts/select-prisma-provider.js && prisma db push",
 *   "db:generate": "node scripts/select-prisma-provider.js && prisma generate",
 *   "build": "node scripts/select-prisma-provider.js && prisma generate && next build"
 */

const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "..", "prisma", "schema.prisma");
const dbUrl = process.env.DATABASE_URL || "";

const isPostgres = dbUrl.startsWith("postgres");
const provider = isPostgres ? "postgresql" : "sqlite";

console.log(`🔧 [Prisma provider] DATABASE_URL detectado: ${dbUrl.substring(0, 40)}${dbUrl.length > 40 ? "..." : ""}`);
console.log(`🔧 [Prisma provider] Usando provider: ${provider}`);

let schema = fs.readFileSync(schemaPath, "utf8");

// Reemplazar el bloque datasource.db.provider
const providerRegex = /(datasource\s+db\s*\{[^}]*?provider\s*=\s*)"(postgresql|sqlite)"/s;
if (!providerRegex.test(schema)) {
  console.error("❌ No se encontró el bloque datasource db { ... provider = '...' }");
  process.exit(1);
}

schema = schema.replace(providerRegex, `$1"${provider}"`);
fs.writeFileSync(schemaPath, schema, "utf8");

console.log(`✅ [Prisma provider] schema.prisma actualizado con provider="${provider}"`);
