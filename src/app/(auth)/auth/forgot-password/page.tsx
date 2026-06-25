"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { AuthLayoutDeluxe } from "@/components/auth/auth-layout-deluxe";
import { InputDeluxe } from "@/components/auth/input-deluxe";

type Step = "request" | "sent" | "loading";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [step, setStep] = useState<Step>("request");

  const validate = () => {
    if (!email) {
      setError("El correo es obligatorio");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Correo electrónico inválido");
      return false;
    }
    setError(undefined);
    return true;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStep("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setStep("sent");
  };

  return (
    <AuthLayoutDeluxe
      sideTitle="Recupera tu acceso"
      sideSubtitle="Te enviaremos un enlace seguro para restablecer tu contraseña."
    >
      <AnimatePresence mode="wait">
        {step === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981]/10 mb-4"
            >
              <CheckCircle2 className="h-8 w-8 text-[#10B981]" strokeWidth={1.5} />
            </motion.div>

            <h2 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[var(--text-primary)]">
              Revisa tu correo
            </h2>
            <p className="mt-2 text-[13px] text-[var(--text-secondary)] leading-relaxed">
              Hemos enviado un enlace de recuperación a
              <br />
              <span className="font-semibold text-[var(--text-primary)]">{email}</span>
            </p>

            <div className="mt-6 rounded-2xl bg-[var(--bg-secondary)] p-4 text-left">
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                💡 <span className="font-medium">Tip:</span> Si no lo recibes en 5 minutos,
                revisa tu carpeta de spam o correo no deseado. El enlace expira en 1 hora.
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep("request")}
                className="w-full rounded-2xl bg-[#1D1D1F] px-4 py-3 text-[14px] font-semibold text-white"
              >
                Reenviar enlace
              </motion.button>
              <Link
                href="/auth/login"
                className="block w-full rounded-2xl border-2 border-[var(--border-color)] px-4 py-3 text-[14px] font-medium text-[var(--text-primary)] hover:border-[#1D1D1F]/30 transition-colors"
              >
                Volver a iniciar sesión
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="request"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back */}
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
              Volver
            </Link>

            {/* Header */}
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/10 px-2.5 py-1 mb-3"
              >
                <Sparkles className="h-3 w-3 text-[#D4AF37]" strokeWidth={1.5} />
                <span className="text-[10px] font-medium text-[#D4AF37] tracking-wide">
                  Recuperación Segura
                </span>
              </motion.div>
              <h2 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[var(--text-primary)]">
                Olvidé mi contraseña
              </h2>
              <p className="mt-1 text-[13px] text-[var(--text-secondary)] leading-relaxed">
                No te preocupes. Ingresa tu correo y te enviaremos un enlace para
                crear una nueva contraseña.
              </p>
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
                error={error}
                hint="Te enviaremos un enlace de recuperación a este correo."
                autoComplete="email"
                required
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                disabled={step === "loading"}
                className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-[#1D1D1F] px-4 py-3.5 text-[14px] font-semibold text-white disabled:opacity-70 hover:bg-[#1D1D1F]/90 transition-all shadow-[0_8px_30px_-8px_rgb(0_0_0/0.3)]"
              >
                {step === "loading" ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Enviando…
                  </>
                ) : (
                  <>
                    Enviar enlace de recuperación
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </>
                )}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-[12px] text-[var(--text-secondary)]">
              ¿Recordaste tu contraseña?{" "}
              <Link
                href="/auth/login"
                className="text-[var(--text-primary)] font-medium hover:text-[#D4AF37] transition-colors underline-offset-4 hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayoutDeluxe>
  );
}
