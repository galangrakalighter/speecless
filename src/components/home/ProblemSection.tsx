import React from 'react';
import LogoCoin from '@/assets/Home/logo_uang.webp'
import LogoPencil1 from '@/assets/Home/logo_pencil.webp'
import LogoPencil2 from '@/assets/Home/logo_pencil_1.webp'
import LogoSimpan from '@/assets/Home/logo_simpan.webp'
import LogoBox from '@/assets/Home/logo_box.webp'
import LogoRumah from '@/assets/Home/logo_rumah.webp'

const ProblemSection: React.FC = () => {
  const problems = [
    { text: "Pensil murah tapi", highlight: "MUDAH PATAH", icon: LogoCoin },
    { text: "Pensil murah tapi", highlight: "KOSONG", icon: LogoPencil1 },
    { text: "Pensil murah tapi", highlight: "KAYUNYA BELAH-BELAH", icon: LogoPencil2 },
    { text: "Pensil murah tapi", highlight: "SELESAI NYA BULAN DEPAN", icon: LogoSimpan },
    { text: "Pensil murah tapi jumlah isi", highlight: "TIDAK SESUAI DENGAN YANG DIPESAN", icon: LogoBox },
    { text: "Pensil murah tapi produk", highlight: "AMENITIES LAINNYA DIMAHALIN", icon: LogoRumah },
  ];

  return (
    <section className="py-12 md:py-20 px-4 flex items-center justify-center overflow-hidden" style={{ 
        backgroundColor: '#f3e5d8', 
        backgroundImage: `url('https://www.transparenttextures.com/patterns/wood-pattern.png')` 
      }}>
      
      {/* Container Utama - Responsif Padding & Rounded */}
      <div className="max-w-5xl w-full bg-[#8A6240] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] p-8 sm:p-12 md:p-20 text-white shadow-2xl">
        
        {/* Header - Responsif Font Size */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-medium leading-tight max-w-3xl mx-auto px-2">
            Apakah anda pernah mengalami <span className="text-[#facc15] font-bold">masalah</span> ini saat membeli pensil custom nama dari tempat lain?
          </h2>
        </div>

        {/* Grid Masalah - Responsif Kolom & Gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-12 sm:gap-y-16 gap-x-8 md:gap-x-12">
          {problems.map((p, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              
              {/* Ukuran Ikon Responsif */}
              <img 
                src={p.icon} 
                alt={p.highlight} 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110" 
              />
              
              {/* Teks Deskripsi Responsif */}
              <div className="max-w-[260px] sm:max-w-[300px]">
                <p className="text-lg sm:text-xl md:text-2xl leading-tight font-medium">
                  {p.text} <br />
                  <span className="text-[#facc15] font-black uppercase tracking-tight block mt-1">
                    {p.highlight}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Responsif */}
        <p className="text-center text-lg sm:text-xl md:text-2xl font-medium mt-16 md:mt-24 opacity-80 italic px-4">
          dan masih banyak masalah yang kamu hadapi?
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;