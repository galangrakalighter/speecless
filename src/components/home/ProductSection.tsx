import React from 'react';
// Import aset gambar internal dari folder project Anda
import PensilTulis from '@/assets/Home/pencil3.webp';
import PensilWarna from '@/assets/Home/pencil1.webp'; // Menggunakan aset pensil warna yang sudah ada
import PensilTukang from '@/assets/Home/pencil2.webp'; // Menggunakan aset pensil kayu/tukang

const products = [
  { title: "PENSIL TULIS CUSTOM", img: PensilTulis },
  { title: "PENSIL TULIS WARNA", img: PensilWarna },
  { title: "PENSIL TUKANG", img: PensilTukang },
];

const ProductSection: React.FC = () => {
  return (
    <section className="relative py-24 px-6 bg-[#4F4100] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {products.map((item, i) => (
            <div key={i} className="flex flex-col items-center group">
              {/* Judul Produk - Teks Putih Tebal di Atas Gambar */}
              <h3 className="text-white font-black text-center mb-8 uppercase tracking-widest text-xl md:text-2xl leading-tight">
                {item.title} <br />
                <span className="text-yellow-400">SELALU READY!</span>
              </h3>

              {/* Kontainer Gambar dengan Sudut Melengkung Besar */}
              <div className="w-full rounded-[40px] p-4 overflow-hidden transform group-hover:-translate-y-4 transition-all duration-500 ease-out">
                <img 
                  src={item.img} 
                  className="w-full h-full object-contain rounded-[30px]" 
                  alt={item.title} 
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;