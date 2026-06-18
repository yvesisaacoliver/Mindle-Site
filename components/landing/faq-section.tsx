'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Quanto tempo leva para aprender?',
    answer: 'Em cerca de 6 meses, com consistência e seguindo o nosso método, você evolui do zero para um nível em que já consegue se comunicar em situações reais, como em viagens.'
  },
  {
    question: 'Como faço para me matricular?',
    answer: 'Para fazer sua matrícula, é simples: escolha o plano que mais combina com você, preencha seus dados e selecione a forma de pagamento que preferir. Assim que a compra for concluída, você receberá as orientações para começar. Se preferir, também pode enviar seu contato pelo formulário para receber ajuda da nossa equipe antes de finalizar.'
  },
  {
    question: 'Posso remarcar aula se faltar?',
    answer: 'Se você não puder participar de alguma aula, ela ficará gravada para assistir quando quiser. Além disso, alunos das aulas individuais podem remarcar e repor o encontro em outro horário.'
  },
  {
    question: 'É sempre com o mesmo professor?',
    answer: 'Sim. Você seguirá com o mesmo professor, o que torna as aulas mais personalizadas e ajuda no seu desenvolvimento ao longo do processo.'
  },
  {
    question: 'Posso começar uma vez por semana?',
    answer: 'Sim. Você pode iniciar com 1 aula por semana e, de acordo com sua disponibilidade e metas, ajustar depois para 2 ou 3 vezes por semana.'
  },
  {
    question: 'As aulas são ao vivo?',
    answer: 'Sim. Todas as aulas são ao vivo, o que permite tirar dúvidas em tempo real, praticar mais e aproveitar melhor cada encontro com o professor.'
  }
]

export function FAQSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Tire suas dúvidas sobre a Mindle Idiomas.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="mb-12">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-border/50 data-[state=open]:bg-card rounded-lg mb-2 px-4"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
