import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import type {
  PreferenceRequest,
  PreferenceItem,
} from "mercadopago/models/sdk/preferences";

/**
 * Cliente Mercado Pago — itechperu.shop
 *
 * Documentación oficial:
 *  - https://www.mercadopago.com.pe/developers/es/docs
 *
 * Flujo:
 *  1. Cliente crea una preferencia → MP retorna `init_point` (URL de checkout)
 *  2. Cliente es redirigido a MP, paga con tarjeta/Yape/PLIN
 *  3. MP redirige de vuelta a /checkout/success o /checkout/failure
 *  4. MP envía webhook a /api/mercadopago/webhook con el estado del pago
 *  5. Actualizamos el pedido en DB
 */

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN || "";
const publicKey = process.env.MERCADO_PAGO_PUBLIC_KEY || "";

let client: MercadoPagoConfig | null = null;

export function getMPClient(): MercadoPagoConfig {
  if (!accessToken) {
    throw new Error(
      "MERCADO_PAGO_ACCESS_TOKEN no configurado. Cópialo de https://www.mercadopago.com.pe/developers/panel/app"
    );
  }
  if (!client) {
    client = new MercadoPagoConfig({
      accessToken,
      options: { timeout: 10000 },
    });
  }
  return client;
}

export interface CreatePreferenceItem {
  id: string;
  title: string;
  description?: string;
  pictureUrl?: string;
  quantity: number;
  unitPrice: number; // En soles (no en centavos)
}

export interface CreatePreferenceInput {
  /** ID interno del pedido en nuestra DB */
  orderId: string;
  items: CreatePreferenceItem[];
  payer: {
    name: string;
    email: string;
    phone?: string;
  };
  /** URLs de retorno tras el pago */
  backUrls: {
    success: string;
    failure: string;
    pending: string;
  };
  /** Total de la orden para verificación (incluye envío, descuentos) */
  total: number;
}

/**
 * Crea una preferencia de pago en Mercado Pago.
 *
 * Retorna:
 *  - id: ID de la preferencia (para guardar en DB)
 *  - initPoint: URL a la que redirigir al usuario para pagar
 *  - sandboxInitPoint: URL de sandbox para pruebas
 */
export async function createPreference(input: CreatePreferenceInput): Promise<{
  id: string;
  initPoint: string;
  sandboxInitPoint: string;
}> {
  const mp = getMPClient();
  const preferenceClient = new Preference(mp);

  const items: PreferenceItem[] = input.items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    picture_url: item.pictureUrl,
    quantity: item.quantity,
    currency_id: "PEN",
    unit_price: item.unitPrice,
  }));

  const preferenceData: PreferenceRequest = {
    items,
    payer: {
      name: input.payer.name,
      email: input.payer.email,
      phone: input.payer.phone
        ? { area_code: "51", number: input.payer.phone.replace(/\D/g, "") }
        : undefined,
    },
    back_urls: {
      success: input.backUrls.success,
      failure: input.backUrls.failure,
      pending: input.backUrls.pending,
    },
    auto_return: "approved",
    notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/mercadopago/webhook`,
    external_reference: input.orderId, // Para identificar la orden en el webhook
    statement_descriptor: "ITECHPERU.SHOP",
    metadata: {
      order_id: input.orderId,
      source: "itechperu.shop",
    },
  };

  const response = await preferenceClient.create({ body: preferenceData });

  if (!response.id || !response.init_point) {
    throw new Error("Mercado Pago no retornó init_point");
  }

  return {
    id: response.id,
    initPoint: response.init_point,
    sandboxInitPoint: response.sandbox_init_point || response.init_point,
  };
}

/**
 * Obtiene información de un pago por su ID.
 * Usado cuando MP envía el webhook con `data.id` = payment_id.
 */
export async function getPayment(paymentId: string | number) {
  const mp = getMPClient();
  const paymentClient = new Payment(mp);
  return paymentClient.get({ id: Number(paymentId) });
}

export { accessToken, publicKey };
