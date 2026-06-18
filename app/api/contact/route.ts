import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'administrativomindle@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(req: NextRequest) {
  try {
    const { name, whatsapp, message } = await req.json()

    if (!name || !whatsapp || !message) {
      return NextResponse.json(
        { error: 'Preencha todos os campos.' },
        { status: 400 }
      )
    }

    await transporter.sendMail({
      from: '"Mindle Idiomas" <administrativomindle@gmail.com>',
      to: 'administrativomindle@gmail.com',
      subject: `Novo contato pelo site: ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head><meta charset="UTF-8" /></head>
        <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px; margin: 0;">
          <div style="max-width: 560px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

            <div style="background: #e8192c; padding: 24px 32px;">
              <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: bold;">
                Novo contato pelo site
              </h1>
            </div>

            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; width: 110px; vertical-align: top;">
                    Nome
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f0f0f0; color: #111; font-size: 15px; font-weight: bold;">
                    ${name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">
                    WhatsApp
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px;">
                    <a
                      href="https://wa.me/55${whatsapp.replace(/\D/g, '')}"
                      style="color: #25D366; text-decoration: none; font-weight: bold;"
                    >
                      ${whatsapp}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">
                    Mensagem
                  </td>
                  <td style="padding: 14px 0; color: #333; font-size: 15px; line-height: 1.7;">
                    ${message.replace(/\n/g, '<br/>')}
                  </td>
                </tr>
              </table>

              <div style="margin-top: 28px; padding: 16px 20px; background: #f5f5f5; border-radius: 8px; font-size: 13px; color: #666; line-height: 1.5;">
                Clique no número acima para responder direto pelo WhatsApp.
              </div>
            </div>

          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err)
    return NextResponse.json(
      { error: 'Erro ao enviar e-mail. Tente novamente.' },
      { status: 500 }
    )
  }
}
