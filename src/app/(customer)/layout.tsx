import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import { db } from "@/lib/db";
import { CustomerLayout } from "@/components/dashboard/customer-layout";

/**
 * Layout para el route group (customer) — itechperu.shop
 *
 * Protegido por sesión. Si el usuario no está autenticado, redirige a /auth/login.
 * URL: /cuenta, /cuenta/pedidos, /cuenta/favoritos, /cuenta/datos
 *
 * Usa getToken() de next-auth/jwt porque es más confiable con Turbopack.
 */
export default async function CustomerGroupLayout({
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
    redirect("/auth/login?callbackUrl=/cuenta");
  }

  // Cargar datos del usuario para pasarlos al layout
  const user = await db.user.findUnique({
    where: { email: token.email as string },
    select: { name: true, email: true, image: true, role: true },
  });

  const session = {
    user: user
      ? {
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        }
      : { name: token.name, email: token.email, image: token.picture, role: "CUSTOMER" },
  };

  return <CustomerLayout session={session}>{children}</CustomerLayout>;
}
