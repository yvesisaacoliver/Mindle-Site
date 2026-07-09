export const PLANOS = {
  "individual": {
    nome: "Individual",
    descricao: "Aula individual ao vivo, 1x na semana, plano de estudos personalizado, foco total em conversação.",
    price: 39700,
  },
  "turma": {
    nome: "Turma",
    descricao: "Turmas de até 5 alunos, aulas ao vivo com professor, material incluso, encontros 1x na semana.",
    price: 19700,
  },
  "individual-premium": {
    nome: "Individual Premium",
    descricao: "2 aulas ao vivo por semana, foco total em conversação, evolução mais rápida, plano personalizado, preparação para trabalho, viagens e entrevistas.",
    price: 72000,
  },
} as const;

export type PlanoSlug = keyof typeof PLANOS;

export function formatPrice(centavos: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(centavos / 100);
}
