import React from 'react';
import pencilCustom from '@/assets/Home/Group.webp';

const Hero: React.FC = () => {
  return (
    <main 
      className="relative min-h-screen py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundColor: '#f3e5d8', 
        backgroundImage: `url('https://www.transparenttextures.com/patterns/wood-pattern.png')` 
      }}
    >
      {/* Overlay halus untuk tekstur kayu */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl w-full mx-auto bg-white rounded-[30px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row items-stretch border border-white/50">
        
        {/* Bagian Gambar - Responsif Height */}
        <div className="w-full md:w-1/2 relative min-h-[300px] sm:min-h-[400px] md:min-h-[550px] lg:min-h-[650px] overflow-hidden bg-transparent">
          <img 
            src={pencilCustom}
            alt="Pensil Custom" 
            className="absolute inset-0 w-full h-full object-cover object-left transform scale-105 -translate-x-1"
          />
        </div>

        {/* Bagian Konten Teks - Responsif Padding & Alignment */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1a237e] mb-4 md:mb-6 leading-[1.1] tracking-tighter">
            Bingung Cari <br className="hidden sm:block" />
            Pensil Custom <br className="hidden sm:block" />
            Nama Di Mana?
          </h1>
          
          <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-8 md:mb-10 leading-relaxed max-w-md mx-auto md:mx-0">
            Yuk jadi Mitra dari <span className="font-bold text-gray-900">Pencilvania Factory Supplier Indonesia</span>. 
            Dijamin dapat Harga Paling Murah!
          </p>

          <div className="mt-2 md:mt-4">
            <a 
              href="https://wa.me/62895807445169" 
              target='_blank'
              rel="noopener noreferrer"
              className="inline-block border-b-[5px] sm:border-b-[6px] md:border-b-[10px] border-gray-800 text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 hover:text-[#1a237e] hover:border-[#1a237e] transition-all duration-300 transform hover:scale-105 active:scale-95 italic"
            >
              Ya, Saya Mau!
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;