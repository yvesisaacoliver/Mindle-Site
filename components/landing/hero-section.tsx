'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Star, Users, Building2, ArrowRight, Clock } from 'lucide-react'

function useCountdown(targetHours: number) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('offer_deadline') : null
    if (stored) return Math.max(0, parseInt(stored) - Date.now())
    const deadline = Date.now() + targetHours * 60 * 60 * 1000
    if (typeof window !== 'undefined') localStorage.setItem('offer_deadline', String(deadline))
    return targetHours * 60 * 60 * 1000
  })

  useEffect(() => {
    const stored = localStorage.getItem('offer_deadline')
    const deadline = stored ? parseInt(stored) : Date.now() + targetHours * 60 * 60 * 1000
    if (!stored) localStorage.setItem('offer_deadline', String(deadline))

    const tick = () => setTimeLeft(Math.max(0, deadline - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetHours])

  const h = Math.floor(timeLeft / 3_600_000)
  const m = Math.floor((timeLeft % 3_600_000) / 60_000)
  const s = Math.floor((timeLeft % 60_000) / 1_000)
  const pad = (n: number) => String(n).padStart(2, '0')

  return { h: pad(h), m: pad(m), s: pad(s), expired: timeLeft === 0 }
}

export function HeroSection() {
  const { h, m, s, expired } = useCountdown(10)

  const scrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image responsivo */}
      <div className="absolute inset-0">
        <picture>
          <source media="(max-width: 767px)" srcSet="/hero-mobile.jpg" />
          <img
            src="/hero-desktop.jpg"
            alt="Pessoas estudando inglês"
            className="w-full h-full object-cover object-center"
          />
        </picture>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Countdown urgency badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary">
            <Clock className="h-4 w-4 text-primary-foreground animate-pulse shrink-0" />
            {expired ? (
              <span className="text-sm font-semibold text-primary-foreground">Oferta encerrada</span>
            ) : (
              <span className="text-sm font-semibold text-primary-foreground animate-pulse">
                Oferta encerra em{' '}
                <span className="font-mono tabular-nums">
                  {h}:{m}:{s}
                </span>
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
            A SUA ÚLTIMA {' '}
            <span className="text-primary">ESCOLA DE INGLÊS.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed text-pretty">
            Aulas ao vivo focadas em conversação real. Para quem já tentou antes e dessa vez quer resultado de verdade.
          </p>

          <Button
            size="lg"
            onClick={scrollToForm}
            className="group text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.6)] transition-all duration-300"
          >
            Quero começar agora
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="mt-10 md:mt-16 grid grid-cols-3 gap-3 md:gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-3 md:p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 shadow-sm hover:shadow-md transition-shadow">
              <Users className="h-5 w-5 md:h-8 md:w-8 text-primary mb-2 md:mb-3" />
              <span className="text-xl md:text-3xl font-bold text-foreground">+4,1K</span>
              <span className="text-xs md:text-sm text-muted-foreground text-center">alunos formados</span>
            </div>

            <div className="flex flex-col items-center p-3 md:p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-0.5 md:gap-1 mb-2 md:mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xl md:text-3xl font-bold text-foreground">4.9</span>
              <span className="text-xs md:text-sm text-muted-foreground text-center">avaliação por alunos</span>
            </div>

            <div className="flex flex-col items-center p-3 md:p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 shadow-sm hover:shadow-md transition-shadow">
              <Building2 className="h-5 w-5 md:h-8 md:w-8 text-primary mb-2 md:mb-3" />
              <span className="text-xl md:text-3xl font-bold text-foreground">30+</span>
              <span className="text-xs md:text-sm text-muted-foreground text-center">empresas parceiras</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-card"/>
        </svg>
      </div>
    </section>
  )
}
