import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * GET /api/customer/favorites
 * Retorna los favoritos del usuario autenticado.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const favorites = await db.favorite.findMany({
      where: { userId: (await db.user.findUnique({ where: { email: session.user.email }, select: { id: true } }))?.id },
      include: {
        product: {
          select: {
            id: true,
            slug: true,
            title: true,
            basePrice: true,
            images: true,
            isActive: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("❌ /api/customer/favorites error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

/**
 * POST /api/customer/favorites
 * Agrega un producto a favoritos.
 * Body: { productId }
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { productId } = await req.json();
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const favorite = await db.favorite.upsert({
      where: {
        userId_productId: { userId: user.id, productId },
      },
      update: {},
      create: { userId: user.id, productId },
    });

    return NextResponse.json({ ok: true, favorite });
  } catch (error) {
    console.error("❌ POST /api/customer/favorites error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

/**
 * DELETE /api/customer/favorites
 * Elimina un producto de favoritos.
 * Body: { productId }
 */
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { productId } = await req.json();
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    await db.favorite.deleteMany({
      where: { userId: user.id, productId },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ DELETE /api/customer/favorites error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
