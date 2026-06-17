"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { AuthLayoutDeluxe } from "@/components/auth/auth-layout-deluxe";
import { InputDeluxe } from "@/components/auth/input-deluxe";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  color: string;
}

function getPasswordStrength(pwd: string): PasswordStrength {
  let score = 0;
  if (pwd.length >= 6) score++;
  if (pwd.length >= 10) score++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) score++;

  const labels = ["Muy débil", "Débil", "Aceptable", "Buena", "Excelente"];
  const colors = ["#EF4444", "#F59E0B", "#EAB308", "#84CC16", "#10B981"];
  return { score: score as 0 | 1 | 2 | 3 | 4, label: labels[score], color: colors[score] };
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(password);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name) e.name = "El nombre es obligatorio";
    else if (name.length < 2) e.name = "Mínimo 2 caracteres";
    if (!email) e.email = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Correo electrónico inválido";
    if (!password) e.password = "La contraseña es obligatoria";
    else if (password.length < 6) e.password = "Mínimo 6 caracteres";
    if (password !== confirmPassword)
      e.confirmPassword = "Las contraseñas no coinciden";
    if (!acceptTerms) e.terms = "Debes aceptar los términos";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  };

  return (
    <AuthLayoutDeluxe
      sideTitle="Únete a la experiencia Deluxe"
      sideSubtitle="Crea tu cuenta y desbloquea beneficios exclusivos, ofertas VIP y seguimiento premium."
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={loading ? "loading" : "form"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
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
                Cuenta Nueva
              </span>
            </motion.div>
            <h2 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#1D1D1F]">
              Crear Cuenta
            </h2>
            <p className="mt-1 text-[13px] text-[#86868B]">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/auth/login"
                className="text-[#1D1D1F] font-medium hover:text-[#D4AF37] transition-colors underline-offset-4 hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </div>

          {/* Google */}
          <div className="mb-5">
            <GoogleSignInButton label="Registrarme con Google" />
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
              label="Nombre completo"
              type="text"
              placeholder="Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User className="h-[18px] w-[18px]" strokeWidth={1.5} />}
              error={errors.name}
              success={!!name && name.length >= 2}
              autoComplete="name"
              required
            />

            <InputDeluxe
              label="Correo electrónico"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-[18px] w-[18px]" strokeWidth={1.5} />}
              error={errors.email}
              success={!!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
              autoComplete="email"
              required
            />

            <div>
              <InputDeluxe
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="h-[18px] w-[18px]" strokeWidth={1.5} />}
                error={errors.password}
                autoComplete="new-password"
                required
              />
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-[#F5F5F7] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(strength.score / 4) * 100}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: strength.color }}
                      />
                    </div>
                    <span
                      className="text-[10px] font-medium w-16 text-right"
                      style={{ color: strength.color }}
                    >
                      {strength.label}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            <InputDeluxe
              label="Confirmar contraseña"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock className="h-[18px] w-[18px]" strokeWidth={1.5} />}
              error={errors.confirmPassword}
              success={!!confirmPassword && password === confirmPassword && password.length > 0}
              autoComplete="new-password"
              required
            />

            {/* Términos */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <button
                  type="button"
                  onClick={() => setAcceptTerms((v) => !v)}
                  className={`flex h-4 w-4 mt-0.5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                    acceptTerms
                      ? "bg-[#1D1D1F] border-[#1D1D1F]"
                      : "border-[#E5E5E7] bg-white"
                  }`}
                  aria-pressed={acceptTerms}
                  aria-label="Aceptar términos"
                >
                  {acceptTerms && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <CheckCircle2 className="h-3 w-3 text-white" strokeWidth={2.5} />
                    </motion.span>
                  )}
                </button>
                <span className="text-[12px] text-[#1D1D1F]/80 leading-relaxed">
                  Acepto los{" "}
                  <Link href="/" className="text-[#1D1D1F] font-medium underline hover:text-[#D4AF37]">
                    Términos
                  </Link>{" "}
                  y la{" "}
                  <Link href="/" className="text-[#1D1D1F] font-medium underline hover:text-[#D4AF37]">
                    Política de Privacidad
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 ml-6 text-[11px] text-[#EF4444]"
                >
                  {errors.terms}
                </motion.p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] px-4 py-3.5 text-[14px] font-semibold text-white disabled:opacity-70 transition-all shadow-[0_8px_30px_-8px_rgb(212_175_55/0.5)]"
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Creando cuenta…
                </>
              ) : (
                <>
                  Crear cuenta gratis
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </>
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-[10px] text-[#86868B] leading-relaxed">
            Al registrarte recibes 10% off en tu primera compra. Código:{" "}
            <span className="font-mono font-semibold text-[#D4AF37]">BIENVENIDO10</span>
          </p>
        </motion.div>
      </AnimatePresence>
    </AuthLayoutDeluxe>
  );
}
