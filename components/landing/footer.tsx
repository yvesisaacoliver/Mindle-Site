'use client'

import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* About */}
            <div>
              <h3 className="font-serif text-2xl font-bold mb-4">Mindle Idiomas</h3>
              <p className="text-background/70 leading-relaxed">
                Uma escola moderna que prepara alunos para o mundo, com professores qualificados e foco em resultados reais para trabalho, viagens e oportunidades globais.
              </p>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Contato</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="mailto:contato@mindle.com.br" 
                    className="flex items-center gap-3 text-background/70 hover:text-background transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    contato@mindle.com.br
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+5511934538109" 
                    className="flex items-center gap-3 text-background/70 hover:text-background transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    (11) 93453-8109
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Address */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Endereço</h4>
              <div className="flex items-start gap-3 text-background/70">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>
                  Rua Stela Marina, 200, Campo Belo <br />
                  São Paulo - SP
                </span>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#" 
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-background/10 pt-8">
            <p className="text-center text-background/50 text-sm">
              © 2026 Mindle Idiomas. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
