import { Suspense } from "react";
import { CheckoutClient } from "./checkout-client";

export const metadata = {
  title: "Checkout — Mindle Idiomas",
  description: "Finalize sua matrícula na Mindle Idiomas.",
};

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0B0E14]">
          <div className="text-white/60 text-sm">Carregando...</div>
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}
