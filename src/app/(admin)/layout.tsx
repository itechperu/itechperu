import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import { db } from "@/lib/db";
import { AdminLayout } from "@/components/dashboard/admin-layout";

/**
 * Layout para el route group (admin) — itechperu.shop
 *
 * Protegido por sesión + rol ADMIN o SUPER_ADMIN.
 * Si no está autenticado → /auth/login
 * Si está autenticado pero no es admin → /cuenta (acceso denegado)
 *
 * Usa getToken() de next-auth/jwt en lugar de getServerSession()
 * porque es más confiable con Turbopack.
 */
export default async function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getToken({
    req: {
      cookies: await cookies(),
      headers: new Headers(),
    } as unknown as Request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.email) {
    redirect("/auth/login?callbackUrl=/admin");
  }

  // Verificar rol en DB (no confiar solo en JWT)
  const user = await db.user.findUnique({
    where: { email: token.email as string },
    select: { role: true, name: true, email: true, image: true },
  });

  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    // Usuario autenticado pero no admin → acceso denegado
    redirect("/cuenta?error=unauthorized");
  }

  // Pasar la sesión con el rol real de la DB
  const sessionWithRole = {
    user: {
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    },
  };

  return <AdminLayout session={sessionWithRole}>{children}</AdminLayout>;
}
