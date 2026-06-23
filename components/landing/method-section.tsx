'use client'

import { Button } from '@/components/ui/button'
import { Lightbulb, RefreshCw, Mic, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'Associassção',
    description: 'Conectamos o inglês ao que você já vive. Seu cérebro aprende porque faz sentido não é decoreba.'
  },
  {
    number: '02',
    icon: RefreshCw,
    title: ' Repetição',
    description: 'Revisamos nos momentos certos para fixar de verdade. Sem esquecer depois de uma semana.'
  },
  {
    number: '03',
    icon: Mic,
    title: 'Conversação',
    description: 'Esse é o passo que a maioria dos cursos pula. Você para de pensar em português antes de falar e o inglês começa a sair natural.'
  }
]

export function MethodSection() {
  const scrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            O método que te faz falar.{' '}
            <span className="text-primary">Não só estudar.
</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
             Três princípios que mudam a forma como seu cérebro processa o inglês e eliminam a trava de vez.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              
              <div className="relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                {/* Step Number */}
                <div className="absolute -top-4 left-8 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}