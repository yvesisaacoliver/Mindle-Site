import Link from "next/link";
import { CheckCircle2, MessageCircle, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Pagamento confirmado — Mindle Idiomas",
  robots: { index: false },
};

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-[#1A448A]/40 py-4">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href="/" className="font-serif font-bold text-xl text-white">
            Mindle Idiomas
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#25D366]/10 border-2 border-[#25D366]/30 mb-8">
            <CheckCircle2 className="h-10 w-10 text-[#25D366]" />
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
            Pagamento confirmado!
          </h1>

          {/* Message */}
          <p className="text-white/60 text-base leading-relaxed mb-3">
            Seu pagamento foi recebido com sucesso.
          </p>
          <p className="text-white/60 text-base leading-relaxed mb-10">
            Nossa equipe vai entrar em contato pelo{" "}
            <span className="text-[#25D366] font-semibold">WhatsApp</span> em
            breve para ativar sua assinatura e agendar sua primeira aula.
          </p>

          {/* Next steps card */}
          <div className="bg-[#121824] border border-[#1A448A]/50 rounded-2xl p-6 mb-8 text-left">
            <h2 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Próximos passos
            </h2>
            <ol className="space-y-3">
              {[
                "Confirmaremos seu pagamento no app InfinitePay",
                "Vamos te chamar no WhatsApp para ativar sua assinatura",
                "Você receberá o link da sua primeira aula",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E31837]/10 border border-[#E31837]/30 flex items-center justify-center text-[#E31837] text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-white/60 text-sm leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/5511934538109?text=Ol%C3%A1!%20Acabei%20de%20realizar%20o%20pagamento%20na%20Mindle%20Idiomas."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b558] text-[#0B0E14] font-bold py-3 px-6 rounded-full text-sm transition-all duration-200 hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-[#1A448A] hover:border-[#E31837]/40 text-white/60 hover:text-white font-medium py-3 px-6 rounded-full text-sm transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao site
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
