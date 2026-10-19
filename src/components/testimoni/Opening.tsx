import React, { useEffect, useRef, useState } from 'react';

const ExperienceSection: React.FC = () => {
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
      { threshold: 0.1 } // Menggunakan 0.1 agar animasi terpicu lebih awal di layar mobile
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        {/* Judul: Responsif dari text-2xl ke text-5xl */}
        <h2 className={`text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 md:mb-8 italic transition-all duration-1000 ease-out font-['Times_New_Roman',_Times,_serif] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Pengalaman Nyata dari <br className="hidden sm:block" /> Kulit yang Berbeda
        </h2>
        
        {/* Paragraf: Responsif dari text-base ke text-xl */}
        <p className={`text-gray-500 text-base md:text-xl font-light leading-relaxed font-['Poppins',_sans-serif] transition-all duration-1000 ease-out delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Setiap kulit bereaksi berbeda. La Flyderm digunakan dengan pendekatan 
          formula spesifik sesuai jenis kulit. Testimoni berikut berasal dari 
          pengguna dengan kondisi kulit yang beragam.
        </p>
      </div>

      {/* Aksen dekoratif garis vertikal emas: Ketinggian disesuaikan untuk mobile */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent to-[#C5A059]/30 transition-all duration-[1500ms] ${
          isVisible ? 'h-16 md:h-24' : 'h-0'
        }`} 
        aria-hidden="true"
      />
    </section>
  );
};

export default ExperienceSection;