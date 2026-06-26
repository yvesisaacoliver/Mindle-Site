import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mindle.com.br'),
  title: 'Mindle Idiomas',
  description: 'Uma escola moderna que prepara alunos para o mundo, com professores qualificados e foco em resultados reais para trabalho, viagens e oportunidades globais.',
  keywords: ['inglês para adultos', 'aulas de inglês', 'conversação em inglês', 'inglês para profissionais', 'escola de inglês'],
  generator: 'v0.app',
  openGraph: {
    title: 'Mindle Idiomas',
    description: 'Uma escola moderna que prepara alunos para o mundo, com professores qualificados e foco em resultados reais para trabalho, viagens e oportunidades globais.',
    url: 'https://mindle.com.br',
    siteName: 'Mindle Idiomas',
    images: [
      {
        url: '/apple-icon.jpeg',
        width: 1024,
        height: 1024,
        alt: 'Mindle Idiomas',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2D5A3D',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
