import React from "react";
import { Helmet } from 'react-helmet-async';
import PricingSection from "@/components/PricingSection";

export default function Precos() {
  return (
    <div className="pt-24">
      <Helmet>
        <title>Preços — Websites e Convecta Booking | Convecta</title>
        <meta name="description" content="Planos e preços para websites profissionais e para o Convecta Booking — app de gestão para barbearias. Sem surpresas, sem fidelização." />
        <link rel="canonical" href="https://convecta.pt/precos" />
      </Helmet>
      <PricingSection />
    </div>
  );
}
