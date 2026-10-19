import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FDFBF7]">
      {/* Latar Belakang Orb */}
      <div className="orb w-64 h-64 md:w-[500px] md:h-[500px] -top-20 -left-20 absolute rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #C5A059 0%, transparent 70%)' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-20">
        {/* Kontainer Teks: Menggunakan max-content agar box melebar mengikuti teks di PC */}
        <div className="w-full lg:w-max max-w-full">
          
          <h1 className="text-4xl md:text-7xl font-serif text-gray-900 mb-8 leading-[1.2]">
            {/* Baris 1 */}
            <span className="block overflow-hidden py-1">
                <span className="inline-block translate-y-full animate-[maskReveal_0.4s_ease-out_forwards] font-['Times_New_Roman',_Times,_serif]">
                Produk dengan Formula
                </span>
            </span>
            
            {/* Baris 2 */}
            <span className="block overflow-hidden py-1">
                <span className="inline-block italic text-[#C5A059] translate-y-full animate-[maskReveal_0.4s_ease-out_0.2s_forwards] font-['Times_New_Roman',_Times,_serif]">
                Spesifik untuk Setiap Jenis Kulit
                </span>
            </span>
            </h1>

          {/* Deskripsi: Menghapus whitespace-nowrap agar teks bisa membungkus (wrap) jika layar menyempit */}
          <p className="text-gray-500 text-lg md:text-xl lg:text-2xl font-light mb-12 font-['Poppins',_sans-serif] leading-relaxed max-w-3xl">
            Setiap produk La Flyderm dirancang berdasarkan 
            <br className="hidden lg:block" /> kebutuhan kulit. Fokus pada hasil nyata dan perawatan 
            <br className="hidden lg:block" /> wajah aman.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;