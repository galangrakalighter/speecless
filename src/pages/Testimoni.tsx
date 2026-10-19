import Hero from "@/components/testimoni/Hero";
import OilySkinSection from "@/components/testimoni/Oilyskin";
import DrySkinSection from "@/components/testimoni/Dryskin";
import SensitiveSkinSection from "@/components/testimoni/Sensitiveskin";
import ExperienceSection from "@/components/testimoni/Opening";
import BenefitSummary from "@/components/testimoni/Result";
import Footer from "@/components/produk/Footer";
import React, { useState } from "react";
import { useReveal } from '@/hooks/useReveal';


const Index: React.FC = () => {
  useReveal();
  return (
    <main className="min-h-screen">
      <Hero />
      <ExperienceSection />
      <OilySkinSection />
      <DrySkinSection />
      {/* <SensitiveSkinSection /> */}
      <BenefitSummary />
      <Footer />
    </main>
  );
};

export default Index;
