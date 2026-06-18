import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";

/**
 * NextAuth.js v4 — Configuración para itechperu.shop
 *
 * Providers:
 *  - Google OAuth (con Prisma Adapter para guardar en DB)
 *  - Credentials (email + password con bcrypt)
 *
 * Sesiones: JWT (sin sesión en DB para simplicidad)
 */
export const authOptions: NextAuthOptions = {
  // @ts-expect-error - Prisma Adapter v2 tiene tipos ligeramente diferentes a NextAuth v4
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("❌ authorize: faltan credenciales");
            return null;
          }

          const user = await db.user.findUnique({
            where: { email: credentials.email.toLowerCase() },
          });

          if (!user || !user.password) {
            console.log("❌ authorize: usuario no encontrado:", credentials.email);
            return null;
          }

          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            console.log("❌ authorize: password inválida para:", credentials.email);
            return null;
          }

          console.log("✅ authorize: login exitoso para:", credentials.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("❌ authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "CUSTOMER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      console.log("✅ Nuevo usuario creado:", user.email);
    },
  },
  debug: process.env.NODE_ENV === "development",
};
