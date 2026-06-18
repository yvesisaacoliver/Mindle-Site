'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, X } from 'lucide-react'

const navItems = [
  { label: 'Método', href: '#metodo', description: 'Nossa abordagem única' },
  { label: 'Depoimentos', href: '#depoimentos', description: 'O que dizem nossos alunos' },
  { label: 'Preços', href: '#precos', description: 'Planos e investimento' },
  { label: 'FAQ', href: '#faq', description: 'Perguntas frequentes' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const scrollToForm = useCallback(() => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }, [])

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="/" className="font-serif text-xl lg:text-2xl font-bold text-foreground relative z-[60]">
              Mindle Idiomas
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button
                onClick={scrollToForm}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 cursor-pointer"
              >
                Começar agora
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[60] flex items-center lg:hidden cursor-pointer"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <span
                  className={`absolute block h-[2px] w-6 bg-foreground transition-all duration-300 ease-out ${
                    isOpen ? 'rotate-45' : '-translate-y-[5px]'
                  }`}
                />
                <span
                  className={`absolute block h-[2px] bg-foreground transition-all duration-300 ease-out ${
                    isOpen ? 'w-0 opacity-0' : 'w-4 opacity-100 translate-x-[-4px]'
                  }`}
                />
                <span
                  className={`absolute block h-[2px] w-6 bg-foreground transition-all duration-300 ease-out ${
                    isOpen ? '-rotate-45' : 'translate-y-[5px]'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay Menu */}
      <div
        className={`fixed inset-0 z-[55] lg:hidden transition-all duration-500 ease-out ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/98 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        />

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-4 z-20 w-10 h-10 flex items-center justify-center cursor-pointer"
          aria-label="Fechar menu"
        >
          <X className="w-6 h-6 text-foreground" />
        </button>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6">
          <nav className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`group text-left py-4 border-b border-border/30 transition-all duration-500 ease-out cursor-pointer ${
                  isOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: isOpen ? `${150 + index * 75}ms` : '0ms' }}
              >
                <div className="flex items-center justify-between">
                  <span className="block text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                    {item.label}
                  </span>
                  <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </div>
              </button>
            ))}
          </nav>

          <div
            className={`mt-8 transition-all duration-500 ease-out ${
              isOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: isOpen ? '450ms' : '0ms' }}
          >
            <Button
              onClick={scrollToForm}
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg w-full cursor-pointer"
            >
              Começar agora
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
