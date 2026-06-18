"use client";

import { useState, Suspense, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { AuthLayoutDeluxe } from "@/components/auth/auth-layout-deluxe";
import { InputDeluxe } from "@/components/auth/input-deluxe";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

type Mode = "login" | "loading";

/**
 * Wrapper export default que envuelve el contenido en <Suspense>.
 * Esto es obligatorio en Next.js 16 cuando se usa useSearchParams()
 * durante el prerendering estático.
 */
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 border-2 border-[#E5E5E7] border-t-[#D4AF37] rounded-full animate-spin" />
            <p className="text-[12px] text-[#86868B]">Cargando…</p>
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [mode, setMode] = useState<Mode>("login");
  const [authError, setAuthError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Correo electrónico inválido";
    if (!password) e.password = "La contraseña es obligatoria";
    else if (password.length < 6) e.password = "Mínimo 6 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setAuthError(null);
    if (!validate()) return;
    setMode("loading");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError("Correo o contraseña incorrectos");
        setMode("login");
        return;
      }

      // Login exitoso → redirigir
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setAuthError("Error al iniciar sesión. Intenta de nuevo.");
      setMode("login");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <AuthLayoutDeluxe
      sideTitle="Bienvenido de vuelta"
      sideSubtitle="Inicia sesión para acceder a ofertas exclusivas, favoritos y pedidos."
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/10 px-2.5 py-1 mb-3"
            >
              <Sparkles className="h-3 w-3 text-[#D4AF37]" strokeWidth={1.5} />
              <span className="text-[10px] font-medium text-[#D4AF37] tracking-wide">
                Acceso Deluxe
              </span>
            </motion.div>
            <h2 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#1D1D1F]">
              Iniciar Sesión
            </h2>
            <p className="mt-1 text-[13px] text-[#86868B]">
              ¿No tienes cuenta?{" "}
              <Link
                href="/auth/register"
                className="text-[#1D1D1F] font-medium hover:text-[#D4AF37] transition-colors underline-offset-4 hover:underline"
              >
                Regístrate gratis
              </Link>
            </p>
          </div>

          {/* Auth error global */}
          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center gap-2 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/30 px-4 py-2.5 text-[12px] text-[#EF4444]"
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
              {authError}
            </motion.div>
          )}

          {/* Google Sign-In */}
          <div className="mb-5">
            <GoogleSignInButton onClick={handleGoogleSignIn} />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-[#E5E5E7]" />
            <span className="text-[11px] text-[#86868B] font-medium">o con tu correo</span>
            <div className="h-px flex-1 bg-[#E5E5E7]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <InputDeluxe
              label="Correo electrónico"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-[18px] w-[18px]" strokeWidth={1.5} />}
              error={errors.email}
              autoComplete="email"
              required
            />

            <InputDeluxe
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-[18px] w-[18px]" strokeWidth={1.5} />}
              error={errors.password}
              autoComplete="current-password"
              required
            />

            <div className="flex items-center justify-between text-[12px]">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <button
                  type="button"
                  onClick={() => setRememberMe((v) => !v)}
                  className={`flex h-4 w-4 items-center justify-center rounded-md border-2 transition-all ${
                    rememberMe
                      ? "bg-[#1D1D1F] border-[#1D1D1F]"
                      : "border-[#E5E5E7] bg-white"
                  }`}
                  aria-pressed={rememberMe}
                  aria-label="Recordarme"
                >
                  {rememberMe && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-2.5 w-2.5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  )}
                </button>
                <span className="text-[#1D1D1F]/80">Recordarme</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-[#1D1D1F] font-medium hover:text-[#D4AF37] transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              disabled={mode === "loading"}
              className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-[#1D1D1F] px-4 py-3.5 text-[14px] font-semibold text-white disabled:opacity-70 hover:bg-[#1D1D1F]/90 transition-all shadow-[0_8px_30px_-8px_rgb(0_0_0/0.3)]"
            >
              {mode === "loading" ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Ingresando…
                </>
              ) : (
                <>
                  Iniciar sesión
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </>
              )}
            </motion.button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 rounded-2xl bg-[#F5F5F7] p-3 text-center">
            <p className="text-[10px] text-[#86868B] uppercase tracking-wider font-medium mb-1">
              Cuenta demo
            </p>
            <p className="text-[11px] text-[#1D1D1F] font-mono">
              demo@itechperu.shop · admin123
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </AuthLayoutDeluxe>
  );
}
