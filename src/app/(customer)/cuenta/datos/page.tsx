"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Save, CheckCircle2 } from "lucide-react";
import { InputDeluxe } from "@/components/auth/input-deluxe";
import { useSessionDeluxe } from "@/hooks/use-session-deluxe";

export default function CustomerDataPage() {
  const { data: session } = useSessionDeluxe();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
    // Cargar teléfono desde la API
    async function loadProfile() {
      try {
        const res = await fetch("/api/customer/profile", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setName(data.user.name || "");
            setPhone(data.user.phone || "");
          }
        }
      } catch {
        // ignore
      }
    }
    loadProfile();
  }, [session]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/customer/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#1D1D1F]">
        Mis Datos
      </h1>
      <p className="text-[13px] text-[#86868B] mt-1">
        Actualiza tu información personal
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
        <div className="rounded-2xl bg-white border border-[#E5E5E7] p-5 space-y-4">
          <h2 className="text-[14px] font-semibold tracking-tight text-[#1D1D1F]">
            Información personal
          </h2>

          <InputDeluxe
            label="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<User className="h-[18px] w-[18px]" strokeWidth={1.5} />}
            required
          />

          <InputDeluxe
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="h-[18px] w-[18px]" strokeWidth={1.5} />}
            disabled
            hint="El correo no se puede cambiar"
          />

          <InputDeluxe
            label="Celular (WhatsApp)"
            type="tel"
            placeholder="987654321"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            icon={<Phone className="h-[18px] w-[18px]" strokeWidth={1.5} />}
            hint="Para coordinar entregas y notificaciones"
          />
        </div>

        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 px-4 py-2.5 text-[12px] text-[#10B981]"
          >
            <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
            Datos guardados correctamente
          </motion.div>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#1D1D1F] px-4 py-3.5 text-[14px] font-semibold text-white disabled:opacity-70 hover:bg-[#1D1D1F]/90 transition-colors"
        >
          {saving ? (
            <>
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Guardando…
            </>
          ) : (
            <>
              <Save className="h-4 w-4" strokeWidth={1.5} />
              Guardar cambios
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
