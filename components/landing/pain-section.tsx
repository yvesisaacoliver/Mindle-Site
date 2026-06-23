'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const painDreams = [
  {
    pain: 'Você conhece o assunto melhor do que ninguém na sala. Mas quando abrem o microfone, aquilo tudo some.',
    dream: 'Você apresenta com clareza, com presença. E sai da sala sabendo que finalmente mostrou quem você é.'
  },
  {
    pain: 'Seu colega menos qualificado foi promovido. De novo. Por causa do inglês.',
    dream: 'A promoção é sua. Porque você finalmente consegue mostrar tudo que vale em qualquer idioma.'
  },
  {
    pain: 'Você canta a música inteira sem saber o que tá dizendo. Todo mundo ri na cena e você dá uma risadinha dois segundos depois fingindo que pegou.',
    dream: 'Você entende a letra, ri junto no momento certo. Sem fingir, sem legenda. O inglês finalmente faz parte de quem você é.'
  }
]

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

function ColLabel({ color, text }: { color: 'red' | 'green'; text: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: color === 'red' ? '#f87171' : '#34d399' }}
      />
      <span className="text-[11px] tracking-[0.22em] uppercase font-medium text-gray-400">{text}</span>
    </div>
  )
}

export function PainSection() {
  const { ref: cardsRef, isInView } = useInView()

  return (
    <>
      {/* ── Main section — white background ── */}
      <section className="bg-white py-12 md:py-20 lg:py-[80px]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="text-center mb-12 md:mb-14">
              <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gray-400 mb-5">
                Você se identifica?
              </p>
              <h2 className="font-serif text-[34px] md:text-[56px] lg:text-[64px] font-bold leading-[1.06] text-balance text-gray-900 mb-4">
                Estuda há anos.
                <br />
                <span className="text-gray-300">E ainda trava.</span>
              </h2>
              <p className="text-base md:text-[18px] font-bold text-[#e8192c] max-w-sm mx-auto leading-relaxed">
                O problema nunca foi você. Foi o método.
              </p>
            </div>

            {/* Desktop column labels */}
            <div className="hidden md:grid grid-cols-2 gap-3 px-1 mb-1">
              <ColLabel color="red" text="Hoje" />
              <ColLabel color="green" text="Em meses" />
            </div>

            {/* Cards — two independent columns */}
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {/* Left column — HOJE */}
              <div className="space-y-3">
                <div className="md:hidden">
                  <ColLabel color="red" text="Hoje" />
                </div>
                {painDreams.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-xl px-6 py-5"
                    style={{
                      background: '#fff1f1',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      opacity: isInView ? 1 : 0,
                      transform: isInView ? 'translateY(0)' : 'translateY(18px)',
                      transition: `opacity 0.45s ease ${index * 80}ms, transform 0.45s ease ${index * 80}ms`,
                    }}
                  >
                    <div
                      className="flex-shrink-0 mt-[3px] w-[18px] h-[18px] rounded-full flex items-center justify-center"
                      style={{ border: '1px solid rgba(248,113,113,0.45)' }}
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M2 2l4 4M6 2l-4 4" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </div>
                    <p className="text-[15px] md:text-base text-[#222] leading-[1.6]">{item.pain}</p>
                  </div>
                ))}
              </div>

              {/* Right column — EM MESES */}
              <div className="space-y-3 mt-6 md:mt-0">
                <div className="md:hidden">
                  <ColLabel color="green" text="Em meses" />
                </div>
                {painDreams.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-xl px-6 py-5"
                    style={{
                      background: '#f0fdf4',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      opacity: isInView ? 1 : 0,
                      transform: isInView ? 'translateY(0)' : 'translateY(18px)',
                      transition: `opacity 0.45s ease ${index * 80}ms, transform 0.45s ease ${index * 80}ms`,
                    }}
                  >
                    <div
                      className="flex-shrink-0 mt-[3px] w-[18px] h-[18px] rounded-full flex items-center justify-center"
                      style={{ border: '1px solid rgba(52,211,153,0.45)' }}
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4l2.5 2.5 3.5-3.5" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-[15px] md:text-base text-[#222] leading-[1.6]">{item.dream}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Transition section — red background ── */}
      <section className="bg-[#e8192c] py-10 lg:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

              {/* 3 fotos */}
              <div className="flex gap-3 flex-shrink-0">
                {['/mindle-foto-1.jpeg', '/mindle-foto-2.jpeg', '/mindle-foto-3.jpeg'].map((src, i) => (
                  <div key={i} className="w-[90px] lg:w-[110px] aspect-[3/4] rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                    <Image
                      src={src}
                      alt={`Aluno Mindle Idiomas ${i + 1}`}
                      width={110}
                      height={147}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Text + CTA */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
                <div>
                  <div className="w-8 h-px mb-6 mx-auto lg:mx-0 bg-white/25" />
                  <p className="font-serif text-[26px] md:text-[32px] lg:text-[36px] font-bold leading-[1.15] text-white">
                    Existe um jeito diferente de aprender.
                    <br />
                    <span className="italic" style={{ opacity: 0.85 }}>
                      E você vai entender por quê funciona.
                    </span>
                  </p>
                </div>

                <div>
                  <a
                    href="#metodo"
                    className="inline-flex items-center gap-3 bg-white text-[#e8192c] font-semibold text-sm px-9 py-4 rounded-full hover:bg-gray-50 active:scale-95 transition-all duration-200"
                  >
                    Quero entender o método
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 6.5h9M7.5 3L11 6.5 7.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
