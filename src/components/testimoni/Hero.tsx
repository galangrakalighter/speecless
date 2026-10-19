import React from 'react';

const TestimonialHero: React.FC = () => {
  return (
    // md:h-screen memastikan tinggi section tepat 100% tinggi layar pada PC
    <section className="relative min-h-screen md:h-screen flex items-center overflow-hidden bg-[#FDFBF7] py-10 md:py-0">
      {/* Latar Belakang Orb: Ukuran diperbesar untuk PC agar tidak terlihat kosong */}
      <div 
        className="orb w-48 h-48 sm:w-64 sm:h-64 md:w-[800px] md:h-[800px] -top-10 -right-10 md:-top-32 md:-right-32 absolute rounded-full opacity-10 md:opacity-20 pointer-events-none" 
        style={{ background: 'radial-gradient(circle, #C5A059 0%, transparent 70%)' }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="w-full lg:w-max max-w-full">
          
          <h1 className="text-[2.5rem] leading-[1.2] sm:text-5xl md:text-7xl lg:text-[6rem] xl:text-[7rem] font-serif text-gray-900 mb-6 md:mb-10 tracking-tight">
            {/* Baris 1 */}
            <span className="block overflow-hidden py-1">
              <span className="inline-block translate-y-full animate-[maskReveal_0.8s_cubic-bezier(0.22,1,0.36,1)_forwards] font-['Times_New_Roman',_Times,_serif]">
                Testimoni Pengguna
              </span>
            </span>
            
            {/* Baris 2 */}
            <span className="block overflow-hidden py-1">
              <span className="inline-block italic text-[#C5A059] translate-y-full animate-[maskReveal_0.8s_cubic-bezier(0.22,1,0.36,1)_0.2s_forwards] font-['Times_New_Roman',_Times,_serif]">
                La Flyderm
              </span>
            </span>
          </h1>

          <div className="overflow-hidden">
            <p className="text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-8 md:mb-16 font-['Poppins',_sans-serif] leading-relaxed max-w-xl md:max-w-3xl translate-y-full">
              Pengalaman nyata transformasi kulit berdasarkan 
              <br className="hidden sm:block" /> jenis kulit dan pemakaian rutin yang konsisten.
            </p>
          </div>

          {/* Aksen Garis Emas yang lebih panjang untuk layar besar */}
          <div className="animate-fadeIn opacity-0 [animation-fill-mode:forwards] [animation-delay:1.2s]">
             <div className="w-24 h-px bg-[#C5A059]/40"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialHero;