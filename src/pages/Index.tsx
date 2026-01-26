import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Feature";
import ProductGird from "@/components/home/ProductGrid";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { useReveal } from '@/hooks/useReveal';

const Index: React.FC = () => {
  useReveal();
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <ProductGird />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
