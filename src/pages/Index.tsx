import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import ProductSection from "@/components/home/ProductSection";
import SolutionSection from "@/components/home/SolutionSection";
import WorkflowSection from "@/components/home/WorkflowSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import ReasonSection from "@/components/home/ReasonSection";
import ClientGrid from "@/components/home/ClientGrid";
import BenefitSection from "@/components/home/BenefitSection";
import Promo1Section from "@/components/home/Promo1Section";
import SpesialOffer from "@/components/home/SpesialOffer";
import FinalCTA from "@/components/home/CTA";
import ArticleSection from "@/components/home/ArticleSection";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { useReveal } from '@/hooks/useReveal';

const Index: React.FC = () => {
  useReveal();
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProblemSection />
      <ProductSection />
      <SolutionSection />
      <WorkflowSection />
      <TestimonialSection />
      <ClientGrid />
      <ReasonSection />
      <BenefitSection />
      <Promo1Section />
      <SpesialOffer />
      <ArticleSection />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
