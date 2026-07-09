import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Sparkles } from 'lucide-react'

const plans = [
  {
    name: 'Individual',
    slug: 'individual',
    price: 'R$ 397',
    period: '/mês',
    discount: null,
    popular: false,
    features: [
      'Aula individual ao vivo',
      'Aulas 1X na semana',
      'Plano de estudos personalizado',
      'Foco total em conversação'
    ]
  },
  {
    name: 'Turma',
    slug: 'turma',
    price: 'R$ 197',
    period: '/mês',
    discount: '50% OFF',
    popular: true,
    features: [
      'Foco em conversação',
      'Aulas ao vivo com professor',
      'Turmas de até 5 alunos',
      'Material incluso',
      'Encontros 1X na semana'
    ]
  },
  {
    name: 'Individual Premium',
    slug: 'individual-premium',
    price: 'R$ 720',
    period: '/mês',
    discount: '30% OFF',
    popular: false,
    features: [
      '2 aulas ao vivo por semana',
      'Foco total em conversação',
      'Evolução mais rápida e consistente',
      'Plano personalizado',
      'Preparação para trabalho, viagens e entrevistas'
    ]
  }
]

export function PricingSection() {
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
                    MAIS VENDIDO
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

                <Link
                  href={`/checkout?plano=${plan.slug}`}
                  className={`flex items-center justify-center w-full py-3 rounded-full font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                  }`}
                >
                  Começar agora
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
