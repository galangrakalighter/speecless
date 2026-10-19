import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ProductItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const SensitiveSkinSection: React.FC = () => {
  const sensitiveProducts: ProductItem[] = [
    {
      id: 1,
      name: "Calming Gel",
      description: "Membantu menenangkan area yang kemerahan dengan seketika.",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=60&w=400",
    },
    {
      id: 2,
      name: "Barrier Relief",
      description: "Memperkuat pertahanan kulit dari faktor eksternal pemicu iritasi.",
      imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=60&w=400",
    },
    {
      id: 3,
      name: "Soothing Mist",
      description: "Memberikan rasa sejuk dan hidrasi kapanpun kulit merasa perih.",
      imageUrl: "https://images.unsplash.com/photo-1512413316925-fd4b93f31521?auto=format&fit=crop&q=60&w=400",
    },
  ];

  return (
    <section id="sensitive" className="py-24 bg-white border-b border-gray-50 overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Paket Utama --- */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          
          {/* Gambar Utama (drift-left & antigravity-float) */}
          <div className="relative drift-left antigravity-float shadow-2xl rounded-[3rem] overflow-hidden group">
            <div className="aspect-square bg-[#FDFBF7] transition-all duration-500 group-hover:scale-[1.05]">
              <img 
                src="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800" 
                alt="Sensitive Skin Package" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Konten Teks (liftoff active) */}
          <div className="text-left liftoff active">
            <span className="text-[#C5A059] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">
              Produk Untuk Kulit Sensitif
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 italic overflow-hidden">
              <span className="block translate-y-full animate-[maskReveal_0.6s_ease-out_forwards] font-['Times_New_Roman',_Times,_serif]">
                Sensitive Skin Formula
              </span>
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed mb-8 liftoff delay-100 font-['Poppins',_sans-serif]">
              Kulit sensitif membutuhkan formula yang tenang dan terukur. 
              Produk ini dirancang untuk membantu menjaga keseimbangan kulit tanpa memicu iritasi.
            </p>

            <div className="mb-10 liftoff delay-200">
              <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-[10px] font-['Times_New_Roman',_Times,_serif]">
                Manfaat Utama
              </h4>
              <ul className="space-y-3 text-gray-500 font-light text-base font-['Poppins',_sans-serif]">
                {[
                  "Membantu menenangkan kulit",
                  "Membantu mengurangi rasa tidak nyaman",
                  "Menjaga kelembapan alami kulit",
                  "Aman untuk penggunaan rutin"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Info Card */}
            <div className="bg-[#FDFBF7] p-8 rounded-[2.5rem] mb-12 border border-[#F5EBE0] liftoff delay-300 shadow-sm">
              <h4 className="font-bold text-[#C5A059] mb-2 uppercase tracking-widest text-[10px] font-['Times_New_Roman',_Times,_serif]">
                Cocok untuk Kamu jika
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed font-['Poppins']">
                Kulit mudah kemerahan. Mudah perih saat ganti skincare.
              </p>
            </div>

            <button className="bg-gray-900 text-white px-12 py-6 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-black transition-all group flex items-center shadow-2xl liftoff delay-400">
              Lihat Produk untuk Kulit Sensitif
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </button>
          </div>
        </div>

        {/* --- Satuan Section (Staggered Delay Berbeda) --- */}
        <div className="pt-20 border-t border-gray-50">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-12 italic text-left liftoff active delay-500 font-['Times_New_Roman']">
            Eceran Satuan - Sensitive Skin
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {sensitiveProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="group p-6 bg-[#FDFBF7] rounded-[2.5rem] transition-all duration-700 hover:shadow-xl hover:bg-white border border-transparent hover:border-gray-100 liftoff active hover:-translate-y-4"
                style={{ transitionDelay: `${800 + (index * 200)}ms` }} // Dimulai lebih lambat dari bagian atas
              >
                <div className="aspect-square rounded-3xl overflow-hidden mb-6 bg-white shadow-inner">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2 font-serif font-['Times_New_Roman',_Times,_serif]">{product.name}</h4>
                <p className="text-gray-500 text-xs font-light mb-6 leading-relaxed font-['Poppins',_sans-serif]">
                  {product.description}
                </p>
                <button className="w-full py-4 border border-gray-900 text-gray-900 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-900 hover:text-white transition-all">
                  Pilih Produk
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SensitiveSkinSection;