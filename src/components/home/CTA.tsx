import React from 'react';
// Gunakan gambar pensil kayu sebagai latar belakang
import CtaBg from '@/assets/Home/P2640485 1.webp'; 

const FinalCTA: React.FC = () => {
  return (
    <section 
      className="relative py-32 px-6 bg-cover bg-center text-center overflow-hidden min-h-[500px] flex items-center justify-center"
      style={{ backgroundImage: `url(${CtaBg})` }}
    >
      {/* Overlay Gelap agar teks putih mudah dibaca */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-2xl">
          Percayakan kualitas pensil <br /> terbaik kepada kami!
        </h2>
        
        <div className="flex justify-center">
          <a 
            href="https://wa.me/62895807445169" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#d4a017] hover:bg-[#b8860b] text-white font-bold py-5 px-14 rounded-full text-2xl shadow-2xl transition-all transform hover:scale-110 active:scale-95 inline-block"
          >
            Ya, Saya Mau!
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;