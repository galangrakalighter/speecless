import React, { useEffect, useRef, useState } from 'react';

interface SingleProduct {
  id: number;
  title: string;
  desc: string;
  imgUrl: string;
}

const DrySkinRetail: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    /* Menambahkan pb-32 untuk jarak ke bawah yang luas dan elegan */
    <div ref={containerRef} className="pt-20 bg-white pb-32 max-w-7xl mx-auto px-6 border-t border-gray-100">
      {/* Subjudul dengan Animasi Mask Reveal */}
      <div className="overflow-hidden mb-16">
        <h3 className={`text-2xl md:text-3xl font-serif font-bold text-gray-900 italic text-left transition-transform duration-1000 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}>
          Eceran Satuan - Dry Skin
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        {drySkinProducts.map((product, index) => (
          <div 
            key={product.id} 
            className={`group p-8 bg-[#F9F8F3] rounded-[3.5rem] transition-all duration-700 ease-out 
              hover:duration-300 hover:delay-0 hover:-translate-y-4 hover:shadow-2xl hover:bg-white
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            style={{ 
              transitionDelay: isVisible ? `${(index + 1) * 200}ms` : '0ms' 
            }}
          >
            {/* Image Container */}
            <div className="aspect-square rounded-[2.5rem] overflow-hidden mb-8 bg-white flex items-center justify-center shadow-sm">
              <img 
                src={product.imgUrl} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>

            {/* Content */}
            <div className="px-2">
              <h4 className="font-extrabold text-gray-900 text-xl mb-3 tracking-tight">
                {product.title}
              </h4>
              <p className="text-gray-500 text-sm font-light mb-10 leading-relaxed font-['Poppins',_sans-serif]">
                {product.desc}
              </p>

              <button className="w-full py-4 border border-gray-900 text-gray-900 text-[11px] font-black uppercase tracking-[0.15em] rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm">
                Pilih Produk
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrySkinRetail;