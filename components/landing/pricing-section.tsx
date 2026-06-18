'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Sparkles } from 'lucide-react'

const plans = [
  {
    name: 'Mensal',
    price: 'R$ 297',
    period: '/mês',
    discount: null,
    popular: false,
    features: [
      'Aulas ao vivo ilimitadas',
      'App com IA personalizada',
      'Comunidade de alunos',
      'Suporte via WhatsApp'
    ]
  },
  {
    name: 'Semestral',
    price: 'R$ 1.497',
    period: '/6 meses',
    discount: '15% OFF',
    popular: true,
    features: [
      'Aulas ao vivo ilimitadas',
      'App com IA personalizada',
      'Comunidade de alunos',
      'Suporte via WhatsApp',
      'Mentoria em grupo mensal'
    ]
  },
  {
    name: 'Anual',
    price: 'R$ 2.397',
    period: '/12 meses',
    discount: '30% OFF',
    popular: false,
    features: [
      'Aulas ao vivo ilimitadas',
      'App com IA personalizada',
      'Comunidade de alunos',
      'Suporte via WhatsApp',
      'Mentoria em grupo mensal',
      'Intercâmbio Cambridge incluso'
    ]
  }
]

export function PricingSection() {
  const scrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Escolha o plano ideal para você
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-2 border-primary shadow-lg scale-105 z-10' 
                  : 'border-border/50 hover:border-primary/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 left-0">
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    MAIS POPULAR
                  </div>
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.popular ? 'pt-14' : 'pt-8'} pb-4`}>
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                {plan.discount && (
                  <Badge variant="secondary" className="mx-auto mb-2 bg-primary/10 text-primary">
                    {plan.discount}
                  </Badge>
                )}
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pb-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={scrollToForm}
                  className={`w-full py-6 rounded-full ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                      : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                  }`}
                >
                  Começar agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
