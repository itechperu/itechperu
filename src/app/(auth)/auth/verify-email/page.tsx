"use client";

import { useState, useRef, type KeyboardEvent, type ClipboardEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, RefreshCw, Sparkles } from "lucide-react";
import { AuthLayoutDeluxe } from "@/components/auth/auth-layout-deluxe";

const OTP_LENGTH = 6;

type Step = "otp" | "verifying" | "success";

export default function VerifyEmailPage() {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [step, setStep] = useState<Step>("otp");
  const [error, setError] = useState<string>();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[i] = value;
    setDigits(next);
    setError(undefined);

    if (value && i < OTP_LENGTH - 1) {
      inputsRef.current[i + 1]?.focus();
    }

    // Auto-submit when all filled
    if (value && i === OTP_LENGTH - 1 && next.every((d) => d)) {
      verify(next.join(""));
    }
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
    if (e.key === "ArrowRight" && i < OTP_LENGTH - 1) {
      inputsRef.current[i + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((d, idx) => (next[idx] = d));
    setDigits(next);
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
    if (next.every((d) => d)) verify(next.join(""));
  };

  const verify = async (code: string) => {
    setStep("verifying");
    await new Promise((r) => setTimeout(r, 1500));
    if (code === "123456" || code.length === OTP_LENGTH) {
      // Sprint 3: validar código real contra backend
      setStep("success");
    } else {
      setError("Código inválido. Intenta de nuevo.");
      setStep("otp");
      setDigits(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    }
  };

  const handleResend = () => {
    setDigits(Array(OTP_LENGTH).fill(""));
    setError(undefined);
    inputsRef.current[0]?.focus();
  };

  return (
    <AuthLayoutDeluxe
      sideTitle="Verifica tu correo"
      sideSubtitle="Ingresa el código de 6 dígitos que enviamos a tu email."
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
              ¡Correo verificado!
            </h2>
            <p className="mt-2 text-[13px] text-[#86868B] leading-relaxed">
              Tu cuenta Deluxe está activa. Ya puedes disfrutar de todos los
              beneficios premium.
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
            key="otp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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
                  Verificación
                </span>
              </motion.div>
              <h2 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#1D1D1F]">
                Verifica tu correo
              </h2>
              <p className="mt-1 text-[13px] text-[#86868B] leading-relaxed">
                Enviamos un código de 6 dígitos a
                <br />
                <span className="font-semibold text-[#1D1D1F]">tu***@correo.com</span>
              </p>
            </div>

            {/* OTP Inputs */}
            <div className="flex gap-2 justify-between mb-4" onPaste={handlePaste}>
              {digits.map((d, i) => (
                <motion.input
                  key={i}
                  ref={(el) => { inputsRef.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  disabled={step === "verifying"}
                  animate={{
                    borderColor: error ? "#EF4444" : d ? "#D4AF37" : "#E5E5E7",
                    backgroundColor: error ? "#FEF2F2" : d ? "#FFFBEB" : "#F5F5F7",
                  }}
                  className="w-12 h-14 lg:w-14 lg:h-16 text-center text-[22px] lg:text-[24px] font-bold text-[#1D1D1F] border-2 rounded-2xl focus:outline-none focus:shadow-[0_4px_20px_-4px_rgba(212,175,55,0.3)] transition-shadow"
                  aria-label={`Dígito ${i + 1}`}
                />
              ))}
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="mb-4 text-[12px] text-[#EF4444] text-center font-medium"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="button"
              onClick={() => verify(digits.join(""))}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              disabled={step === "verifying" || digits.some((d) => !d)}
              className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-[#1D1D1F] px-4 py-3.5 text-[14px] font-semibold text-white disabled:opacity-50 hover:bg-[#1D1D1F]/90 transition-all shadow-[0_8px_30px_-8px_rgb(0_0_0/0.3)]"
            >
              {step === "verifying" ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Verificando…
                </>
              ) : (
                <>
                  Verificar código
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </>
              )}
            </motion.button>

            {/* Resend */}
            <div className="mt-6 text-center">
              <p className="text-[12px] text-[#86868B]">¿No recibiste el código?</p>
              <button
                type="button"
                onClick={handleResend}
                className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D1D1F] hover:text-[#D4AF37] transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.5} />
                Reenviar código
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayoutDeluxe>
  );
}
