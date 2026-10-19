import React from 'react';

interface TransformationData {
  name: string;
  age: number;
  testimonial: string;
  beforeImg: string;
  afterImg: string;
}

const oilySkinTestimonials: TransformationData[] = [
  {
    name: "Dinda",
    age: 27,
    testimonial: "Kulit saya mudah berminyak dan sering muncul jerawat. Setelah rutin pakai rangkaian La Flyderm untuk kulit berminyak, minyak lebih terkontrol. Wajah terasa lebih bersih. Jerawat lebih jarang muncul.",
    beforeImg: "https://images.unsplash.com/photo-1512413316925-fd4b93f31521?auto=format&fit=crop&q=80&w=400",
    afterImg: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Rani",
    age: 30,
    testimonial: "Biasanya wajah saya sudah berminyak sebelum siang. Setelah pakai La Flyderm, wajah terasa lebih stabil. Tidak cepat lengket.",
    beforeImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    afterImg: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400"
  }
];

const OilySkinSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section - Menggunakan liftoff tanpa delay */}
        <div className="text-left mb-10 md:mb-16 liftoff">
          <span className="text-[#C5A059] font-bold tracking-[0.3em] uppercase text-[10px] mb-3 md:mb-4 block">
            Hasil Transformasi
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 italic font-['Times_New_Roman',_Times,_serif]">
            Kulit Berminyak
          </h2>
        </div>

        {/* Grid Testimonial: Menggunakan liftoff dan delay bertahap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {oilySkinTestimonials.map((item, index) => (
            <div 
              key={index} 
              className={`bg-white/50 backdrop-blur-sm p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] shadow-sm 
                liftoff delay-${index + 1} 
                antigravity-float-subtle hover:shadow-2xl md:hover:-translate-y-2 transition-all duration-700`}
            >
              {/* Image Container */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                {/* Before Image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl bg-gray-200 group">
                  <img 
                    src={item.beforeImg} 
                    alt={`${item.name} Before`} 
                    className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110" 
                  />
                  <span className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-black/50 text-white text-[8px] md:text-[9px] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-widest font-bold backdrop-blur-sm">
                    Before
                  </span>
                </div>

                {/* After Image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl border-2 border-[#C5A059]/30 bg-gray-200 group">
                  <img 
                    src={item.afterImg} 
                    alt={`${item.name} After`} 
                    className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110" 
                  />
                  <span className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-[#C5A059] text-white text-[8px] md:text-[9px] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-widest font-bold shadow-lg">
                    After
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="text-left px-1 md:px-2">
                <h4 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-3 md:mb-4 font-['Times_New_Roman',_Times,_serif]">
                  {item.name}, {item.age} Tahun
                </h4>
                <p className="text-gray-500 text-sm md:text-base font-light italic leading-relaxed font-['Poppins',_sans-serif]">
                  "{item.testimonial}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OilySkinSection;