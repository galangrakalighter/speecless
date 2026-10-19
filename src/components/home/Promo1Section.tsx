import React from 'react';
import PromoBg from '@/assets/Home/8 1.webp'; 

const Promo1Section: React.FC = () => {
  return (
    <section className="relative w-full py-12 md:py-24 px-6 border-y border-gray-100 bg-[#f3f3f3] overflow-hidden">
      
      {/* PERBAIKAN UTAMA: 
          W-full digunakan agar gambar memenuhi seluruh lebar section, 
          sehingga tidak ada celah di kiri. 
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img 
          src={PromoBg} 
          alt="Pensil Kayu" 
          className="w-full h-full object-cover object-right" 
          /* object-right memastikan pensil tetap berada di kanan meskipun layar sangat lebar */
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center min-h-[300px] md:min-h-[400px]">
        
        {/* Konten Teks di Sisi Kiri */}
        <div className="w-full md:w-3/5 text-center md:text-left space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-[#1a2b3c] leading-tight uppercase tracking-tighter">
            PROMO Minimum Order, <br />
            Pensil Custom Nama
          </h2>
          <p className="text-xl md:text-2xl font-bold text-gray-800 italic leading-snug">
            Dimulai dari <span className="text-red-600 font-black">200 batang</span> aja sampai ratusan ribu batang Ready semua!
          </p>
        </div>

        {/* Spacer di kanan untuk menjaga area visual pensil */}
        <div className="hidden md:block md:w-2/5"></div>
      </div>
    </section>
  );
};

export default Promo1Section;