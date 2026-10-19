import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

const OilySkinSection: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Deep Pore Cleanser",
      description: "Pembersih wajah yang mengangkat minyak berlebih tanpa membuat kulit kering.",
      image: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      name: "Oil-Control Toner",
      description: "Membantu mengecilkan tampilan pori dan menyeimbangkan kadar pH kulit.",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      name: "Matte Moisturizer",
      description: "Pelembap ringan yang memberikan hasil akhir matte seharian.",
      image: "https://images.unsplash.com/photo-1590156221122-c748e78f2a7a?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <section id="oily" className="py-24 bg-white border-b border-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Paket Utama --- */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          
          {/* Gambar Utama (drift-left & antigravity-float) */}
          <div className="relative drift-left antigravity-float shadow-2xl rounded-[3rem] overflow-hidden group">
            <div className="aspect-square bg-[#F5EBE0]/30 transition-transform duration-500 group-hover:scale-[1.05]">
              <img 
                src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800" 
                alt="Oily Skin Package" 
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>

          {/* Bagian Konten Teks (liftoff active) */}
          <div className="text-left liftoff active">
            <span className="text-[#C5A059] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block animate-[maskReveal_0.4s_ease-out_forwards]">
              Produk Untuk Kulit Berminyak
            </span>
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 italic leading-tight overflow-hidden">
              <span className="block translate-y-full animate-[maskReveal_0.6s_ease-out_0.1s_forwards] font-['Times_New_Roman',_Times,_serif]">
                Oily Skin Formula
              </span>
            </h2>

            <p className="text-gray-500 text-lg font-light leading-relaxed mb-8 liftoff delay-100 font-['Poppins',_sans-serif]">
              Kulit berminyak butuh keseimbangan, bukan pengeringan berlebihan. 
              Formula ini membantu mengontrol minyak sekaligus menjaga kelembapan alami kulit.
            </p>

            <div className="mb-10 liftoff delay-200">
              <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-[10px] font-['Poppins',_sans-serif]">
                Manfaat Utama
              </h4>
              <ul className="space-y-3 text-gray-500 font-light text-base font-['Poppins',_sans-serif]">
                {["Membantu mengontrol produksi minyak", "Membersihkan pori secara menyeluruh", "Membantu mengurangi tampilan jerawat", "Kulit terasa bersih tanpa rasa ketarik"].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FDFBF7] p-8 rounded-[2.5rem] mb-12 border border-[#F5EBE0] liftoff delay-300 shadow-sm">
              <h4 className="font-bold text-[#C5A059] mb-2 uppercase tracking-widest text-[10px] font-['Poppins',_sans-serif]">
                Cocok untuk Kamu jika
              </h4>
              <p className="text-gray-600 text-sm font-['Poppins',_sans-serif]">
                Kulit cepat berminyak. Mudah berjerawat. Makeup mudah luntur.
              </p>
            </div>

            <button className="bg-gray-900 text-white px-12 py-6 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-black transition-all group flex items-center shadow-2xl liftoff delay-400">
              Lihat Produk untuk Kulit Berminyak
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OilySkinSection;