/**
 * Helpers de formato — itechperu.shop
 */

/**
 * Convierte centavos a soles (PEN) formateado.
 * Ej: 349900 → "S/ 3,499"
 */
export function formatPEN(cents: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

/**
 * Convierte soles a centavos (para almacenar en DB).
 * Ej: 3499.50 → 349950
 */
export function solesToCents(soles: number): number {
  return Math.round(soles * 100);
}

/**
 * Genera un número de orden legible: ITP-2026-00001
 */
export function generateOrderNumber(seq: number): string {
  const year = new Date().getFullYear();
  const padded = String(seq).padStart(5, "0");
  return `ITP-${year}-${padded}`;
}

/**
 * Valida celular peruano: 9 dígitos empezando con 9.
 */
export function isValidPeruvianPhone(phone: string): boolean {
  const clean = phone.replace(/\D/g, "");
  return /^9\d{8}$/.test(clean) || /^\+?51\s?9\d{8}$/.test(phone.replace(/\s/g, ""));
}
