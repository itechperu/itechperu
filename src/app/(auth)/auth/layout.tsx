/**
 * Layout para el route group (auth) — itechperu.shop
 *
 * Las páginas dentro de (auth) NO heredan el header sticky ni la tab bar
 * flotante del layout principal porque este layout los reemplaza por
 * un layout limpio optimizado para autenticación.
 *
 * URLs:
 *  - /(auth)/login        → /auth/login
 *  - /(auth)/register     → /auth/register
 *  - /(auth)/forgot-password → /auth/forgot-password
 *  - /(auth)/reset-password  → /auth/reset-password
 *  - /(auth)/verify-email    → /auth/verify-email
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-white">{children}</div>;
}
