import React from 'react';
// Import aset gambar yang pensilnya sudah di posisi kiri
import SpecialBg from '@/assets/Home/7 1.webp'; 

const SpecialOffer: React.FC = () => {
  return (
    <section className="relative w-full py-12 md:py-24 px-6 bg-white overflow-hidden">
      
      {/* BACKGROUND LAYER: Membentang penuh tanpa celah */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img 
          src={SpecialBg} 
          alt="Pensil Warna" 
          className="w-full h-full object-cover object-left" 
          /* object-left memastikan pensil warna-warni tetap menempel di sisi kiri */
        />
      </div>

      {/* CONTENT LAYER: Menggunakan flex-row-reverse untuk memindahkan teks ke kanan */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center min-h-[300px] md:min-h-[400px]">
        
        {/* Konten Teks di Sisi Kanan */}
        <div className="w-full md:w-1/2 text-center md:text-left py-10">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6 uppercase tracking-tighter">
            Penawaran <br />
            Khusus
          </h2>
          <p className="text-xl md:text-2xl font-bold text-gray-800 italic leading-snug">
            Kouta terbatas untuk 10 orang pendaftar pertama minggu ini!
          </p>
          {/* Aksen Garis Merah */}
          <div className="w-16 h-2 bg-red-600 mx-auto md:mx-0 mt-6 rounded-full"></div>
        </div>

        {/* Spacer di sisi kiri agar teks tidak menutupi gambar pensil pada desktop */}
        <div className="hidden md:block md:w-1/2"></div>
        
      </div>
    </section>
  );
};

export default SpecialOffer;