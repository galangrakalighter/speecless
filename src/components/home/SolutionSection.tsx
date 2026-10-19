import React from 'react';
import Box from '@/assets/Home/multibox.webp';
import Truck from '@/assets/Home/freetruck.webp';
import Pencil from '@/assets/Home/logo_pencil_1.webp';
import Setting from '@/assets/Home/pengaturan.webp';
import Achieve from '@/assets/Home/achieve.webp';

const solutions = [
  { text: "Quantity kami buatkan sesuai kebutuhan dari Anda.", rot: "md:-rotate-2", icon: Box },
  { text: "Free ongkir untuk pengiriman ke mana saja", rot: "md:rotate-2", icon: Truck },
  { text: "Pemesanan jenis pensil apapun kami ready", rot: "md:-rotate-1", icon: Pencil },
  { text: "Kecepatan produksi tidak perlu kuatir kami menggunakan mesin dari eropa", rot: "md:rotate-2", icon: Setting },
  { text: "Kami sudah memenuhi standar dari Forrest Certification & Legal Wood Indonesia", rot: "md:-rotate-1", icon: Achieve },
];

const SolutionSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4" style={{ backgroundColor: '#f3e5d8', backgroundImage: `url('https://www.transparenttextures.com/patterns/wood-pattern.png')` }}>
      <div className="max-w-6xl mx-auto bg-[#8A6240] rounded-[40px] md:rounded-[60px] p-6 md:p-16 text-white shadow-2xl border-4 border-white/10">
        <h2 className="text-2xl md:text-4xl font-black text-center mb-20 md:mb-28 uppercase leading-tight tracking-tighter italic px-2">
          UNTUK ITU KAMI MENAWARKAN SISTEM & PRODUK KAMI YANG MENDUKUNG BRANDING MITRA 100% TANPA PUSING-PUSING LAGI.
        </h2>

        <div className="flex flex-wrap justify-center items-stretch gap-y-20 gap-x-6">
          {solutions.map((s, i) => (
            <div key={i} className="w-full sm:w-[45%] md:w-[30%] flex">
              {/* pt-20 adalah kunci agar teks turun ke bawah */}
              <div className={`relative bg-[#fefce8] text-gray-800 p-8 pt-14 rounded-[35px] text-center shadow-xl transform ${s.rot} hover:rotate-0 hover:scale-105 transition duration-300 w-full flex items-center justify-center border-b-8 border-yellow-400/20`}>
                <img 
                  src={s.icon} 
                  alt="icon" 
                  className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 object-contain drop-shadow-xl z-20"
                />
                <p className="text-sm md:text-base font-black leading-tight uppercase text-[#5d4037]">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;