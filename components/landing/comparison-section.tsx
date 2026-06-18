'use client'

import { Button } from '@/components/ui/button'
import { Check, X, ArrowRight } from 'lucide-react'

const fullEnglishBenefits = [
  'Método direto e objetivo',
  'Foco total em conversação',
  'Materiais inclusos',
  'Plano de estudos',
  'Certificado'
]

const competitorIssues = [
  'Sem garantias de resultado',
  'Gramática engessada',
  'Sem Materiais',
  'Aulas limitadas e genéricas',
  'Resultados lentos e incertos'
]

export function ComparisonSection() {
  const scrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Por que escolher a Mindle?
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja a diferença entre a Mindle e os cursos tradicionais.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Full English Column — verde */}
            <div className="relative">
              <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-sm font-bold px-4 py-1 rounded-full">
                MINDLE
              </div>
              <div className="p-8 rounded-2xl bg-emerald-950 border-2 border-emerald-700/50 h-full">
                <ul className="space-y-5">
                  {fullEnglishBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-700/40 flex items-center justify-center">
                        <Check className="h-4 w-4 text-emerald-400" />
                      </div>
                      <span className="text-emerald-100 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Competitors Column — vermelho */}
            <div className="relative">
              <div className="absolute -top-3 left-6 bg-red-700 text-white text-sm font-bold px-4 py-1 rounded-full">
                CONCORRENTES
              </div>
              <div className="p-8 rounded-2xl bg-red-950 border border-red-800/50 h-full">
                <ul className="space-y-5">
                  {competitorIssues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-800/40 flex items-center justify-center">
                        <X className="h-4 w-4 text-red-400" />
                      </div>
                      <span className="text-red-200/70">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={scrollToForm}
              className="group text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Quero a Mindle
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
