'use client'

import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { CheckCircle2, AlertCircle } from 'lucide-react'

const inputClass = [
  'w-full border-[1.5px] border-[#ddd] rounded-[10px] px-4 py-3 lg:px-[18px] lg:py-[14px]',
  'text-[15px] lg:text-base text-[#111] bg-white outline-none transition-all duration-200',
  'focus:border-[#e8192c] focus:ring-[3px] focus:ring-[#e8192c]/10',
  'placeholder:text-[#bbb]',
].join(' ')

const labelClass = 'block text-[11px] font-medium uppercase tracking-[0.15em] text-[#888] mb-2'

export function FormSection() {
  const [formData, setFormData] = useState({ name: '', whatsapp: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const text = encodeURIComponent(
      `Olá! Vim pelo site da Mindle Idiomas.\n\n` +
      `*Nome:* ${formData.name}\n` +
      `*WhatsApp:* ${formData.whatsapp}\n\n` +
      `*Mensagem:* ${formData.message}`
    )

    window.open(`https://wa.me/5511934538109?text=${text}`, '_blank')
    setStatus('success')
  }

  return (
    <section id="formulario" className="bg-white py-[60px] lg:py-[100px]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div>
              <div className="mb-6 lg:mb-10">
                <p
                  className="text-[12px] font-bold uppercase mb-4"
                  style={{ color: '#e8192c', letterSpacing: '2px' }}
                >
                  Ainda tem dúvidas?
                </p>
                <h2
                  className="font-serif font-bold leading-[1.1] mb-5"
                  style={{ fontSize: 'clamp(28px, 5vw, 56px)', color: '#111' }}
                >
                  Fala com a gente.
                  <br />
                  <span style={{ color: '#aaa' }}>A gente responde.</span>
                </h2>
                <p
                  className="text-[15px] lg:text-[17px] leading-[1.6]"
                  style={{ color: '#555' }}
                >
                  Conta o que tá te travando, na decisão ou no inglês. Nossa equipe entra em contato via WhatsApp em até 2h.
                </p>
              </div>

              {status === 'success' ? (
                <div className="p-8 rounded-2xl text-center bg-emerald-50 border border-emerald-200">
                  <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#111' }}>WhatsApp aberto!</h3>
                  <p className="text-sm" style={{ color: '#555' }}>
                    Sua mensagem já está preenchida. É só enviar no WhatsApp.
                  </p>
                </div>
              ) : status === 'error' ? (
                <div className="p-8 rounded-2xl text-center bg-red-50 border border-red-200">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#111' }}>Erro ao enviar</h3>
                  <p className="text-sm mb-4" style={{ color: '#555' }}>Tente novamente.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-sm underline underline-offset-4"
                    style={{ color: '#e8192c' }}
                  >
                    Tentar novamente
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
                  <div>
                    <label className={labelClass}>Nome</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Seu nome"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="(11) 99999-9999"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>O que tá te travando?</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Conta pra gente sua dúvida, sua situação, o que te impede de começar..."
                      className={`${inputClass} resize-none min-h-[120px]`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-[16px] px-[32px] text-base font-bold rounded-full text-white bg-[#e8192c] hover:bg-[#c8151f] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <Spinner />Enviando...
                      </span>
                    ) : (
                      'Quero falar com a equipe →'
                    )}
                  </button>

                  <p
                    className="text-center text-[11px] tracking-wide pt-1"
                    style={{ color: '#ccc' }}
                  >
                    Respondemos em até 2h via WhatsApp
                  </p>
                </form>
              )}
          </div>
        </div>
      </div>
    </section>
  )
}
