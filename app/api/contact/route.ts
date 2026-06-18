import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, whatsapp, message } = await req.json()

    if (!name || !whatsapp || !message) {
      return NextResponse.json(
        { error: 'Preencha todos os campos.' },
        { status: 400 }
      )
    }

    const { error } = await resend.emails.send({
      from: 'Mindle Idiomas <onboarding@resend.dev>',
      to: ['administrativomindle@gmail.com'],
      replyTo: whatsapp.includes('@') ? whatsapp : undefined,
      subject: `📩 Novo contato: ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head><meta charset="UTF-8" /></head>
        <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px;">
          <div style="max-width: 560px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <div style="background: #e8192c; padding: 24px 32px;">
              <h1 style="color: #fff; margin: 0; font-size: 20px;">Novo contato pelo site</h1>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Nome</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111; font-size: 15px;"><strong>${name}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">WhatsApp</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111; font-size: 15px;">
                    <a href="https://wa.me/55${whatsapp.replace(/\D/g, '')}" style="color: #25D366; text-decoration: none; font-weight: bold;">${whatsapp}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Mensagem</td>
                  <td style="padding: 12px 0; color: #333; font-size: 15px; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</td>
                </tr>
              </table>

              <div style="margin-top: 28px; padding: 16px 20px; background: #f5f5f5; border-radius: 8px; font-size: 13px; color: #666;">
                Responda diretamente pelo WhatsApp clicando no número acima.
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}
