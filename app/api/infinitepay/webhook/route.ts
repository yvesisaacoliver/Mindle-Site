import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import nodemailer from "nodemailer";

type WebhookBody = {
  invoice_slug: string;
  amount: number;
  paid_amount: number;
  installments: number;
  capture_method: string;
  transaction_nsu: string;
  order_nsu: string;
  receipt_url: string;
  items?: unknown[];
};

type PedidoKV = {
  nome: string;
  email: string;
  whatsapp: string;
  planoSlug: string;
  planoNome: string;
  amount: number;
  status: "pending" | "paid" | "failed";
  createdAt: string;
  paidAt?: string;
  captureMethod?: string;
  receiptUrl?: string;
};

export async function POST(request: NextRequest) {
  let body: WebhookBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { order_nsu, transaction_nsu, invoice_slug, receipt_url, capture_method, amount } = body;

  if (!order_nsu) {
    return NextResponse.json({ error: "Missing order_nsu" }, { status: 400 });
  }

  const { env } = await getCloudflareContext({ async: true });

  const raw = await env.PEDIDOS.get(`order:${order_nsu}`);
  if (!raw) {
    // KV pode ainda estar propagando — InfinitePay vai reenviar com 400
    return NextResponse.json({ error: "Order not found" }, { status: 400 });
  }

  const pedido: PedidoKV = JSON.parse(raw);

  // Idempotência: já processado, retornar 200 sem reenviar e-mail
  if (pedido.status === "paid") {
    return NextResponse.json({ ok: true });
  }

  // Validar pagamento via payment_check
  const handle = process.env.INFINITEPAY_HANDLE ?? "ana-cristina-57u";
  const apiBase = process.env.INFINITEPAY_API_BASE ?? "https://api.checkout.infinitepay.io";

  let paymentValid = false;
  try {
    const checkRes = await fetch(`${apiBase}/payment_check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        handle,
        order_nsu,
        transaction_nsu,
        slug: invoice_slug,
      }),
    });

    if (checkRes.ok) {
      const checkData = (await checkRes.json()) as {
        success?: boolean;
        paid?: boolean;
        amount?: number;
      };
      paymentValid =
        checkData.success === true &&
        checkData.paid === true &&
        checkData.amount === pedido.amount;
    }
  } catch (err) {
    console.error("payment_check error:", err);
    return NextResponse.json({ error: "payment_check failed" }, { status: 400 });
  }

  if (!paymentValid) {
    return NextResponse.json({ error: "Payment not valid" }, { status: 400 });
  }

  // Atualizar KV
  const pedidoAtualizado: PedidoKV = {
    ...pedido,
    status: "paid",
    paidAt: new Date().toISOString(),
    captureMethod: capture_method,
    receiptUrl: receipt_url,
  };

  await env.PEDIDOS.put(
    `order:${order_nsu}`,
    JSON.stringify(pedidoAtualizado),
    { expirationTtl: 60 * 60 * 24 * 90 }
  );

  // Enviar e-mail de notificação
  const notificationEmail =
    process.env.NOTIFICATION_EMAIL ?? "administrativomindle@gmail.com";

  const metodo = capture_method === "pix" ? "Pix" : "Cartão de crédito";
  const valor = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(pedido.amount / 100);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "administrativomindle@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Mindle Idiomas" <administrativomindle@gmail.com>',
      to: notificationEmail,
      subject: `💰 Novo aluno pagou — ${pedido.planoNome}`,
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head><meta charset="UTF-8" /></head>
        <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px; margin: 0;">
          <div style="max-width: 560px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <div style="background: #E31837; padding: 24px 32px;">
              <h1 style="color: #fff; margin: 0; font-size: 22px; font-weight: bold;">
                💰 Novo aluno pagou!
              </h1>
              <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">
                ${pedido.planoNome} — ${valor}
              </p>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 110px;">Nome</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111; font-size: 15px; font-weight: bold;">${pedido.nome}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">E-mail</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111; font-size: 15px;">
                    <a href="mailto:${pedido.email}" style="color: #E31837;">${pedido.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">WhatsApp</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px;">
                    <a href="https://wa.me/55${pedido.whatsapp.replace(/\D/g, "")}" style="color: #25D366; font-weight: bold;">
                      ${pedido.whatsapp}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Plano</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111; font-size: 15px;">${pedido.planoNome} (${valor})</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Método</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111; font-size: 15px;">${metodo}</td>
                </tr>
                ${receipt_url ? `
                <tr>
                  <td style="padding: 12px 0; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Comprovante</td>
                  <td style="padding: 12px 0; font-size: 15px;">
                    <a href="${receipt_url}" style="color: #E31837;">Ver comprovante</a>
                  </td>
                </tr>` : ""}
              </table>

              <div style="margin-top: 24px; padding: 18px 20px; background: #fff8e1; border-left: 4px solid #FFA500; border-radius: 4px; font-size: 14px; color: #555; line-height: 1.6;">
                <strong>➡️ Próximo passo:</strong> chamar no WhatsApp e criar a assinatura
                do plano "<strong>${pedido.planoNome}</strong>" no app InfinitePay.
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });
  } catch (emailErr) {
    // Não falhar o webhook por causa de e-mail — só logar
    console.error("Erro ao enviar e-mail de notificação:", emailErr);
  }

  return NextResponse.json({ ok: true });
}
