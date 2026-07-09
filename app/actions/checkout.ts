"use server";

import { z } from "zod";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { PLANOS } from "@/lib/planos";

const checkoutSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  whatsapp: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "WhatsApp inválido. Use (XX) XXXXX-XXXX"),
  plano: z.enum(["individual", "turma", "individual-premium"]),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export type CheckoutResult =
  | { checkoutUrl: string; error?: never }
  | { error: string; checkoutUrl?: never };

export async function criarCheckout(
  formData: CheckoutFormData
): Promise<CheckoutResult> {
  const parsed = checkoutSchema.safeParse(formData);
  if (!parsed.success) {
    const msg = parsed.error.errors[0]?.message ?? "Dados inválidos.";
    return { error: msg };
  }

  const { nome, email, whatsapp, plano: planoSlug } = parsed.data;
  const plano = PLANOS[planoSlug];
  const orderNsu = crypto.randomUUID();

  const { env } = await getCloudflareContext({ async: true });

  await env.PEDIDOS.put(
    `order:${orderNsu}`,
    JSON.stringify({
      nome,
      email,
      whatsapp,
      planoSlug,
      planoNome: plano.nome,
      amount: plano.price,
      status: "pending",
      createdAt: new Date().toISOString(),
    }),
    { expirationTtl: 60 * 60 * 24 * 90 }
  );

  const handle =
    process.env.INFINITEPAY_HANDLE ?? "ana-cristina-57u";
  const apiBase =
    process.env.INFINITEPAY_API_BASE ?? "https://api.checkout.infinitepay.io";

  let res: Response;
  try {
    res = await fetch(`${apiBase}/links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        handle,
        itens: [
          {
            quantity: 1,
            price: plano.price,
            description: `${plano.nome} — Mindle Idiomas | ${email} | ${whatsapp}`,
          },
        ],
        order_nsu: orderNsu,
        redirect_url: "https://mindle.com.br/obrigado",
        webhook_url: "https://mindle.com.br/api/infinitepay/webhook",
        customer: {
          name: nome,
          email,
          phone_number: `+55${whatsapp.replace(/\D/g, "")}`,
        },
      }),
    });
  } catch (err) {
    console.error("InfinitePay fetch error:", err);
    return { error: "Erro de conexão ao processar pagamento. Tente novamente." };
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(`InfinitePay ${res.status}:`, text);
    return { error: "Erro ao criar link de pagamento. Tente novamente." };
  }

  const data = (await res.json()) as Record<string, unknown>;
  const checkoutUrl = (data.checkout_url ?? data.link ?? data.url) as
    | string
    | undefined;

  if (!checkoutUrl) {
    console.error("checkout_url not found in response:", JSON.stringify(data));
    return { error: "Link de pagamento não retornado. Tente novamente." };
  }

  return { checkoutUrl };
}
