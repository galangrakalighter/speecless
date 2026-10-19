import React from 'react';
// Import file gambar logo Anda di sini
import LogoIcon from '@/assets/Home/Logo_pensilvania.webp'; 

const Header: React.FC = () => {
  return (
    <header className="relative bg-[#8A6240] text-white py-4 px-6 md:px-12 shadow-md overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto flex justify-between items-center">
        {/* Teks Sebelah Kiri */}
        <div>
          <h2 className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
            PENCILVANIA FACTORY SUPPLIER INDONESIA
          </h2>
          <p className="text-[8px] md:text-[10px] font-medium opacity-80 italic">
            Pabriknya Pensil Tulis & Pensil Warna Indonesia
          </p>
        </div>

        {/* Ikon Logo Sebelah Kanan (Menggunakan File Gambar) */}
        <div className="flex items-center">
          <img 
            src={LogoIcon} 
            alt="Pencilvania Logo" 
            className="h-10 md:h-14 w-auto object-contain drop-shadow-lg" 
            // Ukuran h-10 di mobile dan h-14 di desktop agar proporsional
          />
        </div>
      </div>
    </header>
  );
};

export default Header;