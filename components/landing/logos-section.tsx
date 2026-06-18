'use client'

const companies = [
  { name: 'Honda', logo: 'HONDA' },
  { name: 'BYD', logo: 'BYD' },
  { name: 'EMS', logo: 'EMS' },
  { name: 'Vale', logo: 'VALE' },
  { name: 'Petrobras', logo: 'PETROBRAS' },
  { name: 'Shell', logo: 'SHELL' }
]

export function LogosSection() {
  return (
    <section className="py-16 lg:py-24 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
            Nossos alunos ocupam cargos de liderança em:
          </h2>
          <p className="text-muted-foreground">
            E outras 150+ grandes empresas
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {companies.map((company, index) => (
              <div 
                key={index}
                className="flex items-center justify-center h-16 px-6 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <span className="text-xl md:text-2xl font-bold text-foreground tracking-wider">
                  {company.logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
