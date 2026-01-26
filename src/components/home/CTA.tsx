import React from 'react';
import { ShoppingBag, ExternalLink } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-40 bg-gray-900 text-white overflow-hidden relative">
      {/* Background Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"
      ></div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-7xl font-serif mb-10 italic text-center liftoff font-[Arial,Helvetica,sans-serif]">
          Dapatkan Kulit Impian Kamu Sekarang
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 liftoff delay-2">
          {/* Shopee Button */}
          <button className="w-full md:w-auto bg-[#C5A059] text-white py-7 px-16 rounded-full font-bold text-sm tracking-[0.3em] uppercase hover:bg-[#b08e4d] transition-all flex items-center justify-center group shadow-2xl font-[Arial,Helvetica,sans-serif]">
            Shopee Official
            <ShoppingBag 
              className="ml-3 group-hover:scale-110 transition-transform" 
              size={20} 
            />
          </button>

          {/* Tokopedia Button */}
          <button className="w-full md:w-auto border border-white/20 text-white py-7 px-16 rounded-full font-bold text-sm tracking-[0.3em] uppercase hover:bg-white/10 transition-all flex items-center justify-center group font-[Arial,Helvetica,sans-serif]">
            Tokopedia Store
            <ExternalLink 
              className="ml-3 opacity-50 group-hover:opacity-100 transition-opacity" 
              size={20} 
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;