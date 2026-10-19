// import Navbar from "@/components/home/Navbar";
import Hero from "@/components/produk/Hero";
import OilySkinSection from "@/components/produk/Oilyskin";
import OilySkinRetail from "@/components/produk/ListOily";
import DrySkinSection from "@/components/produk/Dryskin";
import DrySkinRetail from "@/components/produk/ListDry";
import SensitiveSkinSection from "@/components/produk/Sensitiveskin";
// import CTA from "@/components/home/CTA";
import Footer from "@/components/produk/Footer";
import React, { useState } from "react";
import { useReveal } from '@/hooks/useReveal';

const Index: React.FC = () => {
  useReveal();
  return (
    <main className="min-h-screen">
      {/* <Navbar /> */}
      <Hero />
      <OilySkinSection />
      <OilySkinRetail />
      <DrySkinSection />
      <DrySkinRetail />
      {/* <CTA /> */}
      <Footer />
    </main>
  );
};

export default Index;
