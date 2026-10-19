import React from 'react';
import { CheckCircle } from 'lucide-react';

const benefits = [
  { text: "Kulit terasa lebih seimbang", delayClass: "delay-1" },
  { text: "Kulit terasa lebih lembap", delayClass: "delay-2" },
  { text: "Tekstur kulit membaik", delayClass: "delay-3" },
  { text: "Minyak lebih terkontrol", delayClass: "delay-4" },
  { text: "Lebih nyaman untuk pemakaian rutin", delayClass: "delay-5" },
];

const BenefitSummary: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Container Utama menggunakan liftoff */}
        <div className="bg-gray-900 text-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 relative overflow-hidden liftoff">
          
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ 
              backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" 
            }}
          />

          <div className="relative z-10 text-left">
            {/* Header menggunakan liftoff dengan delay awal */}
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif mb-10 md:mb-12 italic leading-tight font-['Times_New_Roman',_Times,_serif] liftoff delay-1">
              Hasil yang Paling Sering <br className="hidden sm:block" /> Disebut Pengguna
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {benefits.map((benefit, index) => {
                const isLastItem = index === benefits.length - 1;

                return (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-4 bg-white/5 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 
                    liftoff ${benefit.delayClass} antigravity-float-subtle
                    ${isLastItem ? 'md:col-span-2 md:mx-auto md:min-w-[400px]' : ''} 
                    `}
                  >
                    <CheckCircle className="text-[#C5A059] shrink-0 w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-base md:text-lg font-light tracking-wide font-['Poppins',_sans-serif]">
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitSummary;