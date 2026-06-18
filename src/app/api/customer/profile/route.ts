import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * GET /api/customer/profile
 * Retorna los datos del perfil del usuario autenticado.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("❌ /api/customer/profile GET error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

/**
 * PATCH /api/customer/profile
 * Actualiza los datos del perfil (name, phone).
 * El email no se puede cambiar.
 */
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone } = body;

    const user = await db.user.update({
      where: { email: session.user.email },
      data: {
        ...(typeof name === "string" && name.trim() ? { name: name.trim() } : {}),
        ...(typeof phone === "string" ? { phone: phone.trim() || null } : {}),
      },
      select: { id: true, name: true, email: true, phone: true, image: true },
    });

    return NextResponse.json({ ok: true, user });
  } catch (error) {
    console.error("❌ /api/customer/profile PATCH error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
