import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

const RoutineCtaSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Jika section masuk ke layar (threshold 0.2 berarti 20% section terlihat)
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Berhenti mengamati setelah animasi dipicu
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 bg-gray-900 text-white overflow-hidden relative"
    >
      {/* Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
      ></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* 1. Judul: Animasi Mask Reveal */}
        <div className="overflow-hidden mb-8">
          <h2 className={`text-4xl md:text-6xl font-serif italic text-center font-['Times_New_Roman',_serif] mb-8 transition-all duration-[800ms] ease-out ${
            isVisible 
                ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.8s_ease-out_forwards]' 
                : 'opacity-0 translate-y-8'
            }`}>
            Rangkaian Lengkap untuk Rutinitas yang Lebih Terarah
            </h2>
        </div>

        {/* 2. Deskripsi: Animasi Fade Up */}
        <p className={`text-gray-400 font-light mb-12 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-center font-['Poppins',_sans-serif] transition-all duration-[800ms] delay-300 ${
          isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]' : 'opacity-0 translate-y-8'
        }`}>
          La Flyderm menyediakan rangkaian basic skincare yang saling melengkapi. 
          Setiap langkah dirancang untuk bekerja selaras sesuai jenis kulit Kamu.
        </p>

        {/* 3. Tombol: Animasi Fade Up */}
        <div className={`transition-all duration-[800ms] delay-500 ${
          isVisible ? 'opacity-100 translate-y-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]' : 'opacity-0 translate-y-8'
        }`}>
          <button className="bg-[#C5A059] text-white py-6 px-16 rounded-full font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-[#b08e4d] transition-all flex items-center justify-center mx-auto group shadow-2xl font-['Poppins',_sans-serif]">
            Mulai Rutinitas Skincare Kamu
            <Sparkles 
              className="ml-3 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 text-white/80" 
              size={20} 
            />
          </button>
        </div>
      </div>

      {/* Efek Cahaya Dekoratif */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[100px]"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-[100px]"></div>
    </section>
  );
};

export default RoutineCtaSection;