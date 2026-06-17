import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * NextAuth.js route handler — itechperu.shop
 *
 * Maneja todos los flujos de autenticación:
 *  - GET  /api/auth/signin       → página de login
 *  - GET  /api/auth/callback/*   → callbacks OAuth
 *  - GET  /api/auth/session      → sesión actual (JSON)
 *  - POST /api/auth/signin       → login con credentials
 *  - POST /api/auth/signout      → logout
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
