import React from 'react';

interface Testimonial {
  name: string;
  category: string;
  beforeImg: string;
  afterImg: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Siska Amelia",
    category: "Solusi Kulit Kering",
    beforeImg: "https://images.unsplash.com/photo-1512413316925-fd4b93f31521?auto=format&fit=crop&q=60&w=400",
    afterImg: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=60&w=400",
  },
  {
    name: "Nadia Putri",
    category: "Skin Barrier Repair",
    beforeImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=400",
    afterImg: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Diana Rose",
    category: "Sensitive Skin Care",
    beforeImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=60&w=400",
    afterImg: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=60&w=400",
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-[#FDFBF7] overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-24 liftoff">
          <h2 className="text-5xl font-serif text-gray-900 mb-6 italic">Bukti Nyata Transformatif</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-xl leading-relaxed">
            Mereka yang sudah merasakan keajaiban "Speechless Beauty".
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-[3rem] p-6 shadow-sm liftoff antigravity-float-subtle`}
              /* Staggered Delay sama dengan ProductGrid */
              style={{ transitionDelay: `${(idx + 1) * 0.2}s` }}
            >
              <div className="flex space-x-3 mb-6">
                {/* Before Image */}
                <div className="flex-1 relative overflow-hidden rounded-3xl h-56 shadow-inner bg-gray-50">
                  <img 
                    src={t.beforeImg} 
                    alt="Before" 
                    className="w-full h-full object-cover" 
                  />
                  <span className="absolute top-3 left-3 bg-black/40 text-white text-[9px] px-3 py-1.5 rounded-full uppercase tracking-widest font-bold">
                    Before
                  </span>
                </div>
                
                {/* After Image */}
                <div className="flex-1 relative overflow-hidden rounded-3xl h-56 border border-[#C5A059]/20 bg-gray-50">
                  <img 
                    src={t.afterImg} 
                    alt="After" 
                    className="w-full h-full object-cover" 
                  />
                  <span className="absolute top-3 left-3 bg-[#C5A059] text-white text-[9px] px-3 py-1.5 rounded-full uppercase tracking-widest font-bold">
                    After
                  </span>
                </div>
              </div>

              {/* Info Section */}
              <div className="text-left px-4 pb-4">
                <p className="font-bold text-gray-900 text-xl font-serif italic">
                  {t.name}
                </p>
                <p className="text-xs text-[#C5A059] tracking-[0.2em] uppercase font-bold mt-1">
                  {t.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;