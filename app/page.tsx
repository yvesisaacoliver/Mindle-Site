import { Header } from '@/components/landing/header'
import { HeroSection } from '@/components/landing/hero-section'
import { VideoSection } from '@/components/landing/video-section'
import { PainSection } from '@/components/landing/pain-section'
import { MethodSection } from '@/components/landing/method-section'
import { ComparisonSection } from '@/components/landing/comparison-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { FormSection } from '@/components/landing/form-section'
import { FAQSection } from '@/components/landing/faq-section'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <>
      <Header />
      
      <main>
        {/* Seção 1: Hero */}
        <HeroSection />
        
        {/* Seção 2: Vídeo de Apresentação */}
        <VideoSection />
        
        {/* Seção 3: Você já perdeu oportunidade? */}
        <PainSection />

        {/* Seção 2B: Você não precisa de mais um curso */}
        <div id="metodo">
          <MethodSection />
        </div>

        {/* Seção 4: Por que escolher a Full English? */}
        <ComparisonSection />
        
        {/* Seção 5: Relatos de Alunos */}
        <div id="depoimentos">
          <TestimonialsSection />
        </div>
        
        {/* Seção 7: Preços e Planos */}
        <div id="precos">
          <PricingSection />
        </div>
        
        {/* Seção 10: Formulário de Captura */}
        <FormSection />

        {/* Seção 12: Perguntas Frequentes */}
        <div id="faq">
          <FAQSection />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  )
}
