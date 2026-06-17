"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Lock,
  MessageCircle,
} from "lucide-react";
import { useCart } from "@/store/use-cart";
import { formatPEN } from "@/data/products";
import { InputDeluxe } from "@/components/auth/input-deluxe";
import { useSessionDeluxe } from "@/hooks/use-session-deluxe";
import { signIn } from "next-auth/react";

type PaymentMethod = "MERCADO_PAGO" | "CASH_ON_DELIVERY";
type Step = "form" | "processing" | "redirecting";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSessionDeluxe();
  const { items, getSubtotal, getShipping, getTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("MERCADO_PAGO");
  const [step, setStep] = useState<Step>("form");
  const [error, setError] = useState<string | null>(null);

  // Datos del cliente (se sincronizan automáticamente cuando la sesión carga)
  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("Lima");
  const [reference, setReference] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  // Si no hay items, mostrar estado vacío
  if (items.length === 0 && step === "form") {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F5F7] mb-4">
          <Truck className="h-8 w-8 text-[#86868B]" strokeWidth={1.5} />
        </div>
        <h1 className="text-[20px] font-bold tracking-tight text-[#1D1D1F]">
          Tu carrito está vacío
        </h1>
        <p className="mt-2 text-[13px] text-[#86868B]">
          Agrega productos al carrito para continuar con la compra
        </p>
        <Link
          href="/#catalogo"
          className="inline-flex items-center gap-2 mt-6 rounded-full bg-[#1D1D1F] px-6 py-3 text-[13px] font-semibold text-white tap-scale"
        >
          Ver catálogo
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </div>
    );
  }

  // Si no está autenticado, sugerir login
  if (status === "unauthenticated" && step === "form") {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/10 mb-4">
          <Lock className="h-8 w-8 text-[#D4AF37]" strokeWidth={1.5} />
        </div>
        <h1 className="text-[20px] font-bold tracking-tight text-[#1D1D1F]">
          Inicia sesión para comprar
        </h1>
        <p className="mt-2 text-[13px] text-[#86868B]">
          Necesitas una cuenta Deluxe para finalizar tu compra de forma segura
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/auth/login?callbackUrl=/checkout"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1D1D1F] px-6 py-3 text-[13px] font-semibold text-white tap-scale"
          >
            Iniciar sesión
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <Link
            href="/auth/register?callbackUrl=/checkout"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#E5E5E7] px-6 py-3 text-[13px] font-semibold text-[#1D1D1F] tap-scale"
          >
            Crear cuenta gratis
          </Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name) e.name = "Nombre obligatorio";
    if (!email) e.email = "Email obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email inválido";
    if (!phone) e.phone = "Celular obligatorio";
    else if (!/^9\d{8}$/.test(phone.replace(/\D/g, "").replace(/^51/, "")))
      e.phone = "Celular peruano inválido (9 dígitos)";
    if (!address) e.address = "Dirección obligatoria";
    if (!district) e.district = "Distrito obligatorio";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev?: FormEvent | React.MouseEvent) => {
    ev?.preventDefault();
    setError(null);

    // Sincronizar con sesión si los campos están vacíos
    const finalName = name || userName;
    const finalEmail = email || userEmail;
    if (finalName !== name) setName(finalName);
    if (finalEmail !== email) setEmail(finalEmail);

    // Validar usando los valores finales
    const e: Record<string, string> = {};
    if (!finalName) e.name = "Nombre obligatorio";
    if (!finalEmail) e.email = "Email obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(finalEmail)) e.email = "Email inválido";
    if (!phone) e.phone = "Celular obligatorio";
    else if (!/^9\d{8}$/.test(phone.replace(/\D/g, "").replace(/^51/, "")))
      e.phone = "Celular peruano inválido (9 dígitos)";
    if (!address) e.address = "Dirección obligatoria";
    if (!district) e.district = "Distrito obligatorio";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStep("processing");

    try {
      if (paymentMethod === "MERCADO_PAGO") {
        // Crear preferencia en MP
        const res = await fetch("/api/mercadopago/create-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({
              productId: i.productId,
              grade: i.grade,
              quantity: i.quantity,
            })),
            customer: { name: finalName, email: finalEmail, phone },
            shipping: { address, district, city, reference },
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Error al procesar el pago");
          setStep("form");
          return;
        }

        setStep("redirecting");
        // Redirigir a Mercado Pago
        window.location.href = data.initPoint;
      } else {
        // Contraentrega: crear orden directamente
        const res = await fetch("/api/orders/cash-on-delivery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({
              productId: i.productId,
              grade: i.grade,
              quantity: i.quantity,
            })),
            customer: { name: finalName, email: finalEmail, phone },
            shipping: { address, district, city, reference },
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Error al crear el pedido");
          setStep("form");
          return;
        }

        clearCart();
        router.push(`/checkout/success?order=${data.orderId}&cod=1`);
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setStep("form");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <Link
        href="/#catalogo"
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors mb-4"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Seguir comprando
      </Link>

      <h1 className="text-[24px] lg:text-[32px] font-bold tracking-tight text-[#1D1D1F] mb-6">
        Checkout Deluxe
      </h1>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }} noValidate className="grid lg:grid-cols-[1fr_400px] gap-6 lg:gap-8">
        {/* ====== COLUMNA IZQUIERDA: Datos y método de pago ====== */}
        <div className="space-y-5">
          {/* Datos del cliente */}
          <section className="rounded-3xl border border-[#E5E5E7] p-5 lg:p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1D1D1F] text-[11px] font-bold text-white">
                1
              </span>
              <h2 className="text-[15px] font-semibold tracking-tight text-[#1D1D1F]">
                Datos del cliente
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <InputDeluxe
                label="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                required
              />
              <InputDeluxe
                label="Celular"
                type="tel"
                placeholder="987654321"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                hint="9 dígitos, sin +51"
                required
              />
              <div className="sm:col-span-2">
                <InputDeluxe
                  label="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  required
                />
              </div>
            </div>
          </section>

          {/* Dirección de envío */}
          <section className="rounded-3xl border border-[#E5E5E7] p-5 lg:p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1D1D1F] text-[11px] font-bold text-white">
                2
              </span>
              <h2 className="text-[15px] font-semibold tracking-tight text-[#1D1D1F]">
                Dirección de envío
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <InputDeluxe
                  label="Dirección"
                  placeholder="Av. Javier Prado 123, dpto 401"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  error={errors.address}
                  required
                />
              </div>
              <InputDeluxe
                label="Distrito"
                placeholder="Miraflores"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                error={errors.district}
                required
              />
              <div>
                <label className="block text-[12px] font-medium text-[#1D1D1F]/80 mb-1.5">
                  Ciudad
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 text-[14px] text-[#1D1D1F] bg-[#F5F5F7] border-2 border-[#E5E5E7] rounded-2xl focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all"
                >
                  <option>Lima</option>
                  <option>Arequipa</option>
                  <option>Trujillo</option>
                  <option>Chiclayo</option>
                  <option>Piura</option>
                  <option>Cusco</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <InputDeluxe
                  label="Referencia (opcional)"
                  placeholder="Frente al parque, casa azul"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Método de pago */}
          <section className="rounded-3xl border border-[#E5E5E7] p-5 lg:p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1D1D1F] text-[11px] font-bold text-white">
                3
              </span>
              <h2 className="text-[15px] font-semibold tracking-tight text-[#1D1D1F]">
                Método de pago
              </h2>
            </div>

            <div className="space-y-2.5">
              {/* Mercado Pago */}
              <button
                type="button"
                onClick={() => setPaymentMethod("MERCADO_PAGO")}
                className={`w-full flex items-center gap-3 rounded-2xl border-2 p-4 transition-all text-left ${
                  paymentMethod === "MERCADO_PAGO"
                    ? "border-[#D4AF37] bg-[#FFFBEB] shadow-[0_4px_20px_-4px_rgba(212,175,55,0.3)]"
                    : "border-[#E5E5E7] hover:border-[#D4AF37]/40"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#E5E5E7]">
                  <CreditCard className="h-5 w-5 text-[#1D1D1F]" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#1D1D1F]">
                    Mercado Pago
                  </p>
                  <p className="text-[11px] text-[#86868B]">
                    Tarjeta · Yape · PLIN · Efectivo
                  </p>
                </div>
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                    paymentMethod === "MERCADO_PAGO"
                      ? "border-[#D4AF37] bg-[#D4AF37]"
                      : "border-[#E5E5E7]"
                  }`}
                >
                  {paymentMethod === "MERCADO_PAGO" && (
                    <CheckCircle2 className="h-3 w-3 text-white" strokeWidth={2.5} />
                  )}
                </div>
              </button>

              {/* Contraentrega */}
              <button
                type="button"
                onClick={() => setPaymentMethod("CASH_ON_DELIVERY")}
                className={`w-full flex items-center gap-3 rounded-2xl border-2 p-4 transition-all text-left ${
                  paymentMethod === "CASH_ON_DELIVERY"
                    ? "border-[#D4AF37] bg-[#FFFBEB] shadow-[0_4px_20px_-4px_rgba(212,175,55,0.3)]"
                    : "border-[#E5E5E7] hover:border-[#D4AF37]/40"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#E5E5E7]">
                  <Truck className="h-5 w-5 text-[#1D1D1F]" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#1D1D1F]">
                    Pago Contraentrega (Lima)
                  </p>
                  <p className="text-[11px] text-[#86868B]">
                    Paga en efectivo al recibir tu pedido
                  </p>
                </div>
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                    paymentMethod === "CASH_ON_DELIVERY"
                      ? "border-[#D4AF37] bg-[#D4AF37]"
                      : "border-[#E5E5E7]"
                  }`}
                >
                  {paymentMethod === "CASH_ON_DELIVERY" && (
                    <CheckCircle2 className="h-3 w-3 text-white" strokeWidth={2.5} />
                  )}
                </div>
              </button>
            </div>

            {/* Toggle switch elegante para contraentrega (efecto visual) */}
            <AnimatePresence>
              {paymentMethod === "CASH_ON_DELIVERY" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 rounded-2xl bg-[#F5F5F7] p-3 text-[11px] text-[#1D1D1F]/80"
                >
                  💡 Solo disponible en Lima Metropolitana. El mensajero verificará
                  el equipo contigo antes de recibir el pago.
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* ====== COLUMNA DERECHA: Resumen del pedido ====== */}
        <aside className="lg:sticky lg:top-[160px] lg:self-start">
          <div className="rounded-3xl border border-[#E5E5E7] p-5 lg:p-6 space-y-4">
            <h2 className="text-[15px] font-semibold tracking-tight text-[#1D1D1F]">
              Tu pedido
            </h2>

            {/* Items */}
            <ul className="space-y-2.5 max-h-[300px] overflow-y-auto">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.grade}`}
                  className="flex gap-2.5 items-center"
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1D1D1F] px-1 text-[9px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-[#1D1D1F] leading-tight line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-[#86868B]">Grado {item.grade}</p>
                  </div>
                  <span className="text-[12px] font-semibold text-[#1D1D1F]">
                    {formatPEN(item.unitPrice * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            {/* Totales */}
            <div className="space-y-1.5 pt-3 border-t border-[#E5E5E7]">
              <div className="flex justify-between text-[12px]">
                <span className="text-[#86868B]">Subtotal</span>
                <span className="font-medium text-[#1D1D1F]">{formatPEN(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-[#86868B]">Envío</span>
                <span className="font-medium text-[#1D1D1F]">
                  {shipping === 0 ? (
                    <span className="text-[#10B981]">Gratis</span>
                  ) : (
                    formatPEN(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E5E5E7]">
                <span className="text-[14px] font-semibold text-[#1D1D1F]">Total</span>
                <span className="text-[22px] font-bold text-[#1D1D1F]">
                  {formatPEN(total)}
                </span>
              </div>
            </div>

            {/* Error global */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/30 px-4 py-2.5 text-[12px] text-[#EF4444]"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
                {error}
              </motion.div>
            )}

            {/* CTA */}
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={step !== "form"}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-[#1D1D1F] px-4 py-4 text-[14px] font-semibold text-white disabled:opacity-70 hover:bg-[#1D1D1F]/90 transition-colors shadow-[0_8px_30px_-8px_rgb(0_0_0/0.3)]"
            >
              {step === "processing" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                  Procesando…
                </>
              ) : step === "redirecting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                  Redirigiendo a Mercado Pago…
                </>
              ) : paymentMethod === "MERCADO_PAGO" ? (
                <>
                  Pagar con Mercado Pago
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </>
              ) : (
                <>
                  Confirmar pedido contraentrega
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </>
              )}
            </motion.button>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-3 text-[10px] text-[#86868B] pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-[#D4AF37]" strokeWidth={1.5} />
                Pago seguro
              </span>
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3" strokeWidth={1.5} />
                SSL 256-bit
              </span>
            </div>

            {/* WhatsApp help */}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51987654321"}?text=Hola%2C%20tengo%20dudas%20con%20mi%20compra`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-[11px] text-[#86868B] hover:text-[#1D1D1F] transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
              ¿Dudas? Escríbenos por WhatsApp
            </a>
          </div>
        </aside>
      </form>
    </div>
  );
}
