"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Sparkles, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { PLANOS, PlanoSlug, formatPrice } from "@/lib/planos";
import { criarCheckout } from "@/app/actions/checkout";

const schema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  whatsapp: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "WhatsApp inválido. Use (XX) XXXXX-XXXX"),
  plano: z.enum(["individual", "turma", "individual-premium"]),
});

type FormData = z.infer<typeof schema>;

const PLANO_SLUGS = Object.keys(PLANOS) as PlanoSlug[];

function maskWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const inputClass =
  "w-full bg-[#1A2332] border border-[#1A448A] rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-[15px] outline-none transition-all focus:border-[#E31837] focus:ring-2 focus:ring-[#E31837]/20";
const labelClass =
  "block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-2";
const errorClass = "text-[12px] text-[#E31837] mt-1";

export function CheckoutClient() {
  const searchParams = useSearchParams();
  const rawParam = searchParams.get("plano") as PlanoSlug | null;
  const initialSlug: PlanoSlug =
    rawParam && rawParam in PLANOS ? rawParam : "turma";

  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { plano: initialSlug },
  });

  const selectedPlano = watch("plano");

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    const toastId = toast.loading("Aguarde, gerando link de pagamento...");
    try {
      const result = await criarCheckout(data);
      toast.dismiss(toastId);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      window.location.href = result.checkoutUrl;
    } catch {
      toast.dismiss(toastId);
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white">
      {/* Header */}
      <header className="border-b border-[#1A448A]/40 py-4">
        <div className="container mx-auto px-4 max-w-5xl flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-xl text-white">
            Mindle Idiomas
          </Link>
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <Lock className="h-3 w-3" />
            Pagamento seguro via InfinitePay
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-5xl py-10 lg:py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E31837] mb-3">
            Matrícula
          </p>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-white">
            Escolha seu plano e comece agora
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Plan selection */}
          <section className="mb-10">
            <h2 className={labelClass}>Selecione o plano</h2>
            <input type="hidden" {...register("plano")} />
            <div className="grid md:grid-cols-3 gap-4">
              {PLANO_SLUGS.map((slug) => {
                const p = PLANOS[slug];
                const selected = selectedPlano === slug;
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => setValue("plano", slug, { shouldValidate: true })}
                    className={`relative text-left rounded-2xl border-2 p-5 transition-all duration-200 cursor-pointer ${
                      selected
                        ? "border-[#E31837] bg-[#E31837]/10 shadow-lg shadow-[#E31837]/10"
                        : "border-[#1A448A] bg-[#121824] hover:border-[#E31837]/40"
                    }`}
                  >
                    {slug === "turma" && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 bg-[#E31837] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                          <Sparkles className="h-3 w-3" />
                          Mais vendido
                        </span>
                      </div>
                    )}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mb-3 transition-all ${
                        selected
                          ? "border-[#E31837] bg-[#E31837]"
                          : "border-[#1A448A]"
                      }`}
                    >
                      {selected && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div className="font-bold text-white mb-1">{p.nome}</div>
                    <div className="text-2xl font-bold text-[#E31837] mb-2">
                      {formatPrice(p.price)}
                      <span className="text-sm font-normal text-white/40">/mês</span>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed">{p.descricao}</p>
                  </button>
                );
              })}
            </div>
            {errors.plano && (
              <p className={errorClass}>{errors.plano.message}</p>
            )}
          </section>

          {/* Form fields */}
          <section className="bg-[#121824] border border-[#1A448A]/50 rounded-2xl p-6 lg:p-8 max-w-lg mx-auto">
            <h2 className="font-semibold text-white mb-6 text-lg">
              Seus dados
            </h2>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Nome completo</label>
                <input
                  {...register("nome")}
                  type="text"
                  placeholder="Seu nome completo"
                  className={inputClass}
                  autoComplete="name"
                />
                {errors.nome && (
                  <p className={errorClass}>{errors.nome.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>E-mail</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="seu@email.com"
                  className={inputClass}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className={errorClass}>{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>WhatsApp</label>
                <input
                  {...register("whatsapp")}
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className={inputClass}
                  autoComplete="tel"
                  onChange={(e) => {
                    const masked = maskWhatsApp(e.target.value);
                    e.target.value = masked;
                    setValue("whatsapp", masked, { shouldValidate: true });
                  }}
                />
                {errors.whatsapp && (
                  <p className={errorClass}>{errors.whatsapp.message}</p>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 pt-6 border-t border-[#1A448A]/40">
              <div className="flex items-center justify-between text-sm text-white/60 mb-1">
                <span>Plano selecionado</span>
                <span className="text-white font-medium">
                  {PLANOS[selectedPlano].nome}
                </span>
              </div>
              <div className="flex items-center justify-between font-bold">
                <span className="text-white/80">Total mensal</span>
                <span className="text-[#E31837] text-xl">
                  {formatPrice(PLANOS[selectedPlano].price)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-[#E31837] hover:bg-[#c8151f] text-white font-bold py-4 rounded-full text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Gerando link...
                </>
              ) : (
                <>
                  Ir para o pagamento
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-center text-white/30 text-[11px] mt-4 leading-relaxed">
              Você será redirecionado para a página de pagamento seguro da InfinitePay.
              <br />
              Aceitamos Pix e cartão de crédito.
            </p>
          </section>
        </form>
      </main>
    </div>
  );
}
