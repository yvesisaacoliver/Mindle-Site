'use client'

import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Clock, MessageCircle } from 'lucide-react'

export function CambridgeSection() {
  const scrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-16 lg:py-24 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image/Visual */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-8 flex flex-col items-center justify-center shadow-2xl">
                <div className="text-center text-primary-foreground">
                  <MapPin className="h-16 w-16 mx-auto mb-4 opacity-90" />
                  <h3 className="text-3xl font-serif font-bold mb-2">Cambridge</h3>
                  <p className="text-lg opacity-90">Inglaterra</p>
                  <div className="w-20 h-1 bg-primary-foreground/30 mx-auto my-6" />
                  <div className="flex items-center justify-center gap-2 text-sm opacity-80">
                    <Calendar className="h-4 w-4" />
                    <span>Próxima turma: Julho 2026</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-card rounded-xl shadow-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Vagas</p>
                    <p className="font-bold text-foreground">Limitadas</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Próximo Intercâmbio: Cambridge
              </h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Imagine-se nos corredores de Cambridge, estudando em uma das maiores universidades do mundo, conversando em inglês com colegas de diferentes continentes. A Mindle oferece essa realidade exclusiva a seus alunos. 
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Nossos alunos ganham confiança, independência e uma perspectiva global que marca para toda a vida.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={scrollToForm}
                  className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 border-0"
                >
                  Quero saber mais
                </Button>
                <Button 
                  size="lg" 
                  className="rounded-full text-white border-0 transition-colors px-8"
                  style={{ 
                    backgroundColor: '#25D366',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1FA952';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#25D366';
                  }}
                  asChild
                >
                  <a href="https://wa.me/5511934538109" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
