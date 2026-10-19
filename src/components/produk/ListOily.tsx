import React, { useEffect, useRef, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

const OilySkinRetail: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    /* pb-32: Jarak bawah cukup besar di mobile.
       md:pb-24: Jarak standar di desktop.
       md:mt-[-5%]: Menarik ke atas hanya pada layar desktop agar overlap cantik.
    */
    <div ref={containerRef} className="pb-32 md:pb-24 max-w-7xl bg-white mx-auto px-6 relative z-20">
      
      {/* Judul: Ukuran teks menyesuaikan layar */}
      <div className="overflow-hidden mb-10 md:mb-16">
        <h3 className={`text-xl md:text-3xl font-serif font-bold text-gray-900 italic text-left transition-transform duration-1000 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}>
          Eceran Satuan - Oily Skin
        </h3>
      </div>

      {/* Grid: Gap mengecil di mobile agar hemat ruang */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className={`group p-6 md:p-8 bg-[#F9F8F3] rounded-[2.5rem] md:rounded-[3.5rem] transition-all duration-700 ease-out 
              hover:duration-300 hover:delay-0 hover:-translate-y-4 hover:shadow-2xl hover:bg-white
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            style={{ 
              transitionDelay: isVisible ? `${(index + 1) * 150}ms` : '0ms' 
            }}
          >
            {/* Wadah Gambar: Radius sudut disesuaikan */}
            <div className="aspect-square rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mb-6 md:mb-8 bg-white flex items-center justify-center shadow-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
            
            <div className="px-1 md:px-2">
              <h4 className="font-extrabold text-gray-900 text-lg md:text-xl mb-2 md:mb-3 tracking-tight">
                {product.name}
              </h4>
              
              <p className="text-gray-500 text-xs md:text-sm font-light mb-8 md:mb-10 leading-relaxed">
                {product.description}
              </p>
              
              <button className="w-full py-4 border border-gray-900 text-gray-900 text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm active:scale-95">
                Pilih Produk
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OilySkinRetail;