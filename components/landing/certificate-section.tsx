'use client'

import { Button } from '@/components/ui/button'
import { Award, Globe, Linkedin, TrendingUp, ArrowRight } from 'lucide-react'

const benefits = [
  {
    icon: Globe,
    text: 'Certificado válido internacionalmente'
  },
  {
    icon: Linkedin,
    text: 'Adicione ao seu LinkedIn e currículo'
  },
  {
    icon: TrendingUp,
    text: 'Aumente suas chances de promoção'
  }
]

export function CertificateSection() {
  const scrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Certificate Preview */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-8 flex flex-col items-center justify-center shadow-xl">
                {/* Certificate Mock */}
                <div className="w-full max-w-sm bg-card rounded-lg shadow-lg p-6 border border-border">
                  <div className="text-center">
                    <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Certificado de Conclusão</p>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-1">FULL ENGLISH</h3>
                    <div className="w-24 h-0.5 bg-primary mx-auto my-4" />
                    <p className="text-sm text-muted-foreground mb-2">Certifica que</p>
                    <p className="font-semibold text-foreground mb-2">[Seu Nome]</p>
                    <p className="text-xs text-muted-foreground">
                      concluiu com êxito o programa de inglês para profissionais
                    </p>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-primary/20 rounded-lg rotate-12" />
              </div>
            </div>
            
            {/* Content */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Seu certificado profissional
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Ao concluir nosso programa, você recebe um certificado profissional reconhecido que comprova suas habilidades em inglês para o mercado de trabalho.
              </p>
              
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{benefit.text}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="group text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Garantir meu certificado
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
