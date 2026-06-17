"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { AuthLayoutDeluxe } from "@/components/auth/auth-layout-deluxe";
import { InputDeluxe } from "@/components/auth/input-deluxe";

type Step = "form" | "success" | "loading";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [step, setStep] = useState<Step>("form");

  const validate = () => {
    const e: typeof errors = {};
    if (!password) e.password = "La contraseña es obligatoria";
    else if (password.length < 6) e.password = "Mínimo 6 caracteres";
    if (password !== confirmPassword) e.confirm = "Las contraseñas no coinciden";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStep("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setStep("success");
  };

  return (
    <AuthLayoutDeluxe
      sideTitle="Nueva contraseña"
      sideSubtitle="Define una contraseña segura para proteger tu cuenta Deluxe."
    >
      <AnimatePresence mode="wait">
        {step === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
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

            <h2 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#1D1D1F]">
              ¡Contraseña actualizada!
            </h2>
            <p className="mt-2 text-[13px] text-[#86868B] leading-relaxed">
              Tu cuenta ha sido protegida con tu nueva contraseña.
              <br />
              Ya puedes iniciar sesión normalmente.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-[#1D1D1F] px-4 py-3 text-[14px] font-semibold text-white hover:bg-[#1D1D1F]/90 transition-colors"
              >
                Ir a iniciar sesión
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/10 px-2.5 py-1 mb-3"
              >
                <Sparkles className="h-3 w-3 text-[#D4AF37]" strokeWidth={1.5} />
                <span className="text-[10px] font-medium text-[#D4AF37] tracking-wide">
                  Restablecer
                </span>
              </motion.div>
              <h2 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#1D1D1F]">
                Crear nueva contraseña
              </h2>
              <p className="mt-1 text-[13px] text-[#86868B] leading-relaxed">
                Tu nueva contraseña debe ser diferente a la anterior y tener al
                menos 6 caracteres.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <InputDeluxe
                label="Nueva contraseña"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="h-[18px] w-[18px]" strokeWidth={1.5} />}
                error={errors.password}
                autoComplete="new-password"
                required
              />

              <InputDeluxe
                label="Confirmar nueva contraseña"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock className="h-[18px] w-[18px]" strokeWidth={1.5} />}
                error={errors.confirm}
                success={
                  !!confirmPassword && password === confirmPassword && password.length > 0
                }
                autoComplete="new-password"
                required
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                disabled={step === "loading"}
                className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] px-4 py-3.5 text-[14px] font-semibold text-white disabled:opacity-70 transition-all shadow-[0_8px_30px_-8px_rgb(212_175_55/0.5)]"
              >
                {step === "loading" ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Guardando…
                  </>
                ) : (
                  <>
                    Guardar nueva contraseña
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </>
                )}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-[12px] text-[#86868B]">
              <Link
                href="/auth/login"
                className="text-[#1D1D1F] font-medium hover:text-[#D4AF37] transition-colors underline-offset-4 hover:underline"
              >
                Cancelar y volver
              </Link>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayoutDeluxe>
  );
}
