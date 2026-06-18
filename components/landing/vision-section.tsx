'use client'

import { TrendingUp, Plane, Sparkles, GraduationCap } from 'lucide-react'

const visions = [
  {
    icon: TrendingUp,
    title: 'Conquistar aquela promoção',
    description: 'Finalmente ser reconhecido e alcançar o cargo que você merece.'
  },
  {
    icon: Plane,
    title: 'Embarcar na sua viagem dos sonhos',
    description: 'Viajar pelo mundo sem medo de se comunicar em qualquer situação.'
  },
  {
    icon: Sparkles,
    title: 'Viver o que sempre achou impossível',
    description: 'Realizar sonhos que pareciam distantes por causa da barreira do idioma.'
  },
  {
    icon: GraduationCap,
    title: 'Fazer um Intercâmbio',
    description: 'Estudar ou trabalhar no exterior com total confiança no seu inglês.'
  }
]

export function VisionSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Em 2026, você vai falar inglês com confiança para:
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {visions.map((vision, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <vision.icon className="h-8 w-8 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">{vision.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{vision.description}</p>
              
              {/* Decorative Number */}
              <div className="absolute top-4 right-4 text-6xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
