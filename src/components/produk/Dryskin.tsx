import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SingleProduct {
  id: number;
  title: string;
  desc: string;
  imgUrl: string;
}

const DrySkinSection: React.FC = () => {
  const drySkinProducts: SingleProduct[] = [
    {
      id: 1,
      title: "Hydrating Wash",
      desc: "Membersihkan kotoran sekaligus menjaga lapisan lemak alami kulit.",
      imgUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      title: "Barrier Essence",
      desc: "Membantu memperkuat pertahanan kulit dari polusi dan radikal bebas.",
      imgUrl: "https://images.unsplash.com/photo-1512413316925-fd4b93f31521?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      title: "Rich Night Cream",
      desc: "Nutrisi intensif di malam hari untuk kulit kenyal saat bangun pagi.",
      imgUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <section id="dry" className="py-5 pt-24 bg-white overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Paket Utama --- */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          
          {/* Konten Teks (liftoff active) */}
          <div className="order-2 md:order-1 text-left liftoff active">
            <span className="text-[#C5A059] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">
              Produk Untuk Kulit Kering
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 italic overflow-hidden">
              <span className="block translate-y-full animate-[maskReveal_0.6s_ease-out_forwards] font-['Times_New_Roman',_Times,_serif]">
                Dry Skin Formula
              </span>
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed mb-8 liftoff delay-100 font-['Poppins',_sans-serif]">
              Kulit kering membutuhkan hidrasi yang konsisten dan perlindungan skin barrier. 
              Formula ini membantu kulit terasa lebih halus dan nyaman.
            </p>

            <div className="mb-10 liftoff delay-200">
              <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-[10px] font-['Poppins',_sans-serif]">
                Manfaat Utama
              </h4>
              <ul className="space-y-3 text-gray-500 font-light text-base list-none font-['Poppins',_sans-serif]">
                {["Membantu menjaga hidrasi kulit", "Membantu memperbaiki skin barrier", "Kulit terasa lebih lembut dan kenyal", "Membantu menyamarkan tampilan garis halus"].map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full mr-3"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] mb-12 border border-[#F5EBE0] shadow-sm liftoff delay-300">
              <h4 className="font-bold text-[#C5A059] mb-2 uppercase tracking-widest text-[10px] font-['Times_New_Roman',_Times,_serif]">
                Cocok untuk Kamu jika
              </h4>
              <p className="text-gray-600 text-sm italic font-['Poppins',_sans-serif]">
                "Kulit terasa ketarik. Mudah kusam. Makeup mudah crack."
              </p>
            </div>

            <button className="bg-gray-900 text-white px-12 py-6 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-black transition-all group flex items-center shadow-2xl liftoff delay-400">
              Lihat Produk untuk Kulit Kering
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </button>
          </div>

          {/* Gambar Utama (drift-right & antigravity-float) */}
          <div className="order-1 md:order-2 relative drift-right antigravity-float shadow-2xl rounded-[3rem] overflow-hidden">
            <div className="aspect-square bg-white transition-all duration-500 hover:scale-[1.05]">
              <img 
                src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800" 
                alt="Dry Skin Package" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DrySkinSection;