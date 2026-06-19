'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

// ── Adicione novos depoimentos aqui ──────────────────────────────────────────
const testimonials = [
  {
    name: 'Lucas Ferreira',
    role: 'Coordenador de Marketing na Ambev',
    quote: 'Depois de anos tentando aprender inglês em cursos tradicionais, finalmente consegui participar de reuniões internacionais com confiança. Em 3 meses, recebi minha promoção.',
    rating: 5,
  },
  {
    name: 'Camila Borges',
    role: 'Diretora Jurídica no Bradesco',
    quote: 'O método é revolucionário. Você pratica conversação desde a primeira aula. Hoje lidero equipes globais e faço apresentações em inglês sem medo.',
    rating: 5,
  },
  {
    name: 'Thiago Almeida',
    role: 'Analista de Negócios na Accenture',
    quote: 'Tinha vergonha de falar inglês mesmo depois de anos estudando. A Mindle Idiomas mudou minha vida profissional. Consegui fechar contratos internacionais que pareciam impossíveis.',
    rating: 5,
  },
  {
    name: 'Fernanda Lima',
    role: 'Gerente Comercial na Johnson & Johnson',
    quote: 'Nunca imaginei que conseguiria apresentar um projeto técnico em inglês para uma plateia internacional. Hoje faço isso com naturalidade.',
    rating: 5,
  },
  {
    name: 'Bruno Carvalho',
    role: 'Desenvolvedor Sênior na Nubank',
    quote: 'Minha maior dificuldade era o listening. Depois de dois meses, comecei a entender filmes sem legenda. Parecia impossível antes.',
    rating: 5,
  },
]
// ─────────────────────────────────────────────────────────────────────────────

function useCarousel(total: number) {
  const [index, setIndex] = useState(0)
  const [perView, setPerView] = useState(3)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(0)
  const paused = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Responsive perView
  useEffect(() => {
    function update() {
      if (window.innerWidth < 768) setPerView(1)
      else if (window.innerWidth < 1024) setPerView(2)
      else setPerView(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = total - perView

  const next = useCallback(() => {
    setIndex(i => (i >= maxIndex ? 0 : i + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setIndex(i => (i <= 0 ? maxIndex : i - 1))
  }, [maxIndex])

  const goTo = useCallback((i: number) => setIndex(i), [])

  // Auto-play
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!paused.current) next()
    }, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [next])

  const pause = () => { paused.current = true }
  const resume = () => { paused.current = false }

  // Touch / drag handlers
  const onDragStart = (clientX: number) => {
    setDragging(true)
    dragStart.current = clientX
    pause()
  }
  const onDragEnd = (clientX: number) => {
    if (!dragging) return
    const delta = dragStart.current - clientX
    if (delta > 40) next()
    else if (delta < -40) prev()
    setDragging(false)
    resume()
  }

  // Clamp index when perView changes
  useEffect(() => {
    setIndex(i => Math.min(i, Math.max(0, total - perView)))
  }, [perView, total])

  return { index, perView, next, prev, goTo, pause, resume, onDragStart, onDragEnd, maxIndex }
}

export function TestimonialsSection() {
  const total = testimonials.length
  const { index, perView, next, prev, goTo, pause, resume, onDragStart, onDragEnd, maxIndex } =
    useCarousel(total)

  const trackStyle: React.CSSProperties = {
    display: 'flex',
    transform: `translateX(calc(-${index} * (100% / ${perView})))`,
    transition: 'transform 400ms ease-in-out',
  }

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Aprovado por quem já destravou
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja o que nossos alunos têm a dizer sobre a transformação que viveram.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">

          {/* Left arrow */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 border border-white/10 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Track */}
          <div
            className="overflow-hidden"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onMouseDown={e => onDragStart(e.clientX)}
            onMouseUp={e => onDragEnd(e.clientX)}
            onTouchStart={e => onDragStart(e.touches[0].clientX)}
            onTouchEnd={e => onDragEnd(e.changedTouches[0].clientX)}
          >
            <div style={trackStyle}>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  style={{ flex: `0 0 calc(100% / ${perView})`, padding: '0 12px' }}
                >
                  <Card className="relative overflow-hidden border-border/50 hover:shadow-xl transition-shadow duration-300 h-full">
                    <CardContent className="p-8">
                      {/* Quote Icon */}
                      <Quote className="h-10 w-10 text-primary/20 mb-4" />

                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(t.rating)].map((_, s) => (
                          <Star key={s} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Text */}
                      <p className="text-foreground mb-6 leading-relaxed">
                        &ldquo;{t.quote}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="border-t border-border pt-4">
                        <p className="font-semibold text-foreground">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            aria-label="Próximo"
            className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 border border-white/10 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir para depoimento ${i + 1}`}
              style={{
                width: i === index ? 24 : 8,
                height: 8,
                borderRadius: 9999,
                background: i === index ? '#e8192c' : 'rgba(255,255,255,0.2)',
                transition: 'all 300ms ease',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
