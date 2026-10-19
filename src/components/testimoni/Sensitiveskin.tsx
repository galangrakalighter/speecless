import React, { useEffect, useRef, useState } from 'react';

interface Transformation {
  id: number;
  name: string;
  age: number;
  quote: string;
  imageBefore: string;
  imageAfter: string;
}

const sensitiveTestData: Transformation[] = [
  {
    id: 1,
    name: "Sari",
    age: 32,
    quote: "Kulit saya mudah merah saat coba produk baru. La Flyderm terasa lebih ringan. Tidak perih. Tidak menimbulkan reaksi yang mengganggu.",
    imageBefore: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400",
    imageAfter: "https://images.unsplash.com/photo-1594744803329-e58b31de21b4?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "Nabila",
    age: 26,
    quote: "Saya biasanya ragu ganti skincare. Setelah pakai La Flyderm, kulit lebih tenang dan jarang bermasalah.",
    imageBefore: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80&w=400",
    imageAfter: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400"
  }
];

const SensitiveSkinSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#FDFBF7] overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-left mb-10 md:mb-16 overflow-hidden">
          <span className={`text-[#C5A059] font-bold tracking-[0.3em] uppercase text-[10px] mb-3 md:mb-4 block transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            Hasil Transformasi
          </span>
          <h2 className={`text-3xl md:text-5xl font-serif font-bold text-gray-900 italic transition-transform duration-1000 ease-out font-['Times_New_Roman',_Times,_serif] ${
            isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}>
            Kulit Sensitif
          </h2>
        </div>

        {/* Transformation Grid: 1 kolom mobile, 2 kolom desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {sensitiveTestData.map((item, index) => (
            <div 
              key={item.id} 
              className={`group p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-white shadow-sm transition-all duration-1000 ease-out hover:shadow-2xl md:hover:-translate-y-3 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${(index + 1) * 200}ms` : '0ms' 
              }}
            >
              {/* Image Pair Container: Tetap 2 kolom di semua layar */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                {/* Before Image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-gray-50">
                  <img 
                    src={item.imageBefore} 
                    alt={`${item.name} Before`} 
                    className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/5" />
                  <span className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-black/50 text-white text-[8px] md:text-[9px] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-widest font-bold backdrop-blur-sm">
                    Before
                  </span>
                </div>

                {/* After Image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border-[1.5px] md:border-2 border-[#C5A059]/30 bg-gray-50 shadow-inner">
                  <img 
                    src={item.imageAfter} 
                    alt={`${item.name} After`} 
                    className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-105" 
                  />
                  <span className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-[#C5A059] text-white text-[8px] md:text-[9px] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-widest font-bold shadow-lg">
                    After
                  </span>
                </div>
              </div>

              {/* Description Content */}
              <div className="text-left px-1 md:px-2">
                <h4 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-3 md:mb-4 transition-all duration-700 font-['Times_New_Roman',_Times,_serif]">
                  {item.name}, {item.age} Tahun
                </h4>
                <p className="text-gray-500 text-sm md:text-base font-light italic leading-relaxed font-['Poppins',_sans-serif]">
                  "{item.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SensitiveSkinSection;