import React from 'react';

interface Testimonial {
  name: string;
  age: number;
  text: string;
  beforeImg: string;
  afterImg: string;
}

const drySkinData: Testimonial[] = [
  {
    name: "Maya",
    age: 34,
    text: "Kulit saya sering terasa ketarik setelah cuci muka. Setelah pakai La Flyderm, kulit terasa lebih lembap dan nyaman. Tidak mudah kering.",
    beforeImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    afterImg: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Intan",
    age: 29,
    text: "Kulit saya terlihat kusam sebelumnya. Setelah pemakaian rutin, tekstur kulit terasa lebih halus.",
    beforeImg: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=400",
    afterImg: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400"
  }
];

const DrySkinSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section - Menggunakan liftoff */}
        <div className="text-left mb-10 md:mb-16 liftoff">
          <span className="text-[#C5A059] font-bold tracking-[0.3em] uppercase text-[10px] mb-3 md:mb-4 block">
            Hasil Transformasi
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 italic font-['Times_New_Roman',_Times,_serif]">
            Kulit Kering
          </h2>
        </div>

        {/* Grid Testimonial: Menggunakan liftoff dan delay bertahap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {drySkinData.map((person, index) => (
            <div 
              key={index}
              className={`group p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-[#FDFBF7] shadow-sm 
                liftoff delay-${index + 1} 
                antigravity-float-subtle transition-all duration-1000 ease-out hover:shadow-2xl md:hover:-translate-y-3`}
            >
              {/* Images Container */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                {/* Before Image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-inner">
                  <img 
                    src={person.beforeImg} 
                    alt={`${person.name} Before`} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000" 
                  />
                  <span className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-black/50 text-white text-[8px] md:text-[9px] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-widest font-bold backdrop-blur-sm">
                    Before
                  </span>
                </div>

                {/* After Image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl bg-white border-[1.5px] md:border-2 border-[#C5A059]/30 shadow-md">
                  <img 
                    src={person.afterImg} 
                    alt={`${person.name} After`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <span className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-[#C5A059] text-white text-[8px] md:text-[9px] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-widest font-bold shadow-lg">
                    After
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="text-left px-1 md:px-2">
                <h4 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-3 md:mb-4 font-['Times_New_Roman',_Times,_serif]">
                  {person.name}, {person.age} Tahun
                </h4>
                <p className="text-gray-500 text-sm md:text-base font-light italic leading-relaxed font-['Poppins',_sans-serif]">
                  "{person.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DrySkinSection;