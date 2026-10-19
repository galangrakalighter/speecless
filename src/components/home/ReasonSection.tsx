import React from 'react';

const reasons = [
  "Produk aman digunakan", "Isi lebih banyak", "Kualitas terjamin", "Harga terjangkau",
  "Proses cepat", "Dijamin puas", "Berdiri sejak 2008", "1000 klien kami handle",
  "Garansi Produk", "Best choice by google"
];

const ReasonsSection: React.FC = () => {
  return (
    <section 
      className="py-16 md:py-24 px-4 sm:px-6" 
      style={{ 
        backgroundColor: '#f3e5d8', 
        backgroundImage: `url('https://www.transparenttextures.com/patterns/wood-pattern.png')` 
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Judul Responsif: text-xl di mobile, text-4xl di desktop */}
        <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-center mb-12 md:mb-20 uppercase text-gray-900 tracking-tighter leading-tight px-2">
          ALASAN MENGAPA BANYAK KLIEN <br className="hidden sm:block" /> MAU BERMITRA DENGAN KAMI?
        </h2>

        {/* Grid System: 1 kolom di mobile, 2 kolom di tablet (sm), dan tetap 2 di desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
          {reasons.map((r, i) => (
            <div 
              key={i} 
              className="bg-[#4F4100] text-white py-3.5 md:py-5 px-6 md:px-10 rounded-full font-bold text-center shadow-lg transform hover:scale-[1.03] transition-all duration-300 cursor-default text-xs sm:text-sm md:text-base uppercase tracking-wide flex items-center justify-center border border-white/5"
            >
              {r}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsSection;