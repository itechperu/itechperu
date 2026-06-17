import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { registerUser } from "@/lib/auth-helpers";

/**
 * POST /api/auth/register
 *
 * Body: { name, email, password }
 *
 * Registra un nuevo usuario y retorna sus datos (sin password).
 * Para login automático, el cliente debe llamar a signIn("credentials") después.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await registerUser(body);

    return NextResponse.json(
      {
        ok: true,
        user,
        message: "Cuenta creada. Verifica tu correo.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { ok: false, error: error.errors[0]?.message || "Datos inválidos" },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
