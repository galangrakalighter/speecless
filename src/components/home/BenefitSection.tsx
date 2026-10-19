import React from 'react';
import Hotel from '@/assets/Home/hotel.webp'
import Baju from '@/assets/Home/baju.webp'
import Suara from '@/assets/Home/suara.webp'
import Tas from '@/assets/Home/tas.webp'
import Buku from '@/assets/Home/buku.webp'
import grup from '@/assets/Home/grup.webp'

interface BenefitItem {
  title: string;
  title2: string;
  description: string;
  icon: string; 
  lineColor: string;
}

const BenefitSection: React.FC = () => {
  const benefits: BenefitItem[] = [
    {
      title: "Hotel dan Apartement",
      title2: "Amenities",
      description: "Sebagai alat tulis yang praktis, pensil souvenir seringkali menjadi bagian dari goodie bag peserta.",
      lineColor: "bg-yellow-400",
      icon: Hotel,
    },
    {
      title: "Merchandise",
      title2: "Peluncuran Produk",
      description: "Diberikan sebagai hadiah kepada tamu undangan untuk mempromosikan produk baru.",
      lineColor: "bg-[#1e1b4b]",
      icon: Baju,
    },
    {
      title: "Gift Kampanye",
      title2: "Sosial",
      description: "Cetak pesan kampanye pada pensil untuk meningkatkan kesadaran masyarakat.",
      lineColor: "bg-red-500",
      icon: Suara,
    },
    {
      title: "Souvenir Acara",
      title2: "Perusahaan",
      description: "Pensil souvenir dapat dijadikan bagian dari merchandise perusahaan.",
      lineColor: "bg-red-500",
      icon: Tas,
    },
    {
      title: "Alat Tulis Pendidikan",
      title2: "",
      description: "Berikan pensil sebagai hadiah untuk memotivasi siswa berprestasi.",
      lineColor: "bg-[#1e1b4b]",
      icon: Buku,
    },
    {
      title: "Seminar dan Workshop",
      title2: "",
      description: "Dapat diberikan sebagai hadiah kepada orang terdekat",
      lineColor: "bg-yellow-400",
      icon: grup,
    },
  ];

  return (
    <section 
      className="relative py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ 
        backgroundColor: '#f3e5d8', 
        backgroundImage: `url('https://www.transparenttextures.com/patterns/wood-pattern.png')` 
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Judul Responsif */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center text-gray-900 mb-12 md:mb-20 tracking-tighter uppercase leading-tight px-2">
          Manfaat Pensil Untuk <br className="sm:hidden" /> Mitra Kami
        </h2>

        {/* Grid System: 1 kolom di HP, 2 kolom di Tablet ke atas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-12 md:gap-y-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              
              {/* Image Webp Responsif */}
              <img 
                src={benefit.icon} 
                alt={benefit.title} 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-6 md:mb-8 transition-transform duration-300 group-hover:scale-110 drop-shadow-lg" 
              />

              {/* Judul Manfaat Responsif */}
              <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-3 md:mb-4 leading-tight">
                {benefit.title} <br className="hidden sm:block" /> {benefit.title2}
              </h3>

              {/* Deskripsi Responsif */}
              <p className="text-gray-800 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-[280px] sm:max-w-sm">
                {benefit.description}
              </p>

              {/* Garis Dekoratif */}
              <div className={`w-10 h-1.5 mt-6 rounded-full ${benefit.lineColor}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;