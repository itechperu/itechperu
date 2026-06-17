import { type DefaultSession } from "next-auth";

/**
 * Extiende los tipos de NextAuth para incluir `id` y `role` en session.user.
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}
