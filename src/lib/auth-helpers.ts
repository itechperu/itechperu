import { hash } from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";

/**
 * Helpers de autenticación — itechperu.shop
 */

const registerSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Registra un nuevo usuario con email + password hasheado con bcrypt.
 * @returns El usuario creado (sin password) o lanza error si ya existe.
 */
export async function registerUser(input: RegisterInput) {
  const data = registerSchema.parse(input);

  const existing = await db.user.findUnique({
    where: { email: data.email.toLowerCase() },
  });
  if (existing) {
    throw new Error("Ya existe una cuenta con este correo");
  }

  const hashedPassword = await hash(data.password, 12);

  const user = await db.user.create({
    data: {
      name: data.name,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      role: "CUSTOMER",
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  return user;
}

/**
 * Obtiene un usuario por email (para login con credentials).
 */
export async function getUserByEmail(email: string) {
  return db.user.findUnique({
    where: { email: email.toLowerCase() },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      role: true,
      phone: true,
      password: true,
    },
  });
}
